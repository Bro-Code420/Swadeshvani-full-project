import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaEdit,
  FaEye,
  FaExternalLinkAlt,
  FaFileAlt,
  FaHome,
  FaNewspaper,
  FaPlus,
  FaSearch,
  FaSignOutAlt,
  FaTrash,
  FaUserCircle,
  FaTimes,
  FaWhatsapp,
  FaQrcode,
  FaPaperPlane,
  FaSyncAlt,
  FaExclamationTriangle,
  FaCog,
} from "react-icons/fa";

const categories = [
  "National",
  "International",
  "Politics",
  "Business",
  "Technology",
  "Sports",
  "Entertainment",
  "Weather",
  "Education",
  "Jharkhand",
];

const initialNews = [
  {
    id: 1,
    title: "जरमुंडी प्रखंड के आमगाछी गांव में आकाशीय बिजली का शिकार हुआ विद्युत ट्रांसफार्मर",
    category: "Jharkhand",
    author: "Admin",
    status: "Published",
    date: "16 Aug 2026",
    image: "",
    excerpt: "जरमुंडी प्रखंड के आमगाछी में आकाशीय बिजली गिरने से 25 केवीए का ट्रांसफार्मर जल गया।",
    content: "जरमुंडी प्रखंड के आमगाछी गांव में बीती रात आकाशीय बिजली गिरने से 25 केवीए का ट्रांसफार्मर जल गया, जिससे पूरे गांव में अंधेरा छा गया है। ग्रामीणों ने बिजली विभाग से जल्द नया ट्रांसफार्मर लगाने की मांग की है।",
  },
  {
    id: 2,
    title: "JPSC मुद्दे पर जारी आंदोलन को सोनम वांगचुक का समर्थन",
    category: "Politics",
    author: "Admin",
    status: "Published",
    date: "15 Aug 2026",
    image: "",
    excerpt: "छात्रों के आंदोलन को मिला पर्यावरणविद् सोनम वांगचुक का साथ।",
    content: "झारखंड लोक सेवा आयोग (JPSC) की अनियमितताओं को लेकर अभ्यर्थियों द्वारा किए जा रहे शांतिपूर्ण आंदोलन को प्रसिद्ध पर्यावरणविद् और शिक्षा सुधारक सोनम वांगचुक ने अपना पूर्ण समर्थन दिया है।",
  },
];

const WA_SERVER_URL = "http://localhost:5000";

export default function Admin() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newsList, setNewsList] = useState(initialNews);

  // WhatsApp Automation States
  const [waStatus, setWaStatus] = useState("checking"); // 'connected' | 'waiting_for_scan' | 'disconnected' | 'offline' | 'checking'
  const [waUser, setWaUser] = useState(null);
  const [waQr, setWaQr] = useState(null);
  const [waTargetJid, setWaTargetJid] = useState(
    localStorage.getItem("savdeshvani_wa_jid") || ""
  );
  const [autoPostWa, setAutoPostWa] = useState(true);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error' | 'info', message: '' }

  const [formData, setFormData] = useState({
    title: "",
    category: "National",
    excerpt: "",
    content: "",
    image: "",
    status: "Published",
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Poll WhatsApp Status
  const checkWaStatus = async () => {
    try {
      const res = await fetch(`${WA_SERVER_URL}/api/whatsapp/status`);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setWaStatus(data.status);
      setWaUser(data.user);
      if (data.status === "waiting_for_scan" || data.status === "disconnected") {
        fetchWaQr();
      } else if (data.status === "connected") {
        setWaQr(null);
      }
    } catch (err) {
      setWaStatus("offline");
    }
  };

  const fetchWaQr = async () => {
    try {
      const res = await fetch(`${WA_SERVER_URL}/api/whatsapp/qr`);
      const data = await res.json();
      if (data.qr) {
        setWaQr(data.qr);
      }
    } catch (err) {
      // Backend might be starting up
    }
  };

  const handleDisconnectWa = async () => {
    if (!window.confirm("Are you sure you want to unlink and log out WhatsApp?")) return;
    try {
      await fetch(`${WA_SERVER_URL}/api/whatsapp/disconnect`, { method: "POST" });
      showToast("WhatsApp unlinked successfully. Scan QR to reconnect.", "info");
      checkWaStatus();
    } catch (err) {
      showToast("Failed to disconnect: " + err.message, "error");
    }
  };

  // Check status on mount and poll
  useEffect(() => {
    checkWaStatus();
    const interval = setInterval(checkWaStatus, 4000);
    return () => clearInterval(interval);
  }, []);

  const saveTargetJid = (jid) => {
    setWaTargetJid(jid);
    localStorage.setItem("savdeshvani_wa_jid", jid);
    showToast("WhatsApp target channel saved!", "success");
  };

  // Broadcast function
  const broadcastToWhatsApp = async (article) => {
    if (waStatus !== "connected") {
      showToast("WhatsApp is not connected! Please scan QR code in WhatsApp tab.", "error");
      return false;
    }

    setIsBroadcasting(true);
    try {
      const res = await fetch(`${WA_SERVER_URL}/api/whatsapp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: article.title,
          summary: article.excerpt,
          content: article.content,
          category: article.category,
          imageUrl: article.image,
          link: window.location.origin + "/News",
          targetJid: waTargetJid,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("🚀 News broadcasted to WhatsApp Channel successfully!", "success");
        setIsBroadcasting(false);
        return true;
      } else {
        throw new Error(data.error || "Broadcast failed");
      }
    } catch (err) {
      showToast("WhatsApp Broadcast failed: " + err.message, "error");
      setIsBroadcasting(false);
      return false;
    }
  };

  const filteredNews = useMemo(() => {
    return newsList.filter((news) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [newsList, searchTerm]);

  const publishedNews = newsList.filter(
    (news) => news.status === "Published"
  ).length;

  const draftNews = newsList.filter(
    (news) => news.status === "Draft"
  ).length;

  const changePage = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setFormData((previous) => ({
      ...previous,
      content,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((previous) => ({
        ...previous,
        image: e.target.result, // base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const plainContent = formData.content
      .replace(/<[^>]*>/g, "")
      .trim();

    if (!formData.title.trim() || !plainContent) {
      alert("Please add a title and news content.");
      return;
    }

    const newNews = {
      id: Date.now(),
      title: formData.title,
      category: formData.category,
      author: "Admin",
      status: formData.status,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      excerpt: formData.excerpt,
      image: formData.image,
      content: formData.content,
    };

    setNewsList((previous) => [newNews, ...previous]);

    // Auto-broadcast if enabled and published
    if (autoPostWa && formData.status === "Published") {
      await broadcastToWhatsApp(newNews);
    } else {
      showToast("Article saved successfully!", "success");
    }

    setFormData({
      title: "",
      category: "National",
      excerpt: "",
      content: "",
      image: "",
      status: "Published",
    });

    changePage("news");
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this news article?"
    );
    if (!confirmed) return;

    setNewsList((previous) =>
      previous.filter((news) => news.id !== id)
    );
    showToast("Article deleted.", "info");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 text-slate-800">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : toast.type === "error"
              ? "bg-red-600 text-white"
              : "bg-blue-900 text-white"
          }`}
        >
          {toast.type === "success" && <FaCheckCircle className="text-xl" />}
          {toast.type === "error" && <FaExclamationTriangle className="text-xl" />}
          {toast.type === "info" && <FaWhatsapp className="text-xl" />}
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-blue-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gradient-to-b from-blue-950 to-blue-900 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              स्वदेश वाणी
            </h1>
            <p className="mt-1 text-xs text-blue-200">
              Admin Portal
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="text-blue-200 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-7">
          <SidebarItem
            icon={<FaHome />}
            label="Dashboard"
            active={activePage === "dashboard"}
            onClick={() => changePage("dashboard")}
          />

          <SidebarItem
            icon={<FaNewspaper />}
            label="All News"
            active={activePage === "news"}
            onClick={() => changePage("news")}
          />

          <SidebarItem
            icon={<FaPlus />}
            label="Add News"
            active={activePage === "add-news"}
            onClick={() => changePage("add-news")}
          />

          <SidebarItem
            icon={<FaWhatsapp className="text-green-400 text-lg" />}
            label="WhatsApp Bot"
            badge={
              waStatus === "connected" ? (
                <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-300 border border-green-500/30">
                  ON
                </span>
              ) : (
                <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300 border border-orange-500/30">
                  OFF
                </span>
              )
            }
            active={activePage === "whatsapp"}
            onClick={() => changePage("whatsapp")}
          />
        </nav>

        {/* WhatsApp Quick Status Card in Sidebar */}
        <div className="mx-4 mb-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold text-blue-200">
              <FaWhatsapp className="text-green-400" /> WhatsApp Status
            </span>
            <span
              className={`h-2 w-2 rounded-full ${
                waStatus === "connected"
                  ? "bg-green-400 animate-pulse"
                  : waStatus === "waiting_for_scan"
                  ? "bg-yellow-400 animate-ping"
                  : "bg-red-400"
              }`}
            />
          </div>
          <p className="mt-1 text-[11px] text-slate-300 capitalize">
            {waStatus === "connected"
              ? `Linked (${waUser?.name || "Ready"})`
              : waStatus === "waiting_for_scan"
              ? "Scan QR Code"
              : waStatus === "offline"
              ? "Server Offline"
              : "Disconnected"}
          </p>
        </div>

        <div className="space-y-2 border-t border-white/10 p-4">
          <Link
            to="/"
            onClick={() => setSidebarOpen(false)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-blue-100 transition hover:bg-orange-500 hover:text-white"
          >
            <FaExternalLinkAlt />
            Go to Website
          </Link>

          <button
            onClick={() => alert("Logged out from admin panel.")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-blue-200 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Navbar */}
      <header className="fixed left-0 right-0 top-0 z-30 h-20 border-b border-orange-100 bg-white/95 shadow-sm backdrop-blur-xl lg:left-64">
        <div className="flex h-full items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-xl text-blue-900 lg:hidden"
              aria-label="Open sidebar"
            >
              <FaBars />
            </button>

            <div>
              <h2 className="text-lg font-bold text-blue-950">
                {activePage === "dashboard" && "Dashboard Overview"}
                {activePage === "news" && "All Published News"}
                {activePage === "add-news" && "Publish New Article"}
                {activePage === "whatsapp" && "WhatsApp Channel Automation"}
              </h2>

              <p className="hidden text-xs text-slate-500 sm:block">
                Swadesh Vaani Content & Broadcast Manager
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* WhatsApp live badge */}
            <button
              onClick={() => changePage("whatsapp")}
              className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold border transition ${
                waStatus === "connected"
                  ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-100"
                  : "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
              }`}
            >
              <FaWhatsapp className={waStatus === "connected" ? "text-green-600 text-sm" : "text-orange-500 text-sm"} />
              <span className="hidden sm:inline">
                {waStatus === "connected" ? "WA Auto-Post Active" : "Connect WhatsApp"}
              </span>
            </button>

            <Link
              to="/"
              className="hidden items-center gap-2 rounded-lg border border-blue-100 px-3 py-2 text-sm font-medium text-blue-800 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 sm:flex"
            >
              <FaExternalLinkAlt size={13} />
              Website
            </Link>

            <div className="hidden h-7 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-2">
              <FaUserCircle className="text-3xl text-blue-800" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-blue-950">Admin User</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen pt-20 lg:ml-64">
        <div className="p-5 sm:p-8">
          {activePage === "dashboard" && (
            <Dashboard
              news={newsList}
              publishedNews={publishedNews}
              draftNews={draftNews}
              waStatus={waStatus}
              onAdd={() => changePage("add-news")}
              onViewAll={() => changePage("news")}
              onDelete={handleDelete}
              onBroadcast={broadcastToWhatsApp}
              isBroadcasting={isBroadcasting}
              onOpenWhatsApp={() => changePage("whatsapp")}
            />
          )}

          {activePage === "news" && (
            <NewsList
              news={filteredNews}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAdd={() => changePage("add-news")}
              onDelete={handleDelete}
              onBroadcast={broadcastToWhatsApp}
              isBroadcasting={isBroadcasting}
            />
          )}

          {activePage === "add-news" && (
            <AddNewsForm
              formData={formData}
              categories={categories}
              autoPostWa={autoPostWa}
              setAutoPostWa={setAutoPostWa}
              waStatus={waStatus}
              onChange={handleInputChange}
              onContentChange={handleContentChange}
              onImageChange={handleImageChange}
              onSubmit={handleSubmit}
              onCancel={() => changePage("news")}
              isBroadcasting={isBroadcasting}
            />
          )}

          {activePage === "whatsapp" && (
            <WhatsAppManager
              waStatus={waStatus}
              waUser={waUser}
              waQr={waQr}
              waTargetJid={waTargetJid}
              onSaveTargetJid={saveTargetJid}
              onRefresh={checkWaStatus}
              onDisconnect={handleDisconnectWa}
              onTestBroadcast={() =>
                broadcastToWhatsApp({
                  title: "स्वदेश वाणी लाइव टेस्ट प्रसारण",
                  excerpt: "यह एडमिन पैनल से व्हाट्सएप चैनल/ग्रुप में भेजा गया एक सफल टेस्ट मैसेज है।",
                  content: "स्वदेश वाणी न्यूज़ पोर्टल - निष्पक्ष, सटीक और विश्वसनीय।",
                  category: "Live Test",
                  image: "",
                })
              }
              isBroadcasting={isBroadcasting}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* Sidebar item */
function SidebarItem({ icon, label, badge, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
        active
          ? "bg-orange-500 font-semibold text-white shadow-lg shadow-orange-900/20"
          : "text-blue-100 hover:bg-white/10 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        {label}
      </div>
      {badge && <div>{badge}</div>}
    </button>
  );
}

/* Dashboard */
function Dashboard({
  news,
  publishedNews,
  draftNews,
  waStatus,
  onAdd,
  onViewAll,
  onDelete,
  onBroadcast,
  isBroadcasting,
  onOpenWhatsApp,
}) {
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold text-orange-500 uppercase tracking-wider">
            Admin Overview
          </p>
          <h3 className="text-2xl font-bold text-blue-950">
            Welcome back, Admin
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Publish news and auto-broadcast to WhatsApp channels in 1-click.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
        >
          <FaPlus />
          Create New Article
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<FaNewspaper className="text-2xl text-blue-600" />}
          label="Total Articles"
          value={news.length}
          color="bg-blue-50 border-blue-100"
        />
        <StatCard
          icon={<FaCheckCircle className="text-2xl text-green-600" />}
          label="Published Articles"
          value={publishedNews}
          color="bg-green-50 border-green-100"
        />
        <div
          onClick={onOpenWhatsApp}
          className="cursor-pointer rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-100/60 p-6 shadow-sm transition hover:shadow-md hover:border-green-400"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-800">
                WhatsApp Bot Auto-Post
              </p>
              <h4 className="mt-2 text-xl font-extrabold text-green-950">
                {waStatus === "connected" ? "🟢 Connected & Active" : "🟡 Needs Pairing"}
              </h4>
              <p className="mt-1 text-xs text-green-700">
                {waStatus === "connected"
                  ? "Articles auto-publish to Channel"
                  : "Click here to scan QR code"}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/30 text-2xl">
              <FaWhatsapp />
            </div>
          </div>
        </div>
      </div>

      {/* Recent News Table */}
      <section className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-blue-950">Recent News Articles</h4>
            <p className="text-xs text-slate-500">Quickly broadcast any article to WhatsApp</p>
          </div>
          <button
            onClick={onViewAll}
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            View All →
          </button>
        </div>

        <NewsTable
          news={news.slice(0, 5)}
          onDelete={onDelete}
          onBroadcast={onBroadcast}
          isBroadcasting={isBroadcasting}
        />
      </section>
    </>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`rounded-2xl border p-6 shadow-sm ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <h4 className="mt-2 text-3xl font-extrabold text-blue-950">{value}</h4>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}

/* News list */
function NewsList({
  news,
  searchTerm,
  setSearchTerm,
  onAdd,
  onDelete,
  onBroadcast,
  isBroadcasting,
}) {
  return (
    <section className="rounded-2xl border border-orange-100 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-orange-100 p-5 sm:flex-row sm:items-center sm:p-8">
        <div>
          <h3 className="text-xl font-bold text-blue-950">All News Articles</h3>
          <p className="mt-1 text-xs text-slate-500">
            Manage your articles and broadcast them to your social channels.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          <FaPlus />
          Add News
        </button>
      </div>

      <div className="border-b border-orange-100 p-5">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />
          <input
            type="search"
            placeholder="Search news by headline..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-xl border border-blue-100 bg-blue-50/30 py-2.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          />
        </div>
      </div>

      <NewsTable
        news={news}
        onDelete={onDelete}
        onBroadcast={onBroadcast}
        isBroadcasting={isBroadcasting}
      />
    </section>
  );
}

/* News table */
function NewsTable({ news, onDelete, onBroadcast, isBroadcasting }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] text-left text-sm">
        <thead className="bg-blue-50 text-xs uppercase tracking-wide text-blue-900">
          <tr>
            <th className="px-5 py-4 font-semibold">Article</th>
            <th className="px-5 py-4 font-semibold">Category</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Date</th>
            <th className="px-5 py-4 text-center font-semibold text-green-700">WhatsApp Broadcast</th>
            <th className="px-5 py-4 text-right font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-orange-50">
          {news.length > 0 ? (
            news.map((item) => (
              <tr key={item.id} className="transition hover:bg-orange-50/40">
                <td className="max-w-xs px-5 py-4">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-11 w-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-400">
                        <FaNewspaper />
                      </div>
                    )}
                    <p className="line-clamp-2 font-semibold text-blue-950">
                      {item.title}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4 text-slate-500 font-medium">
                  {item.category}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-slate-500 text-xs">
                  {item.date}
                </td>

                <td className="px-5 py-4 text-center">
                  <button
                    disabled={isBroadcasting}
                    onClick={() => onBroadcast(item)}
                    title="Send instant broadcast to WhatsApp Channel"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-600 active:scale-95 transition disabled:opacity-50"
                  >
                    <FaWhatsapp className="text-sm" />
                    <span>Send to WhatsApp</span>
                  </button>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-3 text-base">
                    <button
                      title="Delete"
                      onClick={() => onDelete(item.id)}
                      className="text-slate-400 transition hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-5 py-12 text-center text-sm text-slate-500"
              >
                No news articles found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* Add news form */
function AddNewsForm({
  formData,
  categories,
  autoPostWa,
  setAutoPostWa,
  waStatus,
  onChange,
  onContentChange,
  onImageChange,
  onSubmit,
  onCancel,
  isBroadcasting,
}) {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold text-orange-500 uppercase tracking-wider">
          Content Management
        </p>
        <h3 className="text-2xl font-bold text-blue-950">Add New Article</h3>
        <p className="mt-1 text-sm text-slate-500">
          Create, publish, and optionally auto-post straight into WhatsApp.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-8"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-blue-950">
              News Headline / Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="e.g. जरमुंडी प्रखंड में विकास कार्यों का उद्घाटन..."
              className="w-full rounded-xl border border-blue-100 bg-blue-50/20 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-blue-950">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onChange}
              className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-blue-950">
              Publication Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={onChange}
              className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            >
              <option value="Published">Publish Immediately</option>
              <option value="Draft">Save as Draft</option>
            </select>
          </div>

          {/* WhatsApp Auto-Post Banner / Switch */}
          <div className="md:col-span-2 rounded-xl border border-green-200 bg-green-50/60 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={autoPostWa}
                onChange={(e) => setAutoPostWa(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-green-300 text-green-600 focus:ring-green-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <FaWhatsapp className="text-green-600 text-lg" />
                  <span className="text-sm font-bold text-green-950">
                    Auto-Post to WhatsApp Channel / Group on Publish
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-green-800">
                  {waStatus === "connected"
                    ? "✅ Bot is active! When you click Save/Publish, formatted headline + summary + photo will be sent instantly."
                    : "⚠️ WhatsApp bot is currently disconnected. Click 'WhatsApp Bot' in the sidebar to scan the QR code."}
                </p>
              </div>
            </label>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-blue-950">
              Short Summary / Excerpt (Used in WhatsApp & Social preview)
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={onChange}
              rows="2"
              placeholder="1-2 lines summarizing the event for quick reader comprehension..."
              className="w-full rounded-xl border border-blue-100 bg-blue-50/20 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-blue-950">
              Full News Content *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={onContentChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-blue-950">
              Featured Image
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/30 px-6 py-8 text-center transition hover:border-orange-400 hover:bg-orange-50">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="News preview"
                  className="mb-4 max-h-48 rounded-xl object-cover"
                />
              ) : (
                <FaCloudUploadAlt className="mb-3 text-3xl text-orange-500" />
              )}
              <span className="text-sm font-semibold text-blue-950">
                Upload article cover photo
              </span>
              <span className="mt-1 text-xs text-slate-400">
                PNG, JPG or WEBP (Automatically sent with WhatsApp message)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-orange-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-blue-100 px-5 py-3 text-sm font-semibold text-blue-900 transition hover:bg-blue-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isBroadcasting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 disabled:opacity-50"
          >
            {isBroadcasting ? (
              <>
                <FaSyncAlt className="animate-spin" />
                Publishing & Broadcasting...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Publish Article
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

/* WhatsApp Manager Page */
function WhatsAppManager({
  waStatus,
  waUser,
  waQr,
  waTargetJid,
  onSaveTargetJid,
  onRefresh,
  onDisconnect,
  onTestBroadcast,
  isBroadcasting,
}) {
  const [jidInput, setJidInput] = useState(waTargetJid);
  const [channels, setChannels] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);

  const fetchChats = async () => {
    if (waStatus !== "connected") return;
    setLoadingChats(true);
    try {
      const res = await fetch("http://localhost:5000/api/whatsapp/channels");
      const data = await res.json();
      if (data.success) {
        setChannels(data.channels || []);
        setGroups(data.groups || []);
      }
    } catch (e) {
      console.error("Failed to load chats:", e);
    } finally {
      setLoadingChats(false);
    }
  };

  useEffect(() => {
    if (waStatus === "connected") {
      fetchChats();
    }
  }, [waStatus]);

  const applyPreset = (target, name) => {
    setJidInput(target);
    onSaveTargetJid(target);
  };

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <div>
        <p className="mb-2 text-sm font-semibold text-green-600 uppercase tracking-wider">
          Free WhatsApp Gateway (Baileys Engine)
        </p>
        <h3 className="text-2xl font-bold text-blue-950">
          WhatsApp Auto-Broadcasting Setup
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Link your WhatsApp account once to automatically post breaking news into your Channel or Groups.
        </p>
      </div>

      {/* Connection Status Banner */}
      <div
        className={`rounded-2xl border p-6 shadow-sm ${
          waStatus === "connected"
            ? "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50"
            : waStatus === "waiting_for_scan"
            ? "border-yellow-200 bg-yellow-50/70"
            : waStatus === "offline"
            ? "border-red-200 bg-red-50"
            : "border-slate-200 bg-slate-50"
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white shadow-md ${
                waStatus === "connected"
                  ? "bg-green-600 shadow-green-600/30"
                  : waStatus === "waiting_for_scan"
                  ? "bg-yellow-500 shadow-yellow-500/30"
                  : "bg-red-500 shadow-red-500/30"
              }`}
            >
              <FaWhatsapp />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-blue-950">
                  {waStatus === "connected"
                    ? "WhatsApp Bot Connected"
                    : waStatus === "waiting_for_scan"
                    ? "Pairing Required (Scan QR)"
                    : waStatus === "offline"
                    ? "WhatsApp Server Offline"
                    : "Disconnected"}
                </h4>
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    waStatus === "connected"
                      ? "bg-green-500"
                      : waStatus === "waiting_for_scan"
                      ? "bg-yellow-500 animate-ping"
                      : "bg-red-500"
                  }`}
                />
              </div>

              <p className="mt-0.5 text-xs text-slate-600">
                {waStatus === "connected"
                  ? `Logged in as: ${waUser?.name || "Admin"} (${waUser?.id || "Primary Number"})`
                  : waStatus === "waiting_for_scan"
                  ? "Scan the QR code below from WhatsApp > Linked Devices."
                  : waStatus === "offline"
                  ? "Ensure 'pnpm server' or 'npm run server' is running on port 5000."
                  : "Click refresh to generate pairing session."}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3.5 py-2 text-xs font-semibold text-blue-900 shadow-sm transition hover:bg-blue-50"
            >
              <FaSyncAlt /> Refresh Status
            </button>

            {waStatus === "connected" && (
              <button
                onClick={onDisconnect}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3.5 py-2 text-xs font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
              >
                <FaSignOutAlt /> Unlink
              </button>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Scanner Section (Shown when pairing is required) */}
      {waStatus !== "connected" && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-orange-100 bg-white p-6 shadow-sm text-center">
            <h5 className="font-bold text-blue-950 mb-2">Scan with WhatsApp</h5>
            <p className="text-xs text-slate-500 mb-4 max-w-xs">
              Open WhatsApp on your mobile phone &gt; Settings / 3-dots &gt; <strong>Linked Devices</strong> &gt; <strong>Link a Device</strong>.
            </p>

            <div className="relative flex h-64 w-64 items-center justify-center rounded-2xl border-4 border-dashed border-green-300 bg-green-50/50 p-2">
              {waQr ? (
                <img
                  src={waQr}
                  alt="WhatsApp QR Code"
                  className="h-full w-full rounded-xl object-contain shadow-md"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <FaSyncAlt className="animate-spin text-3xl text-green-600" />
                  <span className="text-xs font-medium">Generating fresh QR code...</span>
                </div>
              )}
            </div>

            <button
              onClick={onRefresh}
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-green-700 hover:text-green-800"
            >
              <FaSyncAlt /> Reload QR Code
            </button>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h5 className="font-bold text-blue-950 mb-3">📱 How to Link:</h5>
              <ol className="list-decimal list-inside space-y-2.5 text-xs text-slate-600 leading-relaxed">
                <li>Open <strong>WhatsApp</strong> on your phone.</li>
                <li>Tap <strong>Menu (⋮)</strong> on Android or <strong>Settings</strong> on iPhone.</li>
                <li>Select <strong>Linked Devices</strong>.</li>
                <li>Tap <strong>Link a Device</strong> and authenticate with Fingerprint/FaceID.</li>
                <li>Point your camera at the QR code on the left.</li>
              </ol>
            </div>

            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
              💡 <strong>100% Free &amp; Private:</strong> Your session credentials stay securely stored on your own local server (`server/auth_state/`).
            </div>
          </div>
        </div>
      )}

      {/* Target Channel Configuration & Test Broadcast */}
      <div className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h4 className="font-bold text-blue-950">Target WhatsApp Channel Configuration</h4>
            <p className="text-xs text-slate-500">
              Specify your WhatsApp Channel link or ID to auto-post news directly into it.
            </p>
          </div>
          {waStatus === "connected" && (
            <button
              onClick={fetchChats}
              disabled={loadingChats}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 hover:text-green-800"
            >
              <FaSyncAlt className={loadingChats ? "animate-spin" : ""} />
              {loadingChats ? "Fetching Channels..." : "Auto-Detect My Channels"}
            </button>
          )}
        </div>

        {/* Quick Detected Channels Dropdown */}
        {channels.length > 0 && (
          <div className="rounded-xl border border-green-200 bg-green-50/50 p-3">
            <p className="text-xs font-bold text-green-900 mb-2">
              ⚡ Detected Channels on your WhatsApp account:
            </p>
            <div className="flex flex-wrap gap-2">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => applyPreset(ch.id, ch.name)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition ${
                    jidInput === ch.id
                      ? "border-green-600 bg-green-600 text-white font-bold"
                      : "border-green-300 bg-white text-green-800 hover:bg-green-100"
                  }`}
                >
                  📢 {ch.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              WhatsApp Channel Link or Channel ID
            </label>
            <input
              type="text"
              value={jidInput}
              onChange={(e) => setJidInput(e.target.value)}
              placeholder="e.g. https://whatsapp.com/channel/0029VaXXXXXX"
              className="w-full rounded-xl border border-blue-100 bg-blue-50/20 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              💡 <strong>How to get this:</strong> Open your Channel in WhatsApp ➔ Tap the Channel Name at the top ➔ Tap <strong>"Forward / Share link"</strong> ➔ Paste the link here!
            </p>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => onSaveTargetJid(jidInput)}
              className="w-full rounded-xl bg-blue-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-950 transition"
            >
              Save Channel Target
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
          <span className="font-semibold text-slate-700">Quick Targets:</span>
          <button
            type="button"
            onClick={() => applyPreset("status@broadcast", "WhatsApp Status")}
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 hover:bg-slate-100"
          >
            📸 WhatsApp Status (Story)
          </button>
          <button
            type="button"
            onClick={() => applyPreset("", "My Number (Self)")}
            className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 hover:bg-slate-100"
          >
            💬 My Chat (Test)
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <div className="text-xs text-slate-500">
            Click test to broadcast a live test headline into your target channel.
          </div>

          <button
            onClick={onTestBroadcast}
            disabled={waStatus !== "connected" || isBroadcasting}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-600/20 hover:bg-green-700 active:scale-95 transition disabled:opacity-50"
          >
            {isBroadcasting ? (
              <>
                <FaSyncAlt className="animate-spin" /> Sending Test...
              </>
            ) : (
              <>
                <FaPaperPlane /> ⚡ Send Test Broadcast to Channel
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

/* Rich text editor */
function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);

  const runCommand = (command, commandValue = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, commandValue);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const preventFocusLoss = (event) => {
    event.preventDefault();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-blue-100 bg-white focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-blue-100 bg-blue-50/50 p-2">
        <ToolbarButton
          label="B"
          title="Bold"
          className="font-bold"
          onMouseDown={preventFocusLoss}
          onClick={() => runCommand("bold")}
        />

        <ToolbarButton
          label="I"
          title="Italic"
          className="italic"
          onMouseDown={preventFocusLoss}
          onClick={() => runCommand("italic")}
        />

        <ToolbarButton
          label="U"
          title="Underline"
          className="underline"
          onMouseDown={preventFocusLoss}
          onClick={() => runCommand("underline")}
        />

        <div className="mx-1 h-6 w-px bg-blue-100" />

        <select
          title="Font size"
          defaultValue="3"
          onMouseDown={preventFocusLoss}
          onChange={(event) =>
            runCommand("fontSize", event.target.value)
          }
          className="rounded-md border border-blue-100 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-orange-400"
        >
          <option value="2">Small</option>
          <option value="3">Normal</option>
          <option value="4">Large</option>
          <option value="5">Heading</option>
        </select>

        <label className="flex cursor-pointer items-center gap-1 rounded-md border border-blue-100 bg-white px-2 py-1.5 text-xs text-slate-700 hover:bg-orange-50">
          <span className="font-bold">A</span>
          <input
            type="color"
            defaultValue="#1e293b"
            onChange={(event) =>
              runCommand("foreColor", event.target.value)
            }
            className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
          />
        </label>

        <div className="mx-1 h-6 w-px bg-blue-100" />

        <ToolbarButton
          label="Left"
          title="Align left"
          onMouseDown={preventFocusLoss}
          onClick={() => runCommand("justifyLeft")}
        />

        <ToolbarButton
          label="Center"
          title="Align center"
          onMouseDown={preventFocusLoss}
          onClick={() => runCommand("justifyCenter")}
        />

        <ToolbarButton
          label="Right"
          title="Align right"
          onMouseDown={preventFocusLoss}
          onClick={() => runCommand("justifyRight")}
        />

        <ToolbarButton
          label="• List"
          title="Bullet list"
          className="px-2 text-xs"
          onMouseDown={preventFocusLoss}
          onClick={() => runCommand("insertUnorderedList")}
        />

        <button
          type="button"
          title="Clear formatting"
          onMouseDown={preventFocusLoss}
          onClick={() => runCommand("removeFormat")}
          className="ml-auto rounded-md px-2 py-1.5 text-xs text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          Clear
        </button>
      </div>

      {/* Editable content */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleEditorInput}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder="Write your complete news article here..."
        className="rich-editor min-h-[220px] bg-white px-4 py-4 text-sm leading-7 text-slate-800 outline-none"
      />
    </div>
  );
}

function ToolbarButton({
  label,
  title,
  onClick,
  onMouseDown,
  className = "",
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={`rounded-md border border-transparent px-2.5 py-1.5 text-sm text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 ${className}`}
    >
      {label}
    </button>
  );
}