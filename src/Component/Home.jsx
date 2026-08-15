import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  User,
} from "lucide-react";
import { getAllArticles } from "../data/newsData";

const Home = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    setNewsData(getAllArticles());
  }, []);

  if (newsData.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const mainNews = newsData[0];
  const latestNews = newsData.slice(1, 6);
  const topHeadlines = newsData.slice(6, 12);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main news */}
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <Link to={`/news/${mainNews.id}`} className="block group overflow-hidden">
              <img
                src={mainNews.image}
                alt={mainNews.title}
                className="h-[300px] w-full object-cover sm:h-[420px] group-hover:scale-105 transition duration-500"
              />
            </Link>

            <div className="p-6 sm:p-8">
              <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                {mainNews.category}
              </span>

              <h1 className="mt-5 text-2xl font-bold leading-tight text-blue-950 sm:text-4xl">
                <Link
                  to={`/news/${mainNews.id}`}
                  className="hover:text-orange-600 transition"
                >
                  {mainNews.title}
                </Link>
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600">
                {mainNews.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-orange-500" />
                  {mainNews.category || "झारखंड"}
                </span>

                <span className="flex items-center gap-1.5">
                  <User size={15} className="text-orange-500" />
                  {mainNews.author || "स्वदेश वाणी संवाददाता"}
                </span>

                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-orange-500" />
                  {mainNews.date}
                </span>
              </div>

              <Link
                to={`/news/${mainNews.id}`}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-600 transition hover:text-orange-700"
              >
                पूरी खबर पढ़ें
                <ArrowRight size={18} />
              </Link>
            </div>
          </article>

          {/* Latest updates */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <TrendingUp size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-blue-950">
                  ताजा खबरें
                </h2>
                <p className="text-xs text-slate-500">
                  Latest updates
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {latestNews.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="group block border-b border-slate-100 pb-5 last:border-0 last:pb-0"
                >
                  <span className="text-xs font-semibold text-orange-600">
                    {item.category}
                  </span>

                  <h3 className="mt-1 line-clamp-3 text-sm font-semibold leading-6 text-slate-800 transition group-hover:text-orange-600">
                    {item.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={13} />
                    {item.date || "आज"}
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* All news counter */}
      <section className="mx-auto max-w-7xl px-5 pb-5 sm:px-8">
        <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-blue-950">
              आज की प्रमुख खबरें
            </p>
            <p className="mt-1 text-xs text-blue-700">
              स्थानीय, राज्य और देश की ताजा खबरें
            </p>
          </div>

          <span className="rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-white">
            कुल {newsData.length} खबरें
          </span>
        </div>
      </section>

      {/* Top headlines */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-600">
              Featured Stories
            </p>

            <h2 className="text-2xl font-bold text-blue-950 sm:text-3xl">
              प्रमुख खबरें
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topHeadlines.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link to={`/news/${item.id}`} className="block relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm">
                  {item.category}
                </span>
              </Link>

              <div className="p-5">
                <h3 className="line-clamp-3 text-lg font-bold leading-7 text-blue-950">
                  <Link
                    to={`/news/${item.id}`}
                    className="hover:text-orange-600 transition"
                  >
                    {item.title}
                  </Link>
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                  {item.excerpt}
                </p>

                <Link
                  to={`/news/${item.id}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
                >
                  पूरी खबर पढ़ें
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Complete news list */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-600">
            Latest News
          </p>

          <h2 className="text-2xl font-bold text-blue-950 sm:text-3xl">
            सभी समाचार
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {newsData.map((item, index) => (
            <article
              key={item.id}
              className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-orange-200 hover:shadow-sm"
            >
              <Link to={`/news/${item.id}`} className="hidden h-24 w-32 shrink-0 overflow-hidden rounded-lg sm:block group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                />
              </Link>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-orange-600">
                    #{index + 1}
                  </span>

                  <span className="text-xs text-slate-400">
                    {item.category}
                  </span>
                </div>

                <h3 className="mt-1 line-clamp-2 font-bold leading-6 text-blue-950">
                  <Link to={`/news/${item.id}`} className="hover:text-orange-600 transition">
                    {item.title}
                  </Link>
                </h3>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">
                  {item.excerpt}
                </p>

                <Link
                  to={`/news/${item.id}`}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700"
                >
                  पढ़ें
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 sm:px-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-950 sm:text-3xl">
                न्यूज़ अपडेट के लिए सब्सक्राइब करें
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                ताजा खबरें और महत्वपूर्ण समाचार सीधे अपने ईमेल पर प्राप्त करें।
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("न्यूज़लेटर के लिए धन्यवाद!");
              }}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="अपना ईमेल दर्ज करें"
                required
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
              />

              <button
                type="submit"
                className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-3 text-center text-xs text-slate-400">
              आप किसी भी समय सदस्यता समाप्त कर सकते हैं।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;