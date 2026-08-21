import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import qrcode from "qrcode";
import pino from "pino";
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
} from "@whiskeysockets/baileys";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// State
const AUTH_DIR = path.join(__dirname, "auth_state");
let sock = null;
let currentQrCode = null;
let connectionStatus = "disconnected"; // 'connecting' | 'connected' | 'disconnected'
let connectedUser = null;
let lastDisconnectReason = null;

// Initialize WhatsApp connection
async function connectToWhatsApp() {
  try {
    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(`Using Baileys v${version.join(".")}, isLatest: ${isLatest}`);

    sock = makeWASocket({
      version,
      logger: pino({ level: "silent" }),
      auth: state,
      browser: ["Savdeshvani News Admin", "Chrome", "1.0.0"],
      generateHighQualityLinkPreview: true,
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        currentQrCode = await qrcode.toDataURL(qr);
        connectionStatus = "waiting_for_scan";
        console.log("\n📱 Scan this QR code with WhatsApp (or open Admin panel in browser):\n");
        qrcode.toString(qr, { type: "terminal", small: true }, (err, str) => {
          if (!err) console.log(str);
        });
      }

      if (connection === "close") {
        const statusCode = (lastDisconnect?.error)?.output?.statusCode;
        const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
        connectionStatus = "disconnected";
        currentQrCode = null;
        connectedUser = null;
        lastDisconnectReason = lastDisconnect?.error?.message || "Connection closed";
        console.log(`WhatsApp connection closed (Code: ${statusCode}). Reconnecting: ${shouldReconnect}`);

        if (shouldReconnect) {
          setTimeout(connectToWhatsApp, 3000);
        } else {
          // Logged out / 401 expired session: clean auth files and create fresh pairing session
          console.log("🔄 Session expired or unlinked. Generating fresh QR code for pairing...");
          try {
            fs.rmSync(AUTH_DIR, { recursive: true, force: true });
          } catch (e) {
            console.error("Error clearing auth directory:", e);
          }
          setTimeout(connectToWhatsApp, 2000);
        }
      } else if (connection === "open") {
        connectionStatus = "connected";
        currentQrCode = null;
        connectedUser = sock.user;
        console.log("✅ WhatsApp successfully connected as:", sock.user?.id || sock.user?.name);
      }
    });

  } catch (err) {
    console.error("Error connecting to WhatsApp:", err);
    connectionStatus = "disconnected";
  }
}

// Routes
app.get("/api/whatsapp/status", (req, res) => {
  res.json({
    status: connectionStatus,
    user: connectedUser ? {
      id: connectedUser.id,
      name: connectedUser.name || "Admin WhatsApp",
    } : null,
    hasQr: !!currentQrCode,
    lastDisconnectReason,
  });
});

app.get("/api/whatsapp/qr", (req, res) => {
  if (connectionStatus === "connected") {
    return res.json({ status: "connected", qr: null, message: "Already connected" });
  }
  res.json({
    status: connectionStatus,
    qr: currentQrCode,
  });
});

// List joined channels & groups
app.get("/api/whatsapp/channels", async (req, res) => {
  try {
    if (connectionStatus !== "connected" || !sock) {
      return res.json({ success: false, channels: [], groups: [] });
    }

    let newsletters = [];
    try {
      if (sock.newsletterSubscribed) {
        newsletters = (await sock.newsletterSubscribed()) || [];
      }
    } catch (e) {
      console.log("Newsletter fetch error:", e.message);
    }

    let groups = [];
    try {
      if (sock.groupFetchAllParticipating) {
        const participatingGroups = await sock.groupFetchAllParticipating();
        groups = Object.values(participatingGroups).map((g) => ({
          id: g.id,
          name: g.subject,
        }));
      }
    } catch (e) {
      console.log("Group fetch error:", e.message);
    }

    res.json({
      success: true,
      channels: newsletters.map((n) => ({
        id: n.id,
        name: n.name || n.thread_metadata?.name?.text || "WhatsApp Channel",
        role: n.viewer_metadata?.role || "ADMIN",
      })),
      groups,
    });
  } catch (error) {
    res.json({ success: false, error: error.message, channels: [], groups: [] });
  }
});

// Get the self JID (linked WhatsApp number) for self-chat fallback
function getSelfJid() {
  if (!sock || !sock.user) return null;
  // sock.user.id is like "919876543210:64@s.whatsapp.net" — strip device suffix
  const rawId = sock.user.id || "";
  const phone = rawId.split(":")[0]; // e.g. "919876543210"
  return phone ? `${phone}@s.whatsapp.net` : null;
}

// Resolve a WhatsApp Channel link/JID → returns JID string or null
async function resolveChannelJid(input) {
  if (!input || !input.trim()) return null;
  const target = input.trim();

  // Already a valid JID
  if (target.includes("@")) return target;

  // Channel invite link: https://whatsapp.com/channel/0029Va...
  let inviteCode = target;
  if (target.includes("whatsapp.com/channel/")) {
    const parts = target.split("whatsapp.com/channel/");
    inviteCode = parts[1].split("/")[0].split("?")[0].trim();
  }

  try {
    if (sock && sock.newsletterMetadata) {
      console.log(`Resolving channel invite code: ${inviteCode}`);
      const meta = await sock.newsletterMetadata("invite", inviteCode);
      if (meta && meta.id) {
        console.log(`✅ Channel JID resolved: ${meta.id} (${meta.name || "Channel"})`);
        return meta.id;
      }
    }
  } catch (err) {
    console.error("Error resolving channel invite link:", err.message);
  }
  return null;
}

// Resolve a WhatsApp Community/Group link/JID → returns JID string or null
async function resolveCommunityJid(input) {
  if (!input || !input.trim()) return null;
  const target = input.trim();

  // Already a valid group JID
  if (target.includes("@g.us")) return target;
  if (target.includes("@")) return target; // some other JID type

  // Group/Community invite link: https://chat.whatsapp.com/XXXXXXXXXX
  let inviteCode = target;
  if (target.includes("chat.whatsapp.com/")) {
    const parts = target.split("chat.whatsapp.com/");
    inviteCode = parts[1].split("/")[0].split("?")[0].trim();
  }

  try {
    if (sock && sock.groupGetInviteInfo) {
      console.log(`Resolving community/group invite code: ${inviteCode}`);
      const meta = await sock.groupGetInviteInfo(inviteCode);
      if (meta && meta.id) {
        console.log(`✅ Community/Group JID resolved: ${meta.id} (${meta.subject || "Group"})`);
        return meta.id;
      }
    }
  } catch (err) {
    console.error("Error resolving community invite link:", err.message);
  }
  return null;
}

// Resolve all broadcast targets: self + channel (if set) + community (if set)
async function resolveTargetJids(channelInput, communityInput) {
  const selfJid = getSelfJid();
  const targets = [];

  // Always include self so admin always receives the message
  if (selfJid) targets.push(selfJid);

  // Resolve channel
  const channelJid = await resolveChannelJid(channelInput);
  if (channelJid && channelJid !== selfJid) targets.push(channelJid);

  // Resolve community/group
  const communityJid = await resolveCommunityJid(communityInput);
  if (communityJid && communityJid !== selfJid && communityJid !== channelJid) {
    targets.push(communityJid);
  }

  if (targets.length === 1 && targets[0] === selfJid) {
    console.log(`No channel/community configured. Sending to self only: ${selfJid}`);
  } else {
    console.log(`Broadcasting to ${targets.length} target(s): ${targets.join(", ")}`);
  }
  return targets;
}

// Helper: send a formatted message to a single JID
async function sendToJid(jid, { imageUrl, formattedMessage }) {
  if (imageUrl && (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
    return sock.sendMessage(jid, { image: { url: imageUrl }, caption: formattedMessage });
  } else if (imageUrl && imageUrl.startsWith("data:image")) {
    const base64Data = imageUrl.split(",")[1];
    const buffer = Buffer.from(base64Data, "base64");
    return sock.sendMessage(jid, { image: buffer, caption: formattedMessage });
  } else {
    return sock.sendMessage(jid, { text: formattedMessage });
  }
}

// Broadcast news to WhatsApp (Channel, Group, or Contact)
app.post("/api/whatsapp/send", async (req, res) => {
  try {
    if (connectionStatus !== "connected" || !sock) {
      return res.status(400).json({
        success: false,
        error: "WhatsApp is not connected. Please scan the QR code first in Admin panel.",
      });
    }

    const {
      title,
      summary,
      content,
      category,
      imageUrl,
      link,
      targetJid,
      communityJid,
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: "Title is required" });
    }

    // Resolve all target JIDs (self + channel + community)
    const jids = await resolveTargetJids(targetJid, communityJid);
    console.log(`Broadcasting news to ${jids.length} target(s): ${jids.join(", ")}`);

    if (jids.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Could not determine a WhatsApp target. Make sure you are connected.",
      });
    }

    // Format rich broadcast message
    const headline = title.trim();
    const catTag = category ? `【 ${category.toUpperCase()} 】` : "【 ब्रेकिंग न्यूज़ 】";
    const desc = summary ? `\n\n${summary.trim()}` : (content ? `\n\n${content.substring(0, 180)}...` : "");
    const readMore = link ? `\n\n👉 पूरी खबर यहां पढ़ें:\n${link}` : "";
    const footer = `\n\n━━━━━━━━━━━━━━━\n📰 *स्वदेश वाणी* (Swadesh Vaani)\n🌐 सत्य, निष्पक्ष और सटीक पत्रकारिता\n#SwadeshVaani #JharkhandNews`;
    const formattedMessage = `🔴 ${catTag}\n*${headline}*${desc}${readMore}${footer}`;

    // Send to all targets (self + channel)
    const results = [];
    for (const jid of jids) {
      try {
        const result = await sendToJid(jid, { imageUrl, formattedMessage });
        results.push({ jid, messageId: result?.key?.id, status: "sent" });
        console.log(`✅ Sent to ${jid}`);
        // Small delay between sends to avoid rate limiting
        if (jids.length > 1) await new Promise((r) => setTimeout(r, 800));
      } catch (err) {
        console.error(`❌ Failed to send to ${jid}:`, err.message);
        results.push({ jid, status: "failed", error: err.message });
      }
    }

    const allFailed = results.every((r) => r.status === "failed");
    if (allFailed) {
      return res.status(500).json({
        success: false,
        error: results[0]?.error || "All sends failed",
        results,
      });
    }

    const sentTo = results.filter((r) => r.status === "sent").map((r) => r.jid);
    return res.json({
      success: true,
      sentTo,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error sending WhatsApp broadcast:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to broadcast message to WhatsApp",
    });
  }
});

// Disconnect / Logout
app.post("/api/whatsapp/disconnect", async (req, res) => {
  try {
    if (sock) {
      await sock.logout().catch(() => {});
      sock.end();
    }
    connectionStatus = "disconnected";
    connectedUser = null;
    currentQrCode = null;

    try {
      if (fs.existsSync(AUTH_DIR)) {
        fs.rmSync(AUTH_DIR, { recursive: true, force: true });
      }
    } catch (e) {
      console.error("Error cleaning auth dir:", e);
    }

    // Restart connection to generate fresh QR
    setTimeout(connectToWhatsApp, 1500);

    return res.json({ success: true, message: "WhatsApp logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Start Express Server & WhatsApp Client
app.listen(PORT, () => {
  console.log(`🚀 Savdeshvani WhatsApp Server running on http://localhost:${PORT}`);
  connectToWhatsApp();
});
