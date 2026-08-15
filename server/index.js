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
          setTimeout(connectToWhatsApp, 5000);
        } else {
          // Logged out: remove auth files
          try {
            fs.rmSync(AUTH_DIR, { recursive: true, force: true });
          } catch (e) {
            console.error("Error clearing auth directory:", e);
          }
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

// Resolve a Channel link or JID
async function resolveTargetJid(input) {
  if (!input || input.trim() === "") return "status@broadcast";
  let target = input.trim();

  // If already a valid JID (e.g. 120363xxx@newsletter, 120363xxx@g.us, or phone@s.whatsapp.net)
  if (target.includes("@")) {
    return target;
  }

  // If it is a WhatsApp channel link like https://whatsapp.com/channel/0029Va...
  let inviteCode = target;
  if (target.includes("whatsapp.com/channel/")) {
    const parts = target.split("whatsapp.com/channel/");
    inviteCode = parts[1].split("/")[0].split("?")[0].trim();
  }

  try {
    if (sock && sock.newsletterMetadata) {
      console.log(`Resolving channel metadata for invite code: ${inviteCode}`);
      const meta = await sock.newsletterMetadata("invite", inviteCode);
      if (meta && meta.id) {
        console.log(`Resolved channel JID: ${meta.id} (${meta.name || "Channel"})`);
        return meta.id;
      }
    }
  } catch (err) {
    console.error("Error resolving channel invite link:", err.message);
  }

  // Fallback: if ends without @, append @newsletter if looks like channel, else return as is
  return target;
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
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: "Title is required" });
    }

    // Resolve target JID (supports Channel Link, Invite code, or JID)
    const jid = await resolveTargetJid(targetJid);
    console.log(`Broadcasting news to target WhatsApp JID: ${jid}`);

    // Format rich broadcast message
    const headline = title.trim();
    const catTag = category ? `【 ${category.toUpperCase()} 】` : "【 ब्रेकिंग न्यूज़ 】";
    const desc = summary ? `\n\n${summary.trim()}` : (content ? `\n\n${content.substring(0, 180)}...` : "");
    const readMore = link ? `\n\n👉 पूरी खबर यहां पढ़ें:\n${link}` : "";
    const footer = `\n\n━━━━━━━━━━━━━━━\n📰 *स्वदेश वाणी* (Swadesh Vaani)\n🌐 सत्य, निष्पक्ष और सटीक पत्रकारिता\n#SwadeshVaani #JharkhandNews`;

    const formattedMessage = `🔴 ${catTag}\n*${headline}*${desc}${readMore}${footer}`;

    let result;

    if (imageUrl && (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"))) {
      // Send with image URL
      result = await sock.sendMessage(jid, {
        image: { url: imageUrl },
        caption: formattedMessage,
      });
    } else if (imageUrl && imageUrl.startsWith("data:image")) {
      // Send base64 image
      const base64Data = imageUrl.split(",")[1];
      const buffer = Buffer.from(base64Data, "base64");
      result = await sock.sendMessage(jid, {
        image: buffer,
        caption: formattedMessage,
      });
    } else {
      // Send text message
      result = await sock.sendMessage(jid, {
        text: formattedMessage,
      });
    }

    return res.json({
      success: true,
      messageId: result?.key?.id,
      targetJid: jid,
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
