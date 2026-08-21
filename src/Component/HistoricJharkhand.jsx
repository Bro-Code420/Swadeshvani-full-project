import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, User, Clock, ArrowRight, History, Compass } from "lucide-react";
import { getArticlesByCategory } from "../data/newsData";

const historicPlaces = [
  {
    id: 1,
    name: "Palamu Fort",
    location: "Latehar / Palamu district",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
    description:
      "Set on a hill near Betla National Park, Palamu Fort is a ruined fortress that once guarded the region. Its massive gateways, bastions and vantage views echo the military architecture of the Cheros and later rulers.",
    highlight:
      "Combine a visit to the fort with wildlife safaris in Betla National Park for history and nature in one trip.",
  },
  {
    id: 2,
    name: "Maluti Terracotta Temples",
    location: "Maluti, Dumka district",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    description:
      "A cluster of terracotta temples famed for detailed panels depicting epics like the Ramayana and Mahabharata. Maluti is one of Jharkhand’s most important heritage sites, with a unique temple-town atmosphere.",
    highlight:
      "Visit early morning or late afternoon for soft light on the terracotta panels and quieter lanes.",
  },
  {
    id: 3,
    name: "Ratu Palace",
    location: "Ranchi district",
    image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
    description:
      "Once the seat of the Nagvanshi rulers, Ratu Palace combines colonial influences and local styles. Its courtyards and halls recall the royal and administrative history of the region.",
    highlight:
      "Explore nearby temples and traditional neighbourhoods to see how royal heritage blends with everyday life.",
  },
  {
    id: 4,
    name: "Hundru Falls",
    location: "Near Ranchi, Angara block",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    description:
      "Formed by the Swarnarekha River plunging over rocky cliffs, Hundru Falls is one of Jharkhand’s most iconic waterfalls, surrounded by forested trails and natural rock formations.",
    highlight:
      "Post‑monsoon is ideal for full water flow; use designated view points and steps for safe photography.",
  },
  {
    id: 5,
    name: "Betla National Park & Ruins",
    location: "Latehar district",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80",
    description:
      "One of India’s earliest national parks, Betla combines rich wildlife with old watchtowers, forest rest houses and historical remains linked to Palamu’s past.",
    highlight:
      "Early morning safaris offer chances to spot deer, bison and birds, with misty views of ruins in the background.",
  },
];

export default function HistoricJharkhandPage() {
  const [heritageArticles, setHeritageArticles] = useState([]);

  useEffect(() => {
    const data = getArticlesByCategory("Historic Jharkhand");
    setHeritageArticles(data);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero section */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                <History size={14} /> धरोहर एवं पर्यटन (Historic Jharkhand)
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                <span className="text-orange-500">Historic</span> Jharkhand &amp; Culture
              </h1>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600">
                किले, टेराकोटा मंदिर, राजप्रासाद, जलप्रपात और पवित्र पहाड़—झारखंड के गौरवशाली इतिहास, संस्कृति और पुरातात्विक धरोहरों का संग्रह।
              </p>
            </div>
            <div className="text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                झारखंड धरोहर विशेषांक
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic News & Stories under Historic Jharkhand if any */}
      {heritageArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 border-b border-slate-100">
          <h2 className="text-xl font-bold text-blue-950 mb-6 flex items-center gap-2">
            <span className="h-5 w-2 bg-orange-500 rounded-full"></span>
            धरोहर एवं इतिहास से जुड़े ताजा लेख
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heritageArticles.map((art) => (
              <article
                key={art.id}
                className="group flex gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-orange-200 hover:shadow-md transition"
              >
                {art.image && (
                  <Link to={`/news/${art.id}`} className="w-32 h-28 shrink-0 overflow-hidden rounded-xl block">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </Link>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="font-bold text-orange-600">{art.category}</span>
                      {art.district && <span className="text-slate-400">• 📍 {art.district}</span>}
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-blue-950 line-clamp-2 group-hover:text-orange-600 transition">
                      <Link to={`/news/${art.id}`}>{art.title}</Link>
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                    <span>👤 {art.reporter || art.author || "स्वदेश वाणी"}</span>
                    <Link to={`/news/${art.id}`} className="text-orange-600 font-semibold flex items-center gap-1">
                      पढ़ें <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Featured Heritage Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Compass className="text-orange-500" size={20} />
          झारखंड के प्रमुख ऐतिहासिक स्थल (Heritage Destinations)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {historicPlaces.slice(0, 4).map((place) => (
            <article
              key={place.id}
              className="group flex flex-col gap-4 border border-slate-100 rounded-3xl p-4 bg-slate-50/40 hover:bg-white hover:border-orange-200 hover:shadow-md transition duration-300"
            >
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-[260px] md:h-[280px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="space-y-2 p-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    ऐतिहासिक स्थल
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <MapPin size={13} className="text-orange-500" />
                    {place.location}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold leading-snug text-slate-900 group-hover:text-orange-600 transition">
                  {place.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {place.description}
                </p>
                <div className="text-xs sm:text-sm text-emerald-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
                  <strong>यात्रा सुझाव (Tip):</strong> {place.highlight}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}