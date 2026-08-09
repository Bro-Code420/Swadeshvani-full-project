import React from "react";

const worldArticles = [
  {
    id: 1,
    title: "Global summit agrees on new climate action roadmap",
    category: "WORLD",
    time: "Updated 1 hour ago",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Leaders from over 100 countries commit to accelerated emissions cuts and expanded green financing over the next decade.",
    featured: true,
  },
  {
    id: 2,
    title: "Trade talks resume between major economies after months of stalemate",
    category: "WORLD",
    time: "Updated 3 hours ago",
    image:
      "https://images.unsplash.com/photo-1523885144112-bedc9e442f26?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Negotiators seek compromises on tariffs and data regulations in an effort to stabilize global markets.",
    featured: true,
  },
  {
    id: 3,
    title: "Humanitarian agencies scale up relief operations in flood-hit regions",
    category: "WORLD",
    time: "Updated 6 hours ago",
    image:
      "https://images.unsplash.com/photo-1601758124530-278ff3057c81?auto=format&fit=crop&w=800&q=80",
    summary:
      "Thousands of families are being relocated as rescue teams race to reach remote communities.",
  },
  {
    id: 4,
    title: "Historic peace agreement signed after years of negotiations",
    category: "WORLD",
    time: "Updated 10 hours ago",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    summary:
      "The accord includes commitments on political reforms, demilitarization, and cross-border cooperation.",
  },
  {
    id: 5,
    title: "Global health authorities monitor emerging virus strain",
    category: "WORLD",
    time: "Updated 14 hours ago",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    summary:
      "Scientists emphasize surveillance and vaccination as key tools to prevent large-scale outbreaks.",
  },
  {
    id: 6,
    title: "Technology giants pledge investments in developing markets",
    category: "WORLD",
    time: "Updated 1 day ago",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    summary:
      "New programs focus on digital infrastructure, entrepreneurship, and skills training.",
  },
  {
    id: 7,
    title: "International courts rule on landmark environmental case",
    category: "WORLD",
    time: "Updated 2 days ago",
    image:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80",
    summary:
      "The decision could reshape legal responsibilities for pollution across borders.",
  },
];

export default function WorldPage() {
  const featured = worldArticles.filter((a) => a.featured);
  const others = worldArticles.filter((a) => !a.featured);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero / header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                <span className="text-orange-500">World</span> News
              </h1>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600">
                Global headlines, key diplomatic moves, and developments shaping
                politics, economies, and communities across the world.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Live world coverage</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured stories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {featured.map((article) => (
            <article
              key={article.id}
              className="group cursor-pointer flex flex-col gap-4"
            >
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-[260px] md:h-[280px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    {article.category}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{article.time}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold leading-snug text-slate-900 group-hover:text-slate-800">
                  {article.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  {article.summary}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Divider label */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500">
            More world stories
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      </section>

      {/* More stories list */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {others.map((article, idx) => (
            <article
              key={article.id}
              className={`flex gap-4 pb-6 ${
                idx >= others.length - 2 ? "" : "md:border-b md:border-slate-200"
              }`}
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    {article.category}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{article.time}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-semibold leading-snug text-slate-900 hover:text-slate-800 cursor-pointer">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600">{article.summary}</p>
              </div>
              <div className="w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}