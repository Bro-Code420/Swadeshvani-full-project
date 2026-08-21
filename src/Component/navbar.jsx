import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import hindilogo from "./photos/logo.jpeg";
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronRight,
  Home,
  Newspaper,
  GraduationCap,
  Globe,
  Briefcase,
  Trophy,
  Cpu,
  Tv,
  Video,
  User,
  UserCog,
  Megaphone,
  Info,
  History,
  LogOut,
  Check,
  Trash2,
  ExternalLink,
  Volume2,
} from "lucide-react";

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  clearNotifications,
  requestNotificationPermission,
  getAllArticles,
} from "../data/newsData";

import { isAdminAuthenticated, logoutAdmin, getAdminUser } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => getNotifications());
  const [isAdmin, setIsAdmin] = useState(() => isAdminAuthenticated());
  const [adminUser, setAdminUser] = useState(() => getAdminUser());

  const searchInputRef = useRef(null);
  const notifDropdownRef = useRef(null);

  // Sync auth state
  useEffect(() => {
    const checkAuth = () => {
      const auth = isAdminAuthenticated();
      setIsAdmin(auth);
      setAdminUser(getAdminUser());
    };

    window.addEventListener("sv_auth_change", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("sv_auth_change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Sync notifications
  useEffect(() => {
    const updateNotifs = () => {
      setNotifications(getNotifications());
    };

    window.addEventListener("sv_notification_received", updateNotifs);
    window.addEventListener("sv_notifications_change", updateNotifs);
    window.addEventListener("storage", updateNotifs);

    return () => {
      window.removeEventListener("sv_notification_received", updateNotifs);
      window.removeEventListener("sv_notifications_change", updateNotifs);
      window.removeEventListener("storage", updateNotifs);
    };
  }, []);

  // Close notifications dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(e.target)
      ) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live search autocomplete results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase().trim();
    const all = getAllArticles();
    const matches = all
      .filter(
        (a) =>
          (a.title && a.title.toLowerCase().includes(q)) ||
          (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
          (a.category && a.category.toLowerCase().includes(q)) ||
          (a.district && a.district.toLowerCase().includes(q))
      )
      .slice(0, 5);
    setSearchResults(matches);
  }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.trim();
    setSearchOpen(false);
    setSearchResults([]);
    setMenuOpen(false);
    setSidebarOpen(false);
    navigate(`/News?q=${encodeURIComponent(query)}`);
  };

  const handleSelectSearchResult = (articleId) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setMenuOpen(false);
    setSidebarOpen(false);
    navigate(`/news/${articleId}`);
  };

  const handleNotificationClick = (notif) => {
    markNotificationAsRead(notif.id);
    setNotifOpen(false);
    setMenuOpen(false);
    if (notif.articleId) {
      navigate(`/news/${notif.articleId}`);
    }
  };

  const handleRequestPermission = async () => {
    await requestNotificationPermission();
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/Login");
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setSidebarOpen(false);
    setSearchOpen(false);
    setNotifOpen(false);
  };

  // Nav links with fixed routes
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "District", to: "/District" },
    { label: "Historic Jharkhand", to: "/HistoricJharkhand" },
    { label: "Videos", to: "/YouTubeVideos" },
    { label: "Advertisement", to: "/Advertisement" },
    { label: "About", to: "/About" },
  ];

  const sidebarLinks = [
    {
      section: "Main",
      items: [
        { icon: <Home size={18} />, title: "Home", to: "/" },
        { icon: <Newspaper size={18} />, title: "All News & Feeds", to: "/News" },
        { icon: <Newspaper size={18} />, title: "District News", to: "/District" },
      ],
    },
    {
      section: "Categories",
      items: [
        { icon: <GraduationCap size={18} />, title: "Education", to: "/Education" },
        { icon: <Globe size={18} />, title: "World News", to: "/Worldnews" },
        { icon: <Cpu size={18} />, title: "Technology", to: "/Technologynews" },
        { icon: <Trophy size={18} />, title: "Sports", to: "/Sportsnews" },
      ],
    },
    {
      section: "Jharkhand & Features",
      items: [
        { icon: <History size={18} />, title: "Historic Jharkhand", to: "/HistoricJharkhand" },
        { icon: <Video size={18} />, title: "YouTube Videos", to: "/YouTubeVideos" },
        { icon: <Megaphone size={18} />, title: "Advertisement", to: "/Advertisement" },
        { icon: <Info size={18} />, title: "About Us", to: "/About" },
      ],
    },
    {
      section: "Admin & Account",
      items: isAdmin
        ? [
            { icon: <UserCog size={18} />, title: "Admin Panel", to: "/Admin" },
          ]
        : [
            { icon: <User size={18} />, title: "Admin Login", to: "/Login" },
          ],
    },
  ];

  const headerCategories = [
    { label: "Education", to: "/Education" },
    { label: "World", to: "/Worldnews" },
    { label: "Technology", to: "/Technologynews" },
    { label: "Sports", to: "/Sportsnews" },
    { label: "District", to: "/District" },
  ];

  return (
    <>
      {/* Tricolor accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600" />

      {/* Sidebar overlay */}
      <div
        onClick={closeMenus}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all duration-300 ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 flex flex-col justify-between ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar header */}
          <div className="flex h-20 items-center justify-between border-b border-gray-100 px-5">
            <Link to="/" onClick={closeMenus}>
              <img
                src={hindilogo}
                alt="Swadesh Vani Logo"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-orange-50 hover:text-orange-600"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar navigation list */}
          <nav className="h-[calc(100vh-12rem)] overflow-y-auto py-4">
            {sidebarLinks.map((sectionGroup) => (
              <div key={sectionGroup.section} className="mb-5">
                <p className="mb-1.5 px-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {sectionGroup.section}
                </p>

                <div className="space-y-0.5">
                  {sectionGroup.items.map((item) => (
                    <Link
                      key={item.title}
                      to={item.to}
                      onClick={closeMenus}
                      className="group flex w-full items-center justify-between px-5 py-2.5 transition hover:bg-orange-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-orange-600">{item.icon}</span>
                        <span className="text-sm font-medium text-gray-700 transition group-hover:text-orange-600">
                          {item.title}
                        </span>
                      </div>
                      <ChevronRight
                        size={16}
                        className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-orange-600"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Bottom Auth Status */}
        {isAdmin && (
          <div className="p-4 border-t border-gray-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                A
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-800">Admin Active</p>
                <Link
                  to="/Admin"
                  onClick={closeMenus}
                  className="text-orange-600 hover:underline text-[11px]"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-600 transition"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        )}
      </aside>

      {/* Main Header */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="relative flex h-20 items-center justify-between lg:h-24">
            {/* Left menu trigger button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2 text-gray-700 transition hover:text-orange-600"
              aria-label="Open menu"
            >
              <Menu size={22} />
              <span className="hidden text-xs font-bold uppercase tracking-wider md:block">
                Menu
              </span>
            </button>

            {/* Center Brand Logo */}
            <Link
              to="/"
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <img
                src={hindilogo}
                alt="Swadesh Vani Logo"
                className="h-14 w-auto select-none object-contain sm:h-18 lg:h-20"
              />
            </Link>

            {/* Right Desktop Controls */}
            <div className="hidden items-center gap-4 lg:flex">
              {/* Category shortcuts */}
              <nav className="flex items-center gap-4">
                {headerCategories.map((category) => (
                  <Link
                    key={category.label}
                    to={category.to}
                    className="text-xs font-bold text-gray-700 hover:text-orange-600 transition"
                  >
                    {category.label}
                  </Link>
                ))}
              </nav>

              <div className="h-4 w-px bg-gray-200" />

              {/* Enhanced Search Input with Live Dropdown */}
              <div className="relative">
                {!searchOpen ? (
                  <button
                    onClick={() => {
                      setSearchOpen(true);
                      setTimeout(() => searchInputRef.current?.focus(), 50);
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-orange-300 hover:text-orange-600"
                    aria-label="Open search"
                  >
                    <Search size={17} />
                  </button>
                ) : (
                  <div className="relative">
                    <form
                      onSubmit={handleSearchSubmit}
                      className="flex items-center gap-1.5"
                    >
                      <div className="relative">
                        <input
                          ref={searchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="समाचार खोजें (Press Enter)..."
                          className="w-56 rounded-full border border-orange-400 bg-white pl-3.5 pr-8 py-2 text-xs text-gray-800 outline-none shadow-sm focus:ring-2 focus:ring-orange-100"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="rounded-full bg-orange-600 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-orange-700 shadow-sm"
                      >
                        Search
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                          setSearchResults([]);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                      >
                        <X size={15} />
                      </button>
                    </form>

                    {/* Autocomplete Dropdown Preview */}
                    {searchQuery.trim() && searchResults.length > 0 && (
                      <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white p-2 shadow-2xl border border-gray-100 z-50 animate-fadeIn">
                        <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 flex items-center justify-between">
                          <span>मिलते-जुलते समाचार</span>
                          <span className="text-orange-600">{searchResults.length}</span>
                        </div>
                        <div className="divide-y divide-gray-50">
                          {searchResults.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelectSearchResult(item.id)}
                              className="w-full text-left p-2.5 hover:bg-orange-50 rounded-xl transition flex items-start gap-2.5 group cursor-pointer"
                            >
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt=""
                                  className="h-10 w-12 object-cover rounded-lg shrink-0 border border-gray-200"
                                />
                              )}
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-800 group-hover:text-orange-600 line-clamp-2 leading-tight">
                                  {item.title}
                                </p>
                                <span className="text-[10px] text-orange-600 font-bold uppercase mt-0.5 inline-block">
                                  {item.category}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full mt-1.5 py-1.5 bg-slate-50 hover:bg-orange-100 text-center text-xs font-bold text-orange-700 rounded-xl transition cursor-pointer"
                        >
                          सभी परिणाम देखें &rarr;
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Notification Bell Dropdown */}
              <div className="relative" ref={notifDropdownRef}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition ${
                    notifOpen
                      ? "border-orange-500 bg-orange-50 text-orange-600"
                      : "border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600"
                  }`}
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                  {unreadNotifsCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-extrabold text-white ring-2 ring-white">
                      {unreadNotifsCount > 9 ? "9+" : unreadNotifsCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {notifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-3xl bg-white shadow-2xl border border-gray-100 z-50 p-4 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                          <Bell size={14} />
                        </div>
                        <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                          समाचार सूचनाएं (Notifications)
                        </h4>
                      </div>

                      {unreadNotifsCount > 0 && (
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-[11px] font-bold text-orange-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Check size={12} />
                          <span>Mark all read</span>
                        </button>
                      )}
                    </div>

                    {/* Push permission hint */}
                    {"Notification" in window && Notification.permission !== "granted" && (
                      <div className="p-2.5 bg-orange-50 border border-orange-200 rounded-2xl flex items-center justify-between text-xs">
                        <span className="text-orange-950 text-[11px]">
                          ताज़ा खबरों के ब्राउज़र अलर्ट पाएं
                        </span>
                        <button
                          onClick={handleRequestPermission}
                          className="px-2 py-1 bg-orange-600 text-white rounded-lg text-[10px] font-bold hover:bg-orange-700 transition"
                        >
                          Allow
                        </button>
                      </div>
                    )}

                    {/* Notifications List */}
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-50 -mx-1 px-1">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-xs text-gray-400">
                          कोई नई सूचना नहीं है।
                        </div>
                      ) : (
                        notifications.slice(0, 10).map((n) => (
                          <div
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`p-3 rounded-2xl transition flex items-start gap-3 cursor-pointer ${
                              !n.read ? "bg-orange-50/50 hover:bg-orange-50" : "hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${
                                !n.read ? "bg-orange-600" : "bg-gray-200"
                              }`}
                            />
                            <div className="min-w-0 flex-1">
                              <p
                                className={`text-xs leading-snug line-clamp-2 ${
                                  !n.read ? "font-bold text-gray-900" : "font-medium text-gray-600"
                                }`}
                              >
                                {n.title}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                                <span className="text-orange-600 font-semibold">{n.category}</span>
                                <span>&bull;</span>
                                <span>{n.timestamp || n.date}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                        <button
                          onClick={clearNotifications}
                          className="text-gray-400 hover:text-red-600 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={12} /> Clear all
                        </button>

                        <Link
                          to="/News"
                          onClick={() => setNotifOpen(false)}
                          className="text-orange-600 font-bold hover:underline"
                        >
                          सभी ताज़ा खबरें &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Login / Admin Action Button */}
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/Admin"
                    className="flex items-center gap-1.5 rounded-full bg-blue-950 px-3.5 py-2 text-white text-xs font-bold shadow-sm hover:bg-blue-900 transition"
                  >
                    <UserCog size={15} className="text-orange-400" />
                    <span>Admin Panel</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 transition"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/Login"
                  className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3.5 py-2 text-gray-700 transition hover:border-orange-300 hover:text-orange-600 text-xs font-bold"
                >
                  <User size={15} />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Actions Header */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Notification Bell */}
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-orange-600 text-[9px] font-bold text-white flex items-center justify-center">
                    {unreadNotifsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="border-t border-gray-100 bg-white lg:hidden animate-fadeIn">
            <div className="mx-auto max-w-7xl px-5 py-4 space-y-4">
              {/* Mobile Search Form */}
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="समाचार खोजें..."
                  className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-xs outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="rounded-full bg-orange-600 px-4 py-2.5 text-xs font-bold text-white"
                >
                  Search
                </button>
              </form>

              {/* Mobile Links */}
              <nav className="space-y-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                  >
                    {item.label}
                  </Link>
                ))}

                {isAdmin ? (
                  <Link
                    to="/Admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold text-white bg-blue-950 mt-2"
                  >
                    <span className="flex items-center gap-2">
                      <UserCog size={16} className="text-orange-400" />
                      <span>Admin Dashboard</span>
                    </span>
                    <ChevronRight size={16} />
                  </Link>
                ) : (
                  <Link
                    to="/Login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-orange-600 bg-orange-50 mt-2"
                  >
                    <User size={16} />
                    <span>Admin Login</span>
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;