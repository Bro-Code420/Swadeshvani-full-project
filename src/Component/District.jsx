import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  MapPin,
  Search,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

import news1 from "./photos/news1.jpeg";
import news2 from "./photos/news2.jpeg";
import news3 from "./photos/news3.jpeg";
import news4 from "./photos/news4.jpeg";
import news5 from "./photos/news5.jpeg";
import news6 from "./photos/news6.jpeg";
import news7 from "./photos/news7.jpeg";
import news8 from "./photos/news8.jpeg";

const districts = [
  "सभी जिले",
  "रांची",
  "दुमका",
  "धनबाद",
  "जमशेदपुर",
  "बोकारो",
  "देवघर",
  "गिरिडीह",
  "हजारीबाग",
  "पलामू",
  "गुमला",
  "सिमडेगा",
  "गढ़वा",
  "चतरा",
  "लातेहार",
  "लोहरदगा",
  "खूंटी",
  "रामगढ़",
  "जामताड़ा",
  "गोड्डा",
  "पाकुड़",
  "साहिबगंज",
  "सरायकेला-खरसावां",
  "पश्चिमी सिंहभूम",
  "पूर्वी सिंहभूम",
];

const districtNews = [
  {
    id: 1,
    title:
      "जरमुंडी प्रखंड के आमगाछी गांव में आकाशीय बिजली का शिकार हुआ विद्युत ट्रांसफार्मर",
    category: "बिजली",
    district: "दुमका",
    location: "जरमुंडी",
    time: "10 मिनट पहले",
    image: news1,
    link: "/news/aamagachi-transformer",
    featured: true,
  },
  {
    id: 2,
    title:
      "JPSC मुद्दे पर जारी आंदोलन को सोनम वांगचुक का समर्थन, बोले- छात्रों की मांगें जल्द पूरी करे हेमंत सरकार",
    category: "राजनीति",
    district: "रांची",
    location: "रांची",
    time: "25 मिनट पहले",
    image: news2,
    link: "/news/jpsc-student-movement",
    featured: true,
  },
  {
    id: 3,
    title: "देश की शिक्षा व्यवस्था में सुधार की जरूरत: मोहन भागवत",
    category: "शिक्षा",
    district: "रांची",
    location: "रांची",
    time: "40 मिनट पहले",
    image: news3,
    link: "/news/mohan-bhagwat-students",
    featured: true,
  },
  {
    id: 4,
    title:
      "जर्जर शौचालय और बंद बिजली से परेशान तीनघरा विद्यालय के 132 छात्र-छात्राएं",
    category: "शिक्षा",
    district: "दुमका",
    location: "तीनघरा",
    time: "1 घंटा पहले",
    image: news4,
    link: "/news/tinghara-school-problem",
  },
  {
    id: 5,
    title: "स्वतंत्रता दिवस पर दो दिवसीय फुटबॉल प्रतियोगिता की तैयारी",
    category: "खेल",
    district: "रामगढ़",
    location: "रामगढ़",
    time: "1 घंटा पहले",
    image: news5,
    link: "/news/ramgarh-football-tournament",
  },
  {
    id: 6,
    title: "निझोर गांव में मलेरिया मास सर्वे, 34 लोगों की जांच",
    category: "स्वास्थ्य",
    district: "दुमका",
    location: "निझोर",
    time: "2 घंटे पहले",
    image: news6,
    link: "/news/nizhor-malaria-survey",
  },
  {
    id: 7,
    title: "मसलिया में SIR-2026 के द्वितीय चरण की तैयारियों को लेकर समीक्षा बैठक",
    category: "प्रशासन",
    district: "दुमका",
    location: "मसलिया",
    time: "2 घंटे पहले",
    image: news7,
    link: "/news/sir-2026-review-meeting",
  },
  {
    id: 8,
    title: "श्रावणी मेला क्षेत्र के 10 स्थलों पर संचालित मातृत्व विश्राम गृह",
    category: "स्थानीय खबर",
    district: "देवघर",
    location: "देवघर",
    time: "3 घंटे पहले",
    image: news8,
    link: "/news/maternity-rest-homes",
  },
];

const categoryLinks = [
  "सभी खबरें",
  "राजनीति",
  "शिक्षा",
  "स्वास्थ्य",
  "खेल",
  "अपराध",
  "प्रशासन",
];

function NewsMeta({ item }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
      <span className="inline-flex items-center gap-1">
        <MapPin size={13} className="text-orange-500" />
        {item.district}
      </span>

      <span className="text-slate-300">•</span>

      <span className="inline-flex items-center gap-1">
        <Clock size={13} />
        {item.time}
      </span>
    </div>
  );
}

function FeaturedNewsCard({ item }) {
  return (
    <Link
      to={item.link}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-64 overflow-hidden sm:h-80">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
          {item.category}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
          <NewsMeta item={item} />

          <h2 className="mt-3 text-xl font-bold leading-7 sm:text-2xl">
            {item.title}
          </h2>

          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-300">
            पूरी खबर पढ़ें
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

function NewsListItem({ item }) {
  return (
    <Link
      to={item.link}
      className="group flex gap-4 border-b border-slate-100 py-5 first:pt-0 last:border-0 last:pb-0"
    >
      <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-40">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <span className="text-xs font-semibold text-orange-600">
          {item.category}
        </span>

        <h3 className="mt-1 line-clamp-3 text-sm font-bold leading-6 text-slate-900 transition group-hover:text-orange-600 sm:text-base">
          {item.title}
        </h3>

        <div className="mt-2">
          <NewsMeta item={item} />
        </div>
      </div>
    </Link>
  );
}

function SmallNewsItem({ item, index }) {
  return (
    <Link
      to={item.link}
      className="group flex gap-3 border-b border-slate-100 py-4 last:border-0"
    >
      <span className="text-2xl font-bold leading-none text-orange-200">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <span className="text-xs font-semibold text-orange-600">
          {item.category}
        </span>

        <h3 className="mt-1 line-clamp-3 text-sm font-semibold leading-6 text-slate-800 transition group-hover:text-orange-600">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

export default function DistrictNews() {
  const [selectedDistrict, setSelectedDistrict] = useState("सभी जिले");
  const [selectedCategory, setSelectedCategory] = useState("सभी खबरें");
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return districtNews.filter((item) => {
      const districtMatch =
        selectedDistrict === "सभी जिले" ||
        item.district === selectedDistrict;

      const categoryMatch =
        selectedCategory === "सभी खबरें" ||
        item.category === selectedCategory;

      const searchMatch =
        !normalizedSearch ||
        [item.title, item.category, item.district, item.location]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return districtMatch && categoryMatch && searchMatch;
    });
  }, [selectedDistrict, selectedCategory, search]);

  const featuredNews = filteredNews.filter((item) => item.featured);
  const latestNews = filteredNews.filter((item) => !item.featured);
  const trendingNews = districtNews.slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Tricolor accent */}
      <div className="flex h-1.5 w-full">
        <div className="w-1/3 bg-orange-500" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-green-600" />
      </div>

      {/* Page header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                Jharkhand local coverage
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-blue-950 sm:text-5xl">
                जिला समाचार
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                झारखंड के सभी जिलों से जुड़ी ताजा खबरें, स्थानीय अपडेट,
                प्रशासन, शिक्षा, स्वास्थ्य, खेल और जनसमस्याओं की खबरें।
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700">
              <Zap size={17} />
              ताजा जिला अपडेट
            </div>
          </div>
        </div>
      </section>

      {/* District selector */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex shrink-0 items-center gap-2 text-sm font-bold text-blue-950">
              <MapPin size={18} className="text-orange-500" />
              जिला चुनें
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {districts.map((district) => (
                <button
                  key={district}
                  type="button"
                  onClick={() => setSelectedDistrict(district)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedDistrict === district
                      ? "bg-orange-500 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and categories */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="जिले या खबर के नाम से खोजें..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 hover:bg-orange-50 hover:text-orange-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categoryLinks.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main news layout */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px]">
          {/* Main column */}
          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
                  {selectedDistrict}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-blue-950 sm:text-3xl">
                  जिले की प्रमुख खबरें
                </h2>
              </div>

              <span className="text-sm text-slate-500">
                {filteredNews.length} खबरें
              </span>
            </div>

            {filteredNews.length > 0 ? (
              <>
                {featuredNews.length > 0 && (
                  <div className="grid gap-5 md:grid-cols-2">
                    {featuredNews.map((item) => (
                      <FeaturedNewsCard key={item.id} item={item} />
                    ))}
                  </div>
                )}

                {latestNews.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-2 flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                          Latest updates
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-blue-950">
                          ताजा जिला खबरें
                        </h2>
                      </div>

                      <Clock size={20} className="text-orange-500" />
                    </div>

                    {latestNews.map((item) => (
                      <NewsListItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50 px-6 py-16 text-center">
                <Search className="mx-auto text-orange-400" size={30} />

                <h2 className="mt-4 text-xl font-bold text-blue-950">
                  कोई खबर नहीं मिली
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  कृपया किसी दूसरे जिले या श्रेणी का चयन करें।
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedDistrict("सभी जिले");
                    setSelectedCategory("सभी खबरें");
                    setSearch("");
                  }}
                  className="mt-6 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  सभी खबरें देखें
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <TrendingUp size={20} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                    Trending
                  </p>

                  <h2 className="text-xl font-bold text-blue-950">
                    सबसे ज्यादा पढ़ी गई
                  </h2>
                </div>
              </div>

              {trendingNews.map((item, index) => (
                <SmallNewsItem key={item.id} item={item} index={index} />
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl bg-blue-950 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                District coverage
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                अपने जिले की खबर सबसे पहले पढ़ें
              </h2>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                अपने क्षेत्र की खबर, समस्या और स्थानीय अपडेट हम तक भेजें।
              </p>

              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                खबर भेजें
                <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer accent */}
      <div className="flex h-1.5 w-full">
        <div className="w-1/3 bg-orange-500" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-green-600" />
      </div>
    </main>
  );
}