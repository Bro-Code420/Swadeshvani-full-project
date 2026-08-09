import React from "react";

const techArticles = [
  {
    id: 1,
    title: "Major tech firm unveils next‑gen AI assistant for enterprises",
    category: "TECHNOLOGY",
    time: "Updated 45 minutes ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    summary:
      "The new platform promises faster workflows, secure data handling, and deep integration with existing business tools.",
    featured: true,
  },
  {
    id: 2,
    title: "Chipmakers announce joint initiative to ease global supply constraints",
    category: "TECHNOLOGY",
    time: "Updated 2 hours ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Manufacturers plan new facilities and shared standards to stabilize semiconductor production over the coming years.",
    featured: true,
  },
  {
    id: 3,
    title: "Startups race to build privacy‑first social platforms",
    category: "TECHNOLOGY",
    time: "Updated 4 hours ago",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    summary:
      "Founders are rethinking data collection and moderation models to rebuild user trust online.",
  },
  {
    id: 4,
    title: "Cloud providers expand AI infrastructure to mid‑market businesses",
    category: "TECHNOLOGY",
    time: "Updated 8 hours ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    summary:
      "New offerings lower the cost of training and deploying machine learning models at scale.",
  },
  {
    id: 5,
    title: "Cybersecurity report warns of rise in targeted ransomware attacks",
    category: "TECHNOLOGY",
    time: "Updated 16 hours ago",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80",
    summary:
      "Experts urge organizations to strengthen backups, access controls, and employee training.",
  },
  {
    id: 6,
    title: "Regulators publish draft rules on responsible AI deployment",
    category: "TECHNOLOGY",
    time: "Updated 1 day ago",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd274c39d95?auto=format&fit=crop&w=800&q=80",
    summary:
      "The framework focuses on transparency, bias mitigation, and accountability for automated decisions.",
  },
  {
    id: 7,
    title: "Wearable devices gain new health‑monitoring capabilities",
    category: "TECHNOLOGY",
    time: "Updated 2 days ago",
    image:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80",
    summary:
      "Advances in sensors and software bring more accurate tracking of cardiovascular and sleep metrics.",
  },
  {
    id: 8,
    title: "Developers embrace low‑code tools to accelerate app delivery",
    category: "TECHNOLOGY",
    time: "Updated 3 days ago",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    summary:
      "Platforms promise shorter release cycles while maintaining enterprise‑grade security and governance.",
  },
];

export default function TechnologyPage() {
  const featured = techArticles.filter((a) => a.featured);
  const others = techArticles.filter((a) => !a.featured);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero / header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                <span className="text-orange-500">Technology</span> News
              </h1>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600">
                Updates on AI, software, devices, and the innovations shaping
                how we work, build, and connect.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                <span>Live technology coverage</span>
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
                  <span className="font-semibold uppercase tracking-[0.16em] text-indigo-700">
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
            More technology stories
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
                  <span className="font-semibold uppercase tracking-[0.16em] text-indigo-700">
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