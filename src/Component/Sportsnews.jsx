import React from "react";

const sportsArticles = [
  {
    id: 1,
    title: "National cricket team clinches series in dramatic final over",
    category: "SPORTS",
    time: "Updated 30 minutes ago",
    image:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80",
    summary:
      "An inspired lower‑order partnership and tight bowling in the death overs sealed the series for the home side.",
    featured: true,
  },
  {
    id: 2,
    title: "Football clubs gear up for transfer window shake‑up",
    category: "SPORTS",
    time: "Updated 2 hours ago",
    image:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Major European teams are expected to announce high‑profile signings and departures in the coming weeks.",
    featured: true,
  },
  {
    id: 3,
    title: "Star batter returns from injury ahead of key tournament",
    category: "SPORTS",
    time: "Updated 4 hours ago",
    image:
      "https://images.unsplash.com/photo-1521412644187-6c61c58bf7b3?auto=format&fit=crop&w=800&q=80",
    summary:
      "Medical staff confirm the player has cleared fitness tests and will rejoin full training immediately.",
  },
  {
    id: 4,
    title: "National hockey side announces leadership group",
    category: "SPORTS",
    time: "Updated 7 hours ago",
    image:
      "https://images.unsplash.com/photo-1518860308377-0c3fd13f3b13?auto=format&fit=crop&w=800&q=80",
    summary:
      "The new captain and vice‑captain aim to bring stability and attacking flair to the squad.",
  },
  {
    id: 5,
    title: "Olympic hopefuls set personal bests at selection trials",
    category: "SPORTS",
    time: "Updated 12 hours ago",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80",
    summary:
      "Track and field athletes delivered standout performances as coaches finalize squads.",
  },
  {
    id: 6,
    title: "Domestic league unveils revamped schedule and playoff format",
    category: "SPORTS",
    time: "Updated 18 hours ago",
    image:
      "https://images.unsplash.com/photo-1518609571773-39b7d303a90d?auto=format&fit=crop&w=800&q=80",
    summary:
      "The new structure aims to increase prime‑time fixtures and competitive balance across teams.",
  },
  {
    id: 7,
    title: "Veteran coach to lead national side through upcoming cycle",
    category: "SPORTS",
    time: "Updated 1 day ago",
    image:
      "https://images.unsplash.com/photo-1518609571773-39b7d303a90d?auto=format&fit=crop&w=800&q=80",
    summary:
      "Officials highlight the coach’s experience in handling high‑pressure tournaments.",
  },
  {
    id: 8,
    title: "Young prospects shine in under‑19 championship",
    category: "SPORTS",
    time: "Updated 2 days ago",
    image:
      "https://images.unsplash.com/photo-1518609571773-39b7d303a90d?auto=format&fit=crop&w=800&q=80",
    summary:
      "Scouts report several standout performances that could accelerate players’ senior team call‑ups.",
  },
];

export default function SportsPage() {
  const featured = sportsArticles.filter((a) => a.featured);
  const others = sportsArticles.filter((a) => !a.featured);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero / header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                <span className="text-orange-500">Sports</span> News
              </h1>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600">
                Match reports, transfer updates, and stories from cricket,
                football, and more—covering the action on and off the field.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Live sports coverage</span>
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
            More sports stories
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