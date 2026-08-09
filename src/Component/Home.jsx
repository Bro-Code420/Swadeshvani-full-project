import React from "react";
import {
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  User,
} from "lucide-react";
import news1 from "./photos/news1.jpeg";
import news2 from "./photos/news2.jpeg";
import news3 from "./photos/news3.jpeg";
import news4 from "./photos/news4.jpeg";
import news5 from "./photos/news5.jpeg";
import news6 from "./photos/news6.jpeg";
import news7 from "./photos/news7.jpeg";
import news8 from "./photos/news8.jpeg";
import news9 from "./photos/news9.jpeg";
import news10 from "./photos/news10.jpeg";


const newsImages = [
  news1,
  news2,
  news3,
  news4,
  news5,
  news6,
  news7,
  news8,
  news9,
  news10,
];
const newsData = [
  {
    id: 1,
    title:
      "जरमुंडी प्रखंड के आमगाछी गांव में आकाशीय बिजली का शिकार हुआ विद्युत ट्रांसफार्मर",
    category: "जरमुंडी",
    image: newsImages[0],
    link: "/news/aamagachi-transformer",
  },
  {
    id: 2,
    title:
      "JPSC मुद्दे पर जारी आंदोलन को सोनम वांगचुक का समर्थन",
    category: "राजनीति",
    image: newsImages[1],
    link: "/news/jpsc-student-movement",
  },
  {
    id: 3,
    title:
      "देश की शिक्षा व्यवस्था में सुधार की जरूरत: मोहन भागवत",
    category: "देश",
    image: newsImages[2],
    link: "/news/mohan-bhagwat-students",
  },
  {
    id: 4,
    title:
      "जर्जर शौचालय और बंद बिजली से परेशान तीनघरा विद्यालय के 132 छात्र-छात्राएं",
    category: "शिक्षा",
    image: newsImages[3],
    link: "/news/tinghara-school-problem",
  },
  {
    id: 5,
    title:
      "स्वतंत्रता दिवस पर दो दिवसीय फुटबॉल प्रतियोगिता की तैयारी",
    category: "खेल",
    image: newsImages[4],
    link: "/news/ramgarh-football-tournament",
  },
  {
    id: 6,
    title:
      "निझोर गांव में मलेरिया मास सर्वे, 34 लोगों की जांच",
    category: "स्वास्थ्य",
    image: newsImages[5],
    link: "/news/nizhor-malaria-survey",
  },
  {
    id: 7,
    title:
      "मसलिया में SIR-2026 के द्वितीय चरण की तैयारियों को लेकर समीक्षा बैठक",
    category: "प्रशासन",
    image: newsImages[6],
    link: "/news/sir-2026-review-meeting",
  },
  {
    id: 8,
    title:
      "श्रावणी मेला क्षेत्र के 10 स्थलों पर संचालित मातृत्व विश्राम गृह",
    category: "देवघर",
    image: newsImages[7],
    link: "/news/maternity-rest-homes",
  },
  {
    id: 9,
    title:
      "एस.पी. कॉलेज, दुमका में छात्र समन्वय समिति की अनिश्चितकालीन तालाबंदी शुरू",
    category: "शिक्षा",
    image: newsImages[8],
    link: "/news/sp-college-student-protest",
  },
  {
    id: 10,
    title:
      "बास्को गांव में 63 केवीए का नया ट्रांसफार्मर लगते ही बहाल हुई बिजली",
    category: "रामगढ़",
    image: newsImages[9],
    link: "/news/basko-transformer-restored",
  },
];

const Home = () => {
  const mainNews = newsData[0];
  const latestNews = newsData.slice(1, 6);
  const topHeadlines = newsData.slice(6, 11);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main news */}
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <img
              src={mainNews.image}
              alt={mainNews.title}
              className="h-[300px] w-full object-cover sm:h-[420px]"
            />

            <div className="p-6 sm:p-8">
              <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                {mainNews.category}
              </span>

              <h1 className="mt-5 text-2xl font-bold leading-tight text-blue-950 sm:text-4xl">
                {mainNews.title}
              </h1>

              <p className="mt-4 text-base leading-7 text-slate-600">
                {mainNews.subtitle}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-orange-500" />
                  {mainNews.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <User size={15} className="text-orange-500" />
                  {mainNews.reporter}
                </span>
              </div>

              <a
                href={mainNews.link}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-600 transition hover:text-orange-700"
              >
                पूरी खबर पढ़ें
                <ArrowRight size={18} />
              </a>
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
                <a
                  key={item.id}
                  href={item.link}
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
                    {item.time}
                  </div>
                </a>
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
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="line-clamp-3 text-lg font-bold leading-7 text-blue-950">
                  {item.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                  {item.subtitle}
                </p>

                <a
                  href={item.link}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
                >
                  पूरी खबर पढ़ें
                  <ArrowRight size={16} />
                </a>
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
              <div className="hidden h-24 w-32 shrink-0 overflow-hidden rounded-lg sm:block">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

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
                  {item.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">
                  {item.subtitle}
                </p>

                <a
                  href={item.link}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700"
                >
                  पढ़ें
                  <ArrowRight size={14} />
                </a>
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

            <form className="mt-7 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="अपना ईमेल दर्ज करें"
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