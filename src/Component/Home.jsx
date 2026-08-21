import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getAllArticles, saveSubscriber } from "../data/newsData";

const Home = () => {
  const [newsData, setNewsData] = useState([]);

  // Subscribe form state
  const [subPhone, setSubPhone] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subStatus, setSubStatus] = useState(null); // { type: 'success' | 'error', message: string }
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setNewsData(getAllArticles());
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubStatus(null);

    // Validation
    const cleanPhone = subPhone.trim().replace(/\D/g, "");
    const cleanEmail = subEmail.trim();

    // 10 digit Indian phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setSubStatus({
        type: "error",
        message: "कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें (उदा. 9876543210)।",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setSubStatus({
        type: "error",
        message: "कृपया एक मान्य ईमेल आईडी दर्ज करें (उदा. name@example.com)।",
      });
      return;
    }

    setIsSubmitting(true);

    const res = saveSubscriber({ email: cleanEmail, phone: cleanPhone });

    setTimeout(() => {
      setIsSubmitting(false);
      if (res.success) {
        setSubStatus({
          type: "success",
          message: "🎉 बधाई! आपका मोबाइल नंबर और ईमेल सफलतापूर्वक सब्सक्राइब हो गया है।",
        });
        setSubPhone("");
        setSubEmail("");
      } else {
        setSubStatus({
          type: "error",
          message: res.message || "सब्सक्रिप्शन में त्रुटि आई।",
        });
      }
    }, 400);
  };

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
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  {mainNews.category || "झारखंड"}
                </span>

                {mainNews.district && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                    <MapPin size={12} className="text-blue-500" />
                    {mainNews.district}
                  </span>
                )}
              </div>

              <h1 className="mt-2 text-2xl font-bold leading-tight text-blue-950 sm:text-4xl">
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
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <MapPin size={15} className="text-orange-500" />
                  {mainNews.district || mainNews.category || "झारखंड"}
                </span>

                <span className="flex items-center gap-1.5">
                  <User size={15} className="text-orange-500" />
                  {mainNews.reporter || mainNews.author || "स्वदेश वाणी संवाददाता"}
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
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-orange-600">
                      {item.category}
                    </span>
                    {item.district && (
                      <span className="text-[11px] text-slate-400">
                        • 📍 {item.district}
                      </span>
                    )}
                  </div>

                  <h3 className="line-clamp-3 text-sm font-semibold leading-6 text-slate-800 transition group-hover:text-orange-600">
                    {item.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-slate-400" />
                      {item.reporter || item.author || "ब्यूरो"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {item.date || "आज"}
                    </span>
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
              स्थानीय, जिला, राज्य और देश की ताजा खबरें
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
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <Link to={`/news/${item.id}`} className="block relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm">
                      {item.category}
                    </span>
                    {item.district && (
                      <span className="rounded-full bg-blue-950/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white shadow-sm flex items-center gap-1">
                        <MapPin size={10} className="text-orange-400" />
                        {item.district}
                      </span>
                    )}
                  </div>
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
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 truncate max-w-[150px]">
                  <User size={13} className="text-orange-500 flex-shrink-0" />
                  <span className="truncate">{item.reporter || item.author || "स्वदेश वाणी"}</span>
                </span>

                <Link
                  to={`/news/${item.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 transition hover:text-orange-700"
                >
                  पढ़ें
                  <ArrowRight size={14} />
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

              <div className="min-w-0 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-orange-600">
                      #{index + 1}
                    </span>

                    <span className="text-xs font-medium text-slate-500">
                      {item.category}
                    </span>

                    {item.district && (
                      <span className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium">
                        📍 {item.district}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1 line-clamp-2 font-bold leading-6 text-blue-950">
                    <Link to={`/news/${item.id}`} className="hover:text-orange-600 transition">
                      {item.title}
                    </Link>
                  </h3>
                </div>

                <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <User size={12} className="text-slate-400" />
                    {item.reporter || item.author || "स्वदेश वाणी संवाददाता"}
                  </span>

                  <Link
                    to={`/news/${item.id}`}
                    className="inline-flex items-center gap-1 font-semibold text-orange-600 hover:text-orange-700"
                  >
                    पढ़ें
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter & WhatsApp Subscription Form */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50/50 via-white to-blue-50/40 p-8 sm:p-12 shadow-lg shadow-orange-500/5">
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold text-orange-700 uppercase tracking-wider mb-3">
                <Mail size={13} className="text-orange-600" /> दैनिक समाचार सदस्यता
              </span>

              <h2 className="text-2xl font-extrabold text-blue-950 sm:text-3xl lg:text-4xl">
                न्यूज़ अपडेट और ब्रेकिंग अलर्ट्स प्राप्त करें
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                झारखंड, देश और दुनिया की ताजा खबरें, ब्रेकिंग न्यूज़ एवं महत्वपूर्ण सूचनाएं सीधे अपने व्हाट्सएप और ईमेल पर प्राप्त करें।
              </p>
            </div>

            {/* Notification alert */}
            {subStatus && (
              <div
                className={`mt-6 flex items-start gap-3 rounded-2xl p-4 text-sm transition-all duration-300 ${
                  subStatus.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {subStatus.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 font-medium">{subStatus.message}</div>
              </div>
            )}

            <form onSubmit={handleSubscribe} className="mt-8 space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile Number Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    मोबाइल नंबर (WhatsApp / SMS) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      value={subPhone}
                      onChange={(e) => setSubPhone(e.target.value)}
                      placeholder="10 अंकों का मोबाइल नंबर"
                      maxLength={10}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    उदा. 9876543210
                  </span>
                </div>

                {/* Email Address Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    ईमेल पता (Email Address) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      placeholder="अपना ईमेल दर्ज करें"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    उदा. yourname@example.com
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:from-orange-600 hover:to-amber-600 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>सब्सक्राइब किया जा रहा है...</span>
                ) : (
                  <>
                    <span>मुफ्त सदस्यता लें (Subscribe Free)</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-center text-xs text-slate-500">
              <span className="flex items-center gap-1">
                🔒 आपका डेटा 100% सुरक्षित और गोपनीय है
              </span>
              <span>•</span>
              <span>📰 कोई स्पैम नहीं</span>
              <span>•</span>
              <span>🚫 कभी भी अनसब्सक्राइब करें</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;