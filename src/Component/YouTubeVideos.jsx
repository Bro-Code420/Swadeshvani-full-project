import React from "react";
import { Bell, Play, Video } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const YouTubeVideos = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-600">
                <FaYoutube size={22} />
                News Videos
              </div>

              <h1 className="text-3xl font-bold text-blue-950 sm:text-4xl">
                YouTube Videos
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Watch the latest news, interviews, local updates, and special
                reports from our YouTube channel.
              </p>
            </div>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <FaYoutube size={19} />
              Visit YouTube Channel
            </a>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="mx-auto flex max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Decorative background */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-100 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-100 blur-3xl" />

          <div className="relative flex flex-col items-center px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
              <FaYoutube className="text-red-600" size={52} />
            </div>

            <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-700">
              <Bell size={14} />
              Coming Soon
            </span>

            <h2 className="mt-6 max-w-2xl text-3xl font-bold leading-tight text-blue-950 sm:text-5xl">
              हमारे YouTube Videos जल्द आ रहे हैं
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              स्थानीय समाचार, विशेष रिपोर्ट, इंटरव्यू और महत्वपूर्ण अपडेट अब
              वीडियो के रूप में जल्द ही उपलब्ध होंगे।
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <Video size={18} className="text-orange-500" />
                Local News Videos
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <Play size={18} className="text-orange-500" />
                Special Reports
              </div>
            </div>

            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              <FaYoutube size={19} />
              Visit Our YouTube Channel
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default YouTubeVideos;