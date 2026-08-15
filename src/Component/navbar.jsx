import React, { useEffect, useState } from "react";
import hindilogo from "./photos/logo.jpeg";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Bell,
  ChevronRight,
  Home,
  Newspaper,
  BookOpen,
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
} from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "District", to: "/district" },
    { label: "Journal", to: "/journal" },
    { label: "Historic Jharkhand", to: "/history" },
    { label: "Videos", to: "/videos" },
    { label: "Advertisement", to: "/advertisement" },
    { label: "About", to: "/About" },
  ];

  const sidebarLinks = [
    {
      section: "Main",
      items: [
        {
          icon: <Home size={18} />,
          title: "Home",
          to: "/",
        },
        {
          icon: <Newspaper size={18} />,
          title: "District",
          to: "/district",
        },
        {
          icon: <BookOpen size={18} />,
          title: "Journal",
          to: "/journal",
        },
      ],
    },
    {
      section: "Journal",
      items: [
        {
          icon: <GraduationCap size={18} />,
          title: "Education",
          to: "/Education",
        },
        {
          icon: <Globe size={18} />,
          title: "World",
          to: "/Worldnews",
        },
        {
          icon: <Briefcase size={18} />,
          title: "Business",
          to: "/journal/business",
        },
        {
          icon: <Cpu size={18} />,
          title: "Technology",
          to: "/Technologynews",
        },
        {
          icon: <Trophy size={18} />,
          title: "Sports",
          to: "/Sportsnews",
        },
        {
          icon: <Tv size={18} />,
          title: "Entertainment",
          to: "/journal/entertainment",
        },
      ],
    },
    {
      section: "Jharkhand & More",
      items: [
        {
          icon: <History size={18} />,
          title: "Historic Jharkhand",
          to: "/HistoricJharkhand",
        },
        {
          icon: <Video size={18} />,
          title: "YouTube Videos",
          to: "/YouTubeVideos",
        },
        {
          icon: <Megaphone size={18} />,
          title: "Advertisement",
          to: "/Advertisement",
        },
        {
          icon: <Info size={18} />,
          title: "About",
          to: "/about",
        },
      ],
    },
    {
      section: "Account",
      items: [
        {
          icon: <User size={18} />,
          title: "Login",
          to: "/login",
        },
        {
          icon: <UserCog size={18} />,
          title: "Admin Panel",
          to: "/Admin",
        },
      ],
    },
  ];

  const headerCategories = [
    { label: "Education", to: "/Education" },
    { label: "World", to: "/Worldnews" },
    { label: "Technology", to: "/Technologynews" },
    { label: "Sports", to: "/Sportsnews" },
  ];

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!searchQuery.trim()) return;

    console.log("Searching:", searchQuery);
    setSearchOpen(false);
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Tricolor accent */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600" />

      {/* Sidebar overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-all duration-300 ${
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex h-24 items-center justify-between border-b border-gray-100 px-5">
          <Link to="/" onClick={closeMenus}>
            <img
              src={hindilogo}
              alt="News Logo"
              className="h-6 w-auto object-contain"
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

        {/* Sidebar navigation */}
        <nav className="h-[calc(100%-6rem)] overflow-y-auto py-5">
          {sidebarLinks.map((sectionGroup) => (
            <div key={sectionGroup.section} className="mb-6">
              <p className="mb-2 px-5 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                {sectionGroup.section}
              </p>

              <div className="space-y-0.5">
                {sectionGroup.items.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    onClick={() => setSidebarOpen(false)}
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
      </aside>

      {/* Main header */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative flex h-24 items-center justify-between lg:h-28">
            {/* Left menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-2.5 text-gray-700 transition hover:text-orange-600"
              aria-label="Open menu"
            >
              <Menu size={23} />

              <span className="hidden text-sm font-medium md:block">
                Menu
              </span>
            </button>

            {/* Center logo */}
            <Link
              to="/"
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <img
                src={hindilogo}
                alt="News Logo"
                className="h-20 w-auto select-none object-contain sm:h-24 lg:h-28"
              />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-5 lg:flex">
              <nav className="flex items-center gap-5">
                {headerCategories.map((category) => (
                  <Link
                    key={category.label}
                    to={category.to}
                    className="text-sm font-medium text-gray-700 transition hover:text-orange-600"
                  >
                    {category.label}
                  </Link>
                ))}
              </nav>

              <div className="h-5 w-px bg-gray-200" />

              {/* Search */}
              {!searchOpen ? (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-orange-300 hover:text-orange-600"
                  aria-label="Open search"
                >
                  <Search size={18} />
                </button>
              ) : (
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search news..."
                    autoFocus
                    className="w-36 rounded-full border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="submit"
                    className="rounded-full bg-orange-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-orange-700"
                  >
                    Search
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
                    aria-label="Close search"
                  >
                    <X size={16} />
                  </button>
                </form>
              )}

              {/* Notification */}
              <button
                className="relative text-gray-600 transition hover:text-orange-600"
                aria-label="Notifications"
              >
                <Bell size={19} />

                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-600" />
              </button>

              {/* Login */}
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-2 text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
              >
                <User size={16} />
                <span className="text-sm font-medium">Login</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen((previous) => !previous)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-orange-300 hover:text-orange-600 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div className="border-t border-gray-100 bg-white lg:hidden">
            <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
              <nav className="space-y-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Admin moved into menu */}
                <Link
                  to="/Admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  <UserCog size={17} />
                  Admin Panel
                </Link>
              </nav>

              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                {/* Mobile search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                  aria-label="Open search"
                >
                  <Search size={18} />
                </button>

                {/* Mobile notification */}
                <button
                  className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
                  aria-label="Notifications"
                >
                  <Bell size={18} />

                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-600" />
                </button>
              </div>

              {/* Mobile search box */}
              {searchOpen && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="mt-4 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search news..."
                    autoFocus
                    className="min-w-0 flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />

                  <button
                    type="submit"
                    className="rounded-full bg-orange-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-orange-700"
                  >
                    Search
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;