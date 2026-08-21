import React, { useMemo, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FaCopy,
  FaCheck,
  FaUsers,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLink,
  FaLayerGroup,
  FaCalendarAlt,
  FaBullhorn,
} from "react-icons/fa";

import {
  getAllArticles,
  saveArticleToStore,
  deleteArticleFromStore,
  JHARKHAND_DISTRICTS,
  NEWS_CATEGORIES,
  getSubscribers,
  deleteSubscriber,
  getNotifications,
  clearNotifications,
  generateSlug,
} from "../data/newsData";

import {
  isAdminAuthenticated,
  getAdminUser,
  logoutAdmin,
} from "../utils/auth";

export default function Admin() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);

  // Authentication Guard
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate("/Login?redirect=/Admin", { replace: true });
      return;
    }
    setAdminUser(getAdminUser());
  }, [navigate]);

  const [activePage, setActivePage] = useState("dashboard"); // 'dashboard' | 'news' | 'add-news' | 'subscribers' | 'notifications'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newsList, setNewsList] = useState(() => getAllArticles());
  const [subscribersList, setSubscribersList] = useState(() => getSubscribers());
  const [notificationsList, setNotificationsList] = useState(() => getNotifications());
  const [editingArticleId, setEditingArticleId] = useState(null);

  const [toast, setToast] = useState(null); // { type: 'success' | 'error' | 'info', message: '' }
  const [copiedLinkArticleId, setCopiedLinkArticleId] = useState(null);
  const [publishedModalArticle, setPublishedModalArticle] = useState(null);

  const initialFormState = {
    title: "",
    category: "Jharkhand",
    district: "Ranchi",
    reporter: "स्वदेश वाणी ब्यूरो",
    excerpt: "",
    content: "",
    image: "",
    status: "Published",
  };

  const [formData, setFormData] = useState(initialFormState);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4500);
  };

  // Helper to get permanent article URL
  const getArticleUrl = (article) => {
    const origin = window.location.origin;
    return `${origin}/news/${article?.id || ""}`;
  };

  const handleCopyArticleLink = (article, e) => {
    if (e) e.stopPropagation();
    const url = getArticleUrl(article);
    navigator.clipboard.writeText(url);
    setCopiedLinkArticleId(article.id);
    showToast("लेख का स्थायी लिंक कॉपी कर लिया गया (Link Copied)!", "success");
    setTimeout(() => setCopiedLinkArticleId(null), 2500);
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/Login", { replace: true });
  };

  // Sync articles list
  const refreshArticles = () => {
    setNewsList(getAllArticles());
    setNotificationsList(getNotifications());
  };

  // Search filtered news
  const filteredNews = useMemo(() => {
    if (!searchTerm.trim()) return newsList;
    const term = searchTerm.toLowerCase();
    return newsList.filter(
      (item) =>
        (item.title && item.title.toLowerCase().includes(term)) ||
        (item.category && item.category.toLowerCase().includes(term)) ||
        (item.district && item.district.toLowerCase().includes(term)) ||
        (item.reporter && item.reporter.toLowerCase().includes(term)) ||
        (item.id && String(item.id).toLowerCase().includes(term))
    );
  }, [newsList, searchTerm]);

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast("कृपया 10MB से छोटी तस्वीर अपलोड करें।", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
      showToast("तस्वीर सफलतापूर्वक अपलोड हो गई!", "success");
    };
    reader.onerror = () => {
      showToast("तस्वीर अपलोड करने में विफल।", "error");
    };
    reader.readAsDataURL(file);
  };

  // Submit Article (Save or Edit)
  const handleSubmitArticle = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast("कृपया समाचार का शीर्षक (Title) दर्ज करें।", "error");
      return;
    }

    if (!formData.content.trim() && !formData.excerpt.trim()) {
      showToast("कृपया समाचार का विवरण (Content/Excerpt) दर्ज करें।", "error");
      return;
    }

    const isEdit = !!editingArticleId;
    const articlePayload = {
      ...formData,
      id: isEdit ? editingArticleId : `art-${Date.now()}`,
      slug: generateSlug(formData.title),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const res = saveArticleToStore(articlePayload);
    refreshArticles();

    const saved = res.savedArticle || articlePayload;

    if (isEdit) {
      showToast("समाचार सफलतापूर्वक अपडेट किया गया!", "success");
    } else {
      showToast("समाचार प्रकाशित हुआ एवं पाठकों को सूचना (Notification) भेज दी गई!", "success");
      setPublishedModalArticle(saved);
    }

    setFormData(initialFormState);
    setEditingArticleId(null);
    if (isEdit) {
      setActivePage("news");
    }
  };

  // Edit existing article
  const handleEditClick = (article) => {
    setEditingArticleId(article.id);
    setFormData({
      title: article.title || "",
      category: article.category || "Jharkhand",
      district: article.district || "Ranchi",
      reporter: article.reporter || article.author || "स्वदेश वाणी ब्यूरो",
      excerpt: article.excerpt || "",
      content: article.content || "",
      image: article.image || "",
      status: article.status || "Published",
    });
    setActivePage("add-news");
  };

  // Delete article
  const handleDeleteArticle = (id) => {
    if (window.confirm("क्या आप वाकई इस समाचार को हटाना चाहते हैं?")) {
      deleteArticleFromStore(id);
      refreshArticles();
      showToast("समाचार सफलतापूर्वक हटा दिया गया।", "info");
    }
  };

  // Delete subscriber
  const handleDeleteSubscriber = (subId) => {
    if (window.confirm("क्या आप इस सब्सक्राइबर को हटाना चाहते हैं?")) {
      const updated = deleteSubscriber(subId);
      setSubscribersList(updated);
      showToast("सब्सक्राइबर हटा दिया गया।", "info");
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-800">
      {/* Toast Notification Popup */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-semibold transition-all duration-300 transform translate-y-0 ${
            toast.type === "success"
              ? "bg-emerald-600 border-emerald-500 text-white"
              : toast.type === "error"
              ? "bg-red-600 border-red-500 text-white"
              : "bg-blue-600 border-blue-500 text-white"
          }`}
        >
          <FaCheckCircle className="text-lg shrink-0" />
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-3 text-white/80 hover:text-white"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Published Confirmation Modal with Distinct Link */}
      {publishedModalArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="text-center">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-3xl" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Published &bull; सूचना प्रसारित
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-3">
                समाचार सफलतापूर्वक प्रकाशित हुआ!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2">
                &ldquo;{publishedModalArticle.title}&rdquo;
              </p>
            </div>

            {/* Distinct Permanent Link Box */}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <FaLink className="text-orange-500" />
                <span>इस लेख का स्थायी लिंक (Distinct Live URL)</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={getArticleUrl(publishedModalArticle)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-700 select-all outline-none"
                />
                <button
                  onClick={() => handleCopyArticleLink(publishedModalArticle)}
                  className="px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FaCopy /> कॉपी करें
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/news/${publishedModalArticle.id}`}
                target="_blank"
                className="flex-1 py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs text-center flex items-center justify-center gap-2 transition"
              >
                <span>लाइव पेज देखें (View Live Article)</span>
                <FaExternalLinkAlt size={11} />
              </Link>

              <button
                onClick={() => setPublishedModalArticle(null)}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                बंद करें (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20">
                स्व
              </div>
              <div>
                <h1 className="font-extrabold text-white text-base tracking-tight leading-tight">
                  स्वदेश वाणी
                </h1>
                <p className="text-[11px] text-orange-400 font-semibold tracking-wider uppercase">
                  Admin Panel
                </p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
              Main Menu
            </p>

            <button
              onClick={() => {
                setActivePage("dashboard");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activePage === "dashboard"
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <FaHome className="text-base" />
              <span>डैशबोर्ड (Dashboard)</span>
            </button>

            <button
              onClick={() => {
                setActivePage("news");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activePage === "news"
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <FaNewspaper className="text-base" />
                <span>सभी समाचार (News List)</span>
              </div>
              <span className="text-xs bg-slate-800 px-2.5 py-0.5 rounded-full font-bold">
                {newsList.length}
              </span>
            </button>

            <button
              onClick={() => {
                setEditingArticleId(null);
                setFormData(initialFormState);
                setActivePage("add-news");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activePage === "add-news"
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <FaPlus className="text-base" />
              <span>नया लेख लिखें (Add News)</span>
            </button>

            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-2">
              Audience &amp; Alerts
            </p>

            <button
              onClick={() => {
                setActivePage("notifications");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activePage === "notifications"
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <FaBell className="text-base" />
                <span>सूचनाएं (Notifications)</span>
              </div>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full font-bold">
                {notificationsList.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActivePage("subscribers");
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activePage === "subscribers"
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <FaUsers className="text-base" />
                <span>सब्सक्राइबर्स (Subscribers)</span>
              </div>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full font-bold">
                {subscribersList.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
          >
            <FaExternalLinkAlt size={12} />
            <span>वेबसाइट देखें (Visit Website)</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-bold transition cursor-pointer"
          >
            <FaSignOutAlt size={13} />
            <span>लॉगआउट (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              aria-label="Open sidebar"
            >
              <FaBars className="text-lg" />
            </button>

            <div>
              <h2 className="text-lg font-extrabold text-blue-950 capitalize">
                {activePage === "dashboard" && "संपादकीय डैशबोर्ड (Dashboard)"}
                {activePage === "news" && "समाचार प्रबंधन (All News Articles)"}
                {activePage === "add-news" && (editingArticleId ? "समाचार संपादित करें (Edit News)" : "नया समाचार प्रकाशित करें (Publish News)")}
                {activePage === "notifications" && "प्रकाशन सूचनाएं (Notification History)"}
                {activePage === "subscribers" && "सब्सक्राइबर सूची (Reader Subscriptions)"}
              </h2>
              <p className="text-xs text-slate-500">
                सत्य, निष्पक्ष और सटीक पत्रकारिता &bull; स्वदेश वाणी
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Action Button */}
            <button
              onClick={() => {
                setEditingArticleId(null);
                setFormData(initialFormState);
                setActivePage("add-news");
              }}
              className="hidden sm:flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition cursor-pointer"
            >
              <FaPlus /> नया समाचार जोड़ें
            </button>

            {/* Admin Profile Details */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-slate-800">
                  {adminUser?.name || "Chief Editor"}
                </p>
                <p className="text-[11px] text-emerald-600 font-semibold">
                  {adminUser?.role || "Super Admin"}
                </p>
              </div>

              <div className="h-10 w-10 rounded-xl bg-blue-950 text-white flex items-center justify-center font-bold text-sm shadow-inner">
                {adminUser?.name?.charAt(0) || "A"}
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
              >
                <FaSignOutAlt size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* ==================================================== */}
          {/* TAB 1: DASHBOARD                                    */}
          {/* ==================================================== */}
          {activePage === "dashboard" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      कुल प्रकाशित समाचार
                    </p>
                    <h3 className="text-3xl font-extrabold text-blue-950 mt-1">
                      {newsList.length}
                    </h3>
                    <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                      सक्रिय एवं लाइव
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
                    <FaNewspaper />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      झारखंड के जिले
                    </p>
                    <h3 className="text-3xl font-extrabold text-blue-950 mt-1">
                      24
                    </h3>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">
                      कवरेज क्षेत्र
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center text-xl">
                    <FaMapMarkerAlt />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      कुल सब्सक्राइबर्स
                    </p>
                    <h3 className="text-3xl font-extrabold text-blue-950 mt-1">
                      {subscribersList.length}
                    </h3>
                    <p className="text-[11px] text-blue-600 font-semibold mt-1">
                      ईमेल एवं मोबाइल
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl">
                    <FaUsers />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      भेजी गई सूचनाएं
                    </p>
                    <h3 className="text-3xl font-extrabold text-blue-950 mt-1">
                      {notificationsList.length}
                    </h3>
                    <p className="text-[11px] text-orange-600 font-semibold mt-1">
                      ऑटो-नोटिफिकेशन सक्रिय
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
                    <FaBullhorn />
                  </div>
                </div>
              </div>

              {/* Quick Publish Banner */}
              <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-bold border border-orange-500/30 uppercase tracking-wider">
                    Instant Publishing &bull; स्थायी लिंक
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight">
                    ताज़ा खबर तुरंत प्रकाशित करें
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                    प्रत्येक प्रकाशित समाचार को एक स्थायी लिंक प्राप्त होता है और सभी पाठकों को तुरंत नोटिफिकेशन भेजा जाता है।
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingArticleId(null);
                    setFormData(initialFormState);
                    setActivePage("add-news");
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/30 transition flex items-center gap-2.5 shrink-0 cursor-pointer"
                >
                  <FaPlus />
                  <span>नया समाचार लिखें</span>
                </button>
              </div>

              {/* Recent Articles with Distinct Live Links */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-blue-950">
                      हाल ही में प्रकाशित समाचार (Recent Articles &amp; Links)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Click to copy or open distinct permanent article URLs
                    </p>
                  </div>

                  <button
                    onClick={() => setActivePage("news")}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <span>सभी देखें ({newsList.length})</span> &rarr;
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {newsList.slice(0, 6).map((article) => (
                    <div
                      key={article.id}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 p-2 rounded-xl transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {article.image ? (
                          <img
                            src={article.image}
                            alt=""
                            className="h-12 w-16 object-cover rounded-lg shrink-0 border border-slate-200"
                          />
                        ) : (
                          <div className="h-12 w-16 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center text-slate-400">
                            <FaNewspaper />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {article.title}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                            <span className="px-2 py-0.5 bg-orange-50 text-orange-600 font-semibold rounded-md border border-orange-100">
                              {article.category}
                            </span>
                            {article.district && (
                              <span className="text-slate-600">
                                &bull; {article.district}
                              </span>
                            )}
                            <span>&bull; {article.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Distinct Link Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => handleCopyArticleLink(article, e)}
                          title="Copy Permanent Link"
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-orange-300 bg-white text-slate-700 hover:text-orange-600 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          {copiedLinkArticleId === article.id ? (
                            <>
                              <FaCheck className="text-emerald-600" />
                              <span className="text-emerald-600">कॉपी हो गया</span>
                            </>
                          ) : (
                            <>
                              <FaCopy />
                              <span>लिंक कॉपी करें</span>
                            </>
                          )}
                        </button>

                        <Link
                          to={`/news/${article.id}`}
                          target="_blank"
                          title="View Live Article Page"
                          className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <FaExternalLinkAlt size={10} />
                          <span>देखें</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 2: ALL NEWS ARTICLES TABLE                       */}
          {/* ==================================================== */}
          {activePage === "news" && (
            <div className="space-y-5 animate-fadeIn">
              {/* Filter and Search Bar */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="शीर्षक, श्रेणी, जिला या ID से खोजें..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-orange-500 focus:bg-white transition"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs text-slate-500 font-semibold">
                    कुल समाचार: <strong>{filteredNews.length}</strong>
                  </span>

                  <button
                    onClick={() => {
                      setEditingArticleId(null);
                      setFormData(initialFormState);
                      setActivePage("add-news");
                    }}
                    className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                  >
                    <FaPlus /> नया लेख लिखें
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px] tracking-wider">
                      <tr>
                        <th className="py-4 px-5">समाचार (Article &amp; ID)</th>
                        <th className="py-4 px-4">श्रेणी (Category)</th>
                        <th className="py-4 px-4">जिला (District)</th>
                        <th className="py-4 px-4">तारीख (Date)</th>
                        <th className="py-4 px-4">स्थायी लिंक (Live Link)</th>
                        <th className="py-4 px-5 text-right">कार्रवाई (Actions)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredNews.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            कोई समाचार नहीं मिला।
                          </td>
                        </tr>
                      ) : (
                        filteredNews.map((article) => (
                          <tr
                            key={article.id}
                            className="hover:bg-slate-50/80 transition"
                          >
                            {/* Article Title & Thumbnail */}
                            <td className="py-3.5 px-5">
                              <div className="flex items-center gap-3 max-w-md">
                                {article.image ? (
                                  <img
                                    src={article.image}
                                    alt=""
                                    className="h-11 w-14 object-cover rounded-lg shrink-0 border border-slate-200"
                                  />
                                ) : (
                                  <div className="h-11 w-14 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center text-slate-400">
                                    <FaNewspaper />
                                  </div>
                                )}
                                <div className="min-w-0">
                                  <p className="font-bold text-slate-900 truncate">
                                    {article.title}
                                  </p>
                                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                                    ID: {article.id}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-3.5 px-4">
                              <span className="px-2.5 py-1 bg-orange-50 text-orange-600 font-bold rounded-full border border-orange-200">
                                {article.category}
                              </span>
                            </td>

                            {/* District */}
                            <td className="py-3.5 px-4 font-semibold text-slate-700">
                              {article.district || "—"}
                            </td>

                            {/* Date */}
                            <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                              {article.date}
                            </td>

                            {/* Distinct Live URL */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={(e) => handleCopyArticleLink(article, e)}
                                  title="Copy Distinct URL"
                                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-orange-600 transition"
                                >
                                  {copiedLinkArticleId === article.id ? (
                                    <FaCheck className="text-emerald-600" />
                                  ) : (
                                    <FaCopy />
                                  )}
                                </button>
                                <Link
                                  to={`/news/${article.id}`}
                                  target="_blank"
                                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline flex items-center gap-1 text-xs"
                                >
                                  <span>/news/{article.id}</span>
                                  <FaExternalLinkAlt size={10} />
                                </Link>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEditClick(article)}
                                  title="Edit"
                                  className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDeleteArticle(article.id)}
                                  title="Delete"
                                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 3: ADD OR EDIT NEWS FORM                         */}
          {/* ==================================================== */}
          {activePage === "add-news" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-extrabold text-blue-950">
                      {editingArticleId
                        ? "समाचार संपादित करें (Edit News Article)"
                        : "नया समाचार प्रकाशित करें (Publish News Article)"}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      शीर्षक, विवरण, जिला और तस्वीर भरें &bull; प्रकाशित होते ही स्थायी लिंक बनेगा
                    </p>
                  </div>

                  {editingArticleId && (
                    <button
                      onClick={() => {
                        setEditingArticleId(null);
                        setFormData(initialFormState);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 underline"
                    >
                      रद्द करें (Cancel Edit)
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmitArticle} className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      समाचार का मुख्य शीर्षक (Title / Headline) *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="उदा. रांची में आयोजित हुआ राज्यस्तरीय युवा संवाद कार्यक्रम..."
                      required
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 outline-none focus:border-orange-500 focus:bg-white transition"
                    />
                  </div>

                  {/* Slug & Distinct Permanent URL Preview */}
                  <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl text-xs space-y-1">
                    <p className="font-bold text-orange-900 flex items-center gap-1.5">
                      <FaLink />
                      <span>स्थायी लिंक पूर्वावलोकन (Distinct URL Preview):</span>
                    </p>
                    <p className="text-orange-800 font-mono">
                      {window.location.origin}/news/
                      <span className="font-bold">
                        {editingArticleId || generateSlug(formData.title || "unique-article-id")}
                      </span>
                    </p>
                  </div>

                  {/* Category & District Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        श्रेणी (Category)
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold outline-none focus:border-orange-500 focus:bg-white"
                      >
                        {NEWS_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        झारखंड जिला (District)
                      </label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold outline-none focus:border-orange-500 focus:bg-white"
                      >
                        {JHARKHAND_DISTRICTS.map((dist) => (
                          <option key={dist} value={dist}>
                            {dist}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Reporter & Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        रिपोर्टर / ब्यूरो (Reporter / Author)
                      </label>
                      <input
                        type="text"
                        name="reporter"
                        value={formData.reporter}
                        onChange={handleInputChange}
                        placeholder="स्वदेश वाणी ब्यूरो"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-orange-500 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        स्थिति (Status)
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold outline-none focus:border-orange-500 focus:bg-white"
                      >
                        <option value="Published">Published (लाइव प्रकाशित)</option>
                        <option value="Draft">Draft (ड्राफ्ट रखें)</option>
                      </select>
                    </div>
                  </div>

                  {/* Excerpt / Summary */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      संक्षिप्त सारांश (Excerpt / Short Summary)
                    </label>
                    <textarea
                      name="excerpt"
                      rows={2}
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="समाचार का 1-2 पंक्तियों में मुख्य सार..."
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  {/* Full Story Content */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      विस्तृत समाचार (Full Story Content) *
                    </label>
                    <textarea
                      name="content"
                      rows={8}
                      value={formData.content}
                      onChange={handleInputChange}
                      placeholder="पूरी खबर विस्तार से यहां लिखें..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm outline-none focus:border-orange-500 focus:bg-white leading-relaxed"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      मुख्य तस्वीर (Featured Image)
                    </label>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <label className="flex-1 w-full border-2 border-dashed border-slate-300 hover:border-orange-500 rounded-2xl p-6 text-center cursor-pointer transition bg-slate-50/50 hover:bg-orange-50/20">
                        <FaCloudUploadAlt className="text-3xl text-orange-500 mx-auto mb-2" />
                        <span className="text-xs font-bold text-slate-700 block">
                          कंप्यूटर / मोबाइल से तस्वीर चुनें (Click to Upload)
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-1">
                          PNG, JPG, JPEG (Max 10MB)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>

                      {/* Image Preview */}
                      {formData.image && (
                        <div className="relative shrink-0">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="h-28 w-36 object-cover rounded-2xl border border-slate-300 shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
                            className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full text-xs shadow hover:bg-red-700"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Or Image URL */}
                    <div className="mt-2">
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="या फिर इमेज URL पेस्ट करें (e.g. https://...)"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(initialFormState);
                        setEditingArticleId(null);
                        setActivePage("news");
                      }}
                      className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
                    >
                      रद्द करें (Cancel)
                    </button>

                    <button
                      type="submit"
                      className="px-7 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-lg shadow-orange-600/30 transition flex items-center gap-2 cursor-pointer"
                    >
                      <FaCheckCircle />
                      <span>
                        {editingArticleId
                          ? "अपडेट करें (Update Article)"
                          : "प्रकाशित करें एवं सूचना भेजें (Publish & Notify)"}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 4: NOTIFICATIONS HISTORY                         */}
          {/* ==================================================== */}
          {activePage === "notifications" && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-blue-950">
                    प्रकाशन सूचनाएं (Notification History)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    प्रत्येक प्रकाशित लेख पर पाठकों को भेजी गई सूचनाएं
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm("क्या आप सभी सूचनाएं मिटाना चाहते हैं?")) {
                      clearNotifications();
                      setNotificationsList([]);
                      showToast("सभी सूचनाएं साफ कर दी गईं।", "info");
                    }
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  सभी मिटाएं (Clear All)
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100">
                {notificationsList.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 text-sm">
                    कोई सूचना उपलब्ध नहीं है।
                  </div>
                ) : (
                  notificationsList.map((n) => (
                    <div
                      key={n.id}
                      className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                          <FaBell />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {n.title}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span className="font-semibold text-orange-600">{n.category}</span>
                            <span>&bull;</span>
                            <span>{n.district}</span>
                            <span>&bull;</span>
                            <span>{n.timestamp || n.date}</span>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/news/${n.articleId}`}
                        target="_blank"
                        className="px-3.5 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 transition"
                      >
                        <FaExternalLinkAlt size={10} />
                        <span>लेख देखें</span>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ==================================================== */}
          {/* TAB 5: SUBSCRIBERS LIST                             */}
          {/* ==================================================== */}
          {activePage === "subscribers" && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-blue-950">
                    सब्सक्राइबर्स सूची (Audience &amp; Readers)
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    वेबसाइट से दैनिक समाचार अलर्ट के लिए सब्सक्राइब किए गए पाठक
                  </p>
                </div>

                <span className="px-3.5 py-1.5 bg-purple-50 text-purple-700 font-bold text-xs rounded-full border border-purple-200">
                  कुल: {subscribersList.length}
                </span>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px] tracking-wider">
                      <tr>
                        <th className="py-4 px-5">मोबाइल नंबर</th>
                        <th className="py-4 px-4">ईमेल आईडी</th>
                        <th className="py-4 px-4">सब्सक्रिप्शन दिनांक</th>
                        <th className="py-4 px-4">स्थिति</th>
                        <th className="py-4 px-5 text-right">कार्रवाई</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {subscribersList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400">
                            कोई सब्सक्राइबर नहीं मिला।
                          </td>
                        </tr>
                      ) : (
                        subscribersList.map((sub) => (
                          <tr key={sub.id} className="hover:bg-slate-50 transition">
                            <td className="py-3.5 px-5 font-bold text-slate-800">
                              <span className="flex items-center gap-2">
                                <FaPhoneAlt className="text-orange-500 text-xs" />
                                {sub.phone || "—"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">
                              <span className="flex items-center gap-2">
                                <FaEnvelope className="text-blue-500 text-xs" />
                                {sub.email || "—"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-500">
                              {sub.subscribedAt}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200 text-[11px]">
                                {sub.status || "Active"}
                              </span>
                            </td>
                            <td className="py-3.5 px-5 text-right">
                              <button
                                onClick={() => handleDeleteSubscriber(sub.id)}
                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                                title="Remove"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}