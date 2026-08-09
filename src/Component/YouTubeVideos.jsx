import React, { useMemo, useState } from "react";
import {
  Search,
  Play,
  Clock,
  MapPin,
  X,
  Video,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const videoData = [
  {
    id: 1,
    title: "जरमुंडी क्षेत्र की ताजा खबर और महत्वपूर्ण अपडेट",
    description:
      "जरमुंडी प्रखंड और आसपास के क्षेत्रों से जुड़ी महत्वपूर्ण खबरें।",
    category: "Local News",
    location: "जरमुंडी, दुमका",
    duration: "08:42",
    videoId: "YOUR_VIDEO_ID_1",
    date: "08 Aug 2026",
  },
  {
    id: 2,
    title: "दुमका जिले की आज की प्रमुख खबरें",
    description:
      "दुमका जिले से जुड़ी दिनभर की प्रमुख खबरों का विशेष वीडियो बुलेटिन।",
    category: "District News",
    location: "दुमका",
    duration: "10:15",
    videoId: "YOUR_VIDEO_ID_2",
    date: "08 Aug 2026",
  },
  {
    id: 3,
    title: "श्रावणी मेला से जुड़ी बड़ी खबरें",
    description:
      "बासुकिनाथ और देवघर श्रावणी मेला क्षेत्र की महत्वपूर्ण जानकारी।",
    category: "Shravani Mela",
    location: "बासुकिनाथ",
    duration: "06:28",
    videoId: "YOUR_VIDEO_ID_3",
    date: "07 Aug 2026",
  },
  {
    id: 4,
    title: "छात्र आंदोलन और शिक्षा से जुड़ी बड़ी खबर",
    description:
      "छात्रों की मांगों और शिक्षा व्यवस्था से संबंधित महत्वपूर्ण अपडेट।",
    category: "Education",
    location: "रांची",
    duration: "09:36",
    videoId: "YOUR_VIDEO_ID_4",
    date: "07 Aug 2026",
  },
  {
    id: 5,
    title: "रामगढ़ में फुटबॉल प्रतियोगिता की तैयारी",
    description:
      "स्वतंत्रता दिवस के अवसर पर आयोजित होने वाली फुटबॉल प्रतियोगिता की जानकारी।",
    category: "Sports",
    location: "रामगढ़, दुमका",
    duration: "05:22",
    videoId: "YOUR_VIDEO_ID_5",
    date: "07 Aug 2026",
  },
  {
    id: 6,
    title: "गांव में बिजली की समस्या को लेकर ग्रामीणों की परेशानी",
    description:
      "ट्रांसफार्मर खराब होने के बाद बिजली संकट से जूझ रहे ग्रामीणों की समस्या।",
    category: "Public Issues",
    location: "दुमका",
    duration: "07:18",
    videoId: "YOUR_VIDEO_ID_6",
    date: "06 Aug 2026",
  },
];

const categories = [
  "All",
  "Local News",
  "District News",
  "Shravani Mela",
  "Education",
  "Sports",
  "Public Issues",
];

const YouTubeVideos = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = useMemo(() => {
    return videoData.filter((video) => {
      const categoryMatch =
        selectedCategory === "All" ||
        video.category === selectedCategory;

      const searchMatch = video.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredVideo = videoData[0];

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

      {/* Featured video */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden bg-blue-950">
            <VideoThumbnail
              video={featuredVideo}
              onPlay={() => setSelectedVideo(featuredVideo)}
              featured
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10">
            <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
              Featured Video
            </span>

            <h2 className="mt-5 text-2xl font-bold leading-tight text-blue-950 sm:text-3xl">
              {featuredVideo.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {featuredVideo.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-orange-500" />
                {featuredVideo.location}
              </span>

              <span className="flex items-center gap-2">
                <Clock size={16} className="text-orange-500" />
                {featuredVideo.duration}
              </span>
            </div>

            <button
              onClick={() => setSelectedVideo(featuredVideo)}
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              <Play size={17} fill="currentColor" />
              Watch Video
            </button>
          </div>
        </div>
      </section>

      {/* Video library */}
      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        <div className="mb-6 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-orange-600">
              Video Library
            </p>

            <h2 className="text-2xl font-bold text-blue-950">
              Latest Videos
            </h2>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search videos..."
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>

        {/* Category filters */}
      
        {/* Video cards */}
        {filteredVideos.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <article
                key={video.id}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden bg-blue-950">
                  <VideoThumbnail
                    video={video}
                    onPlay={() => setSelectedVideo(video)}
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-orange-600">
                      {video.category}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={13} />
                      {video.duration}
                    </span>
                  </div>

                  <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-7 text-blue-950">
                    {video.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {video.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs text-slate-400">
                      {video.date}
                    </span>

                    <button
                      onClick={() => setSelectedVideo(video)}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 transition hover:text-orange-700"
                    >
                      Watch
                      <Play size={14} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
            <Video className="mx-auto text-slate-300" size={44} />

            <h3 className="mt-4 font-semibold text-blue-950">
              No videos found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try another search or category.
            </p>
          </div>
        )}
      </section>

      {/* Video modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-orange-500"
              aria-label="Close video"
            >
              <X size={19} />
            </button>

            <div className="aspect-video">
              {selectedVideo.videoId.startsWith("YOUR_") ? (
                <div className="flex h-full items-center justify-center px-6 text-center text-white">
                  <div>
                    <FaYoutube
                      className="mx-auto mb-4 text-red-500"
                      size={52}
                    />

                    <h3 className="text-lg font-semibold">
                      YouTube video is not connected
                    </h3>

                    <p className="mt-2 text-sm text-gray-300">
                      Replace the video ID with your actual YouTube video ID.
                    </p>
                  </div>
                </div>
              ) : (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

function VideoThumbnail({ video, onPlay, featured = false }) {
  const isPlaceholder = video.videoId.startsWith("YOUR_");

  const thumbnailUrl = isPlaceholder
    ? null
    : `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;

  return (
    <button
      onClick={onPlay}
      className="group relative h-full w-full text-left"
      aria-label={`Play ${video.title}`}
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-950 to-blue-800">
          <FaYoutube
            size={featured ? 70 : 52}
            className="text-red-500"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/40" />

      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:bg-red-700">
        <Play size={22} fill="currentColor" />
      </div>
    </button>
  );
}

export default YouTubeVideos;