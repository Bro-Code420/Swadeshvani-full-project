import React from "react";

const educationArticles = [
  {
    id: 1,
    title: "Government unveils major overhaul of national curriculum",
    category: "EDUCATION",
    time: "Updated 2 hours ago",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    summary:
      "The new framework aims to modernize classrooms, emphasize critical thinking, and integrate digital skills across subjects.",
    featured: true,
  },
  {
    id: 2,
    title: "Top universities embrace hybrid learning for upcoming session",
    category: "EDUCATION",
    time: "Updated 3 hours ago",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Institutions are redesigning campuses and timetables to blend online flexibility with on-campus experience.",
    featured: true,
  },
  {
    id: 3,
    title: "Rural colleges to receive funding for smart classrooms",
    category: "EDUCATION",
    time: "Updated 12 hours ago",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80",
    summary:
      "A new initiative will equip colleges with high-speed internet, interactive boards, and digital libraries.",
  },
  {
    id: 4,
    title: "Entrance examination reforms proposed for next academic year",
    category: "EDUCATION",
    time: "Updated 1 day ago",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
    summary:
      "Policy makers are reviewing evaluation patterns to reduce stress and encourage holistic assessment.",
  },
  {
    id: 5,
    title: "Teachers upskill with AI-powered assessment tools",
    category: "EDUCATION",
    time: "Updated 2 days ago",
    image:
      "https://images.unsplash.com/photo-1523580846011-dccd9d4f0fff?auto=format&fit=crop&w=600&q=80",
    summary:
      "Training programs help educators use analytics to personalize learning and track student progress.",
  },
];

export default function EducationPage() {
  const featured = educationArticles.filter((a) => a.featured);
  const others = educationArticles.filter((a) => !a.featured);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero / header */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                <span className="text-orange-500">Education</span> News
              </h1>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600">
                Latest updates from schools, universities, and the world of
                learning—curated for students, parents, and educators.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Live education coverage</span>
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
            More education stories
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