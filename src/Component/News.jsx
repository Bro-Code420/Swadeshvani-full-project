import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, TrendingUp } from "lucide-react";
import { getAllArticles } from "../data/newsData";

export default function CategoriesSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(getAllArticles());
  }, []);

  // Group articles by category
  const categoriesMap = articles.reduce((acc, item) => {
    const cat = item.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categoryNames = Object.keys(categoriesMap);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block mb-2">
            Categories &amp; Feeds
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950">
            सभी प्रमुख समाचार श्रेणियां
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            झारखंड, देश और दुनिया की ताज़ा एवं निष्पक्ष खबरें
          </p>
        </div>

        {categoryNames.map((catName) => {
          const catArticles = categoriesMap[catName];
          return (
            <section key={catName} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                <span className="h-6 w-2 rounded-full bg-orange-500"></span>
                <h2 className="text-2xl font-bold tracking-tight text-blue-950">
                  {catName}
                </h2>
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-xs font-semibold text-slate-400">
                  {catArticles.length} खबरें
                </span>
              </div>

              {/* Articles grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {catArticles.map((article) => (
                  <article
                    key={article.id}
                    className="group flex flex-col gap-4 border border-slate-100 p-4 rounded-2xl bg-slate-50/50 hover:bg-white hover:border-orange-200 hover:shadow-md transition duration-300"
                  >
                    {article.image && (
                      <Link to={`/news/${article.id}`} className="overflow-hidden rounded-xl bg-slate-100 block">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-[220px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                    )}

                    <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs mb-2">
                          <span className="font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100">
                            {article.category}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-500">{article.date}</span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold leading-snug text-blue-950 group-hover:text-orange-600 transition">
                          <Link to={`/news/${article.id}`}>
                            {article.title}
                          </Link>
                        </h3>

                        {article.excerpt && (
                          <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            {article.excerpt}
                          </p>
                        )}
                      </div>

                      <Link
                        to={`/news/${article.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 mt-3 pt-3 border-t border-slate-100"
                      >
                        पूरी खबर पढ़ें <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}