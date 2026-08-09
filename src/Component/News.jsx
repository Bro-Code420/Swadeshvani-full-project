import React from "react";

const sections = [
  {
    name: "Education",
    slugColor: "text-emerald-700",
    articles: [
      {
        id: 1,
        title: "Government unveils major overhaul of national curriculum",
        category: "EDUCATION",
        time: "Updated 2 hours ago",
        image:
          "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: 2,
        title: "Top universities embrace hybrid learning for upcoming session",
        category: "EDUCATION",
        time: "Updated 1 hour ago",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: 3,
        title: "Rural colleges to receive funding for smart classrooms",
        category: "EDUCATION",
        time: "Updated 14 hours ago",
        image:
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 4,
        title: "Entrance examination reforms proposed for 2027 intake",
        category: "EDUCATION",
        time: "Updated 1 day ago",
        image:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
  {
    name: "Politics",
    slugColor: "text-emerald-700",
    articles: [
      {
        id: 1,
        title: "Parliament debates key reforms in public policy framework",
        category: "POLITICS",
        time: "Updated 3 hours ago",
        image:
          "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: 2,
        title: "Leaders convene to discuss regional development roadmap",
        category: "POLITICS",
        time: "Updated 1 hour ago",
        image:
          "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: 3,
        title: "Budget allocations questioned in opposition briefing",
        category: "POLITICS",
        time: "Updated 15 hours ago",
        image:
          "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: 4,
        title: "Election commission details new code of conduct",
        category: "POLITICS",
        time: "Updated 2 days ago",
        image:
          "https://images.unsplash.com/photo-1545987796-200677ee1011?auto=format&fit=crop&w=400&q=80",
      },
    ],
  },
];

export default function CategoriesSection() {
  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 space-y-16">
        {sections.map((section) => (
          <section key={section.name}>
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                <span className="font-semibold text-orange-500">
                  {section.name}
                </span>
              </h2>
              <svg
                className="w-5 h-5 text-emerald-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Top row: 2 feature stories */}
              {section.articles.slice(0, 2).map((article) => (
                <article
                  key={article.id}
                  className="group flex flex-col gap-4 cursor-pointer"
                >
                  <div className="overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-[260px] md:h-[280px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-semibold leading-snug text-slate-900 group-hover:text-slate-800">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="font-semibold uppercase tracking-[0.12em] text-emerald-700">
                        {article.category}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{article.time}</span>
                    </div>
                  </div>
                </article>
              ))}

              {/* Bottom row: stacked smaller stories */}
              <div className="flex flex-col gap-6">
                {section.articles.slice(2).map((article, idx) => (
                  <article
                    key={article.id}
                    className={`flex gap-4 pb-6 ${
                      idx === section.articles.slice(2).length - 1
                        ? ""
                        : "border-b border-slate-200"
                    }`}
                  >
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg sm:text-xl font-serif font-semibold leading-snug text-slate-900 hover:text-slate-800 cursor-pointer">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <span className="font-semibold uppercase tracking-[0.12em] text-emerald-700">
                          {article.category}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{article.time}</span>
                      </div>
                    </div>
                    <div className="w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}