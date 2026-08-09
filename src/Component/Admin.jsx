import React, { useMemo, useState } from "react";
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
];

const initialNews = [
  {
    id: 1,
    title: "Government Announces New Development Plan",
    category: "National",
    author: "Admin",
    status: "Published",
    date: "07 Aug 2026",
    image: "",
  },
  {
    id: 2,
    title: "Heavy Rainfall Expected in Several Regions",
    category: "Weather",
    author: "Admin",
    status: "Draft",
    date: "06 Aug 2026",
    image: "",
  },
];

export default function NewsAdminPanel() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newsList, setNewsList] = useState(initialNews);

  const [formData, setFormData] = useState({
    title: "",
    category: "National",
    excerpt: "",
    content: "",
    image: "",
    status: "Published",
  });

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

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setFormData((previous) => ({
      ...previous,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
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
      image: formData.image,
    };

    setNewsList((previous) => [newNews, ...previous]);

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

    setNewsList((previous) => previous.filter((news) => news.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 text-slate-800">
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
              Savdeshvani
            </h1>

            <p className="mt-1 text-xs text-blue-200">
              Admin Panel
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
        </nav>

        {/* Sidebar bottom actions */}
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
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-blue-200 transition hover:bg-red-500/10 hover:text-red-300"
            onClick={() => alert("Logout functionality will be added soon.")}
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
                {activePage === "dashboard" && "Dashboard"}
                {activePage === "news" && "All News"}
                {activePage === "add-news" && "Add News"}
              </h2>

              <p className="hidden text-xs text-slate-500 sm:block">
                Manage and publish your news content
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            {/* Go to website */}
            <Link
              to="/"
              className="hidden items-center gap-2 rounded-lg border border-blue-100 px-3 py-2 text-sm font-medium text-blue-800 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 sm:flex"
            >
              <FaExternalLinkAlt size={13} />
              Website
            </Link>

            {/* Notification */}
            <button
              className="relative text-lg text-blue-900 transition hover:text-orange-500"
              aria-label="Notifications"
            >
              <FaBell />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-500" />
            </button>

            <div className="hidden h-7 w-px bg-slate-200 sm:block" />

            {/* Admin profile */}
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-3xl text-blue-800" />

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-blue-950">
                  Admin User
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="min-h-screen pt-20 lg:ml-64">
        <div className="p-5 sm:p-8">
          {activePage === "dashboard" && (
            <Dashboard
              news={newsList}
              publishedNews={publishedNews}
              draftNews={draftNews}
              onAdd={() => changePage("add-news")}
              onViewAll={() => changePage("news")}
              onDelete={handleDelete}
            />
          )}

          {activePage === "news" && (
            <NewsList
              news={filteredNews}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAdd={() => changePage("add-news")}
              onDelete={handleDelete}
            />
          )}

          {activePage === "add-news" && (
            <AddNewsForm
              formData={formData}
              categories={categories}
              onChange={handleInputChange}
              onImageChange={handleImageChange}
              onSubmit={handleSubmit}
              onCancel={() => changePage("news")}
            />
          )}
        </div>
      </main>
    </div>
  );
}

/* Sidebar item */

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
        active
          ? "bg-orange-500 font-semibold text-white shadow-lg shadow-orange-900/20"
          : "text-blue-100 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="text-base">{icon}</span>
      {label}
    </button>
  );
}

/* Dashboard */

function Dashboard({
  news,
  publishedNews,
  draftNews,
  onAdd,
  onViewAll,
  onDelete,
}) {
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold text-orange-500">
            ADMIN OVERVIEW
          </p>

          <h3 className="text-2xl font-bold text-blue-950">
            Welcome back, Admin
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Manage your latest news and articles.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
        >
          <FaPlus />
          Add News
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          title="Total News"
          value={news.length}
          icon={<FaFileAlt />}
          color="blue"
        />

        <StatCard
          title="Published"
          value={publishedNews}
          icon={<FaCheckCircle />}
          color="green"
        />

        <StatCard
          title="Drafts"
          value={draftNews}
          icon={<FaEdit />}
          color="orange"
        />
      </div>

      <section className="mt-8 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-orange-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-bold text-blue-950">
              Recent News
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Latest articles added to your portal
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="text-sm font-semibold text-blue-600 transition hover:text-orange-500"
          >
            View all
          </button>
        </div>

        <NewsTable news={news.slice(0, 5)} onDelete={onDelete} />
      </section>
    </>
  );
}

/* Statistic card */

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-blue-950">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${colors[color]}`}
        >
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
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-orange-100 p-5 md:flex-row md:items-center">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-orange-500">
            Content Management
          </p>

          <h3 className="font-bold text-blue-950">
            All News
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Manage all your news articles.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
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
            placeholder="Search news..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-xl border border-blue-100 bg-blue-50/30 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
          />
        </div>
      </div>

      <NewsTable news={news} onDelete={onDelete} />
    </section>
  );
}

/* News table */

function NewsTable({ news, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[750px] text-left text-sm">
        <thead className="bg-blue-50 text-xs uppercase tracking-wide text-blue-900">
          <tr>
            <th className="px-5 py-4 font-semibold">Article</th>
            <th className="px-5 py-4 font-semibold">Category</th>
            <th className="px-5 py-4 font-semibold">Author</th>
            <th className="px-5 py-4 font-semibold">Status</th>
            <th className="px-5 py-4 font-semibold">Date</th>
            <th className="px-5 py-4 text-right font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-orange-50">
          {news.length > 0 ? (
            news.map((item) => (
              <tr
                key={item.id}
                className="transition hover:bg-orange-50/40"
              >
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

                <td className="px-5 py-4 text-slate-500">
                  {item.category}
                </td>

                <td className="px-5 py-4 text-slate-500">
                  {item.author}
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

                <td className="px-5 py-4 text-slate-500">
                  {item.date}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-3">
                    <button
                      title="View"
                      className="text-blue-400 transition hover:text-blue-700"
                    >
                      <FaEye />
                    </button>

                    <button
                      title="Edit"
                      className="text-blue-400 transition hover:text-orange-500"
                    >
                      <FaEdit />
                    </button>

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
  onChange,
  onImageChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="mx-auto max-w-4xl">
      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold text-orange-500">
          CONTENT MANAGEMENT
        </p>

        <h3 className="text-2xl font-bold text-blue-950">
          Add New Article
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Create and publish a new news article.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-8"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-blue-950">
              News Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              placeholder="Enter a clear and engaging headline"
              className="input-style"
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
              className="input-style bg-white"
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
              className="input-style bg-white"
            >
              <option value="Published">Publish Now</option>
              <option value="Draft">Save as Draft</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-blue-950">
              Short Description
            </label>

            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={onChange}
              rows="3"
              placeholder="Write a short summary of the article"
              className="input-style resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-blue-950">
              News Content
            </label>

            <textarea
              name="content"
              value={formData.content}
              onChange={onChange}
              rows="9"
              placeholder="Write your complete news article here..."
              className="input-style resize-y"
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
                Upload article image
              </span>

              <span className="mt-1 text-xs text-slate-400">
                PNG, JPG or WEBP
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
            className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
          >
            Save Article
          </button>
        </div>
      </form>
    </section>
  );
}