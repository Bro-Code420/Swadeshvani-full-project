import React from "react";

const historicPlaces = [
  {
    id: 1,
    name: "Palamu Fort",
    location: "Latehar / Palamu district",
    image: "/images/jharkhand/palamu-fort.jpg", // REAL photo of Palamu Fort
    description:
      "Set on a hill near Betla National Park, Palamu Fort is a ruined fortress that once guarded the region. Its massive gateways, bastions and vantage views echo the military architecture of the Cheros and later rulers.",
    highlight:
      "Combine a visit to the fort with wildlife safaris in Betla National Park for history and nature in one trip.",
  },
  {
    id: 2,
    name: "Maluti Terracotta Temples",
    location: "Maluti, Dumka district",
    image: "/images/jharkhand/maluti-temples.jpg", // REAL photo of Maluti terracotta temples
    description:
      "A cluster of terracotta temples famed for detailed panels depicting epics like the Ramayana and Mahabharata. Maluti is one of Jharkhand’s most important heritage sites, with a unique temple-town atmosphere.",
    highlight:
      "Visit early morning or late afternoon for soft light on the terracotta panels and quieter lanes.",
  },
  {
    id: 3,
    name: "Ratu Palace",
    location: "Ranchi district",
    image: "/images/jharkhand/ratu-palace.jpg", // REAL photo of Ratu Palace
    description:
      "Once the seat of the Nagvanshi rulers, Ratu Palace combines colonial influences and local styles. Its courtyards and halls recall the royal and administrative history of the region.",
    highlight:
      "Explore nearby temples and traditional neighbourhoods to see how royal heritage blends with everyday life.",
  },
  {
    id: 4,
    name: "Hundru Falls",
    location: "Near Ranchi, Angara block",
    image: "/images/jharkhand/hundru-falls.jpg", // REAL photo of Hundru Falls
    description:
      "Formed by the Swarnarekha River plunging over rocky cliffs, Hundru Falls is one of Jharkhand’s most iconic waterfalls, surrounded by forested trails and natural rock formations.",
    highlight:
      "Post‑monsoon is ideal for full water flow; use designated view points and steps for safe photography.",
  },
  {
    id: 5,
    name: "Betla National Park & Ruins",
    location: "Latehar district",
    image: "/images/jharkhand/betla-national-park.jpg", // REAL photo of Betla National Park area
    description:
      "One of India’s earliest national parks, Betla combines rich wildlife with old watchtowers, forest rest houses and historical remains linked to Palamu’s past.",
    highlight:
      "Early morning safaris offer chances to spot deer, bison and birds, with misty views of ruins in the background.",
  },
  {
    id: 6,
    name: "Rajmahal & Baradari Ruins",
    location: "Sahibganj / Rajmahal area",
    image: "/images/jharkhand/rajmahal-baradari.jpg", // REAL photo of Rajmahal/Baradari ruins
    description:
      "Rajmahal’s riverfront ruins, including structures like Baradari, reflect Mughal‑era architecture and the strategic importance of the Ganga banks.",
    highlight:
      "Walk along the riverfront and explore surviving arches, domes and viewing pavilions as the Ganga flows nearby.",
  },
  {
    id: 7,
    name: "Parasnath Hill (Shikharji)",
    location: "Giridih district",
    image: "/images/jharkhand/parasnath-hill.jpg", // REAL photo of Parasnath Hill / Shikharji
    description:
      "One of the most important Jain pilgrimage centres, Parasnath has ancient temples and sacred points along forested hill trails.",
    highlight:
      "A significant spiritual journey; respect local customs and plan for a full‑day trek with proper footwear.",
  },
];

export default function HistoricJharkhandPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero section */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
                <span className="text-orange-500">Historic</span> Jharkhand Tourism
              </h1>
              <p className="mt-3 max-w-xl text-sm sm:text-base text-slate-600">
                Forts, terracotta temples, palaces, waterfalls and sacred hills—
                discover heritage destinations that tell the story of Jharkhand&apos;s
                past and landscape.
              </p>
            </div>
            <div className="text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Jharkhand tourism highlights</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {historicPlaces.slice(0, 4).map((place) => (
            <article
              key={place.id}
              className="group cursor-pointer flex flex-col gap-4"
            >
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-[260px] md:h-[280px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    Historic site
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{place.location}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-semibold leading-snug text-slate-900 group-hover:text-slate-800">
                  {place.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-600">
                  {place.description}
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  Tip: {place.highlight}
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
            More heritage experiences
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>
      </section>

      {/* More places list */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {historicPlaces.slice(4).map((place, idx) => (
            <article
              key={place.id}
              className={`flex gap-4 pb-6 ${
                idx >= historicPlaces.slice(4).length - 2
                  ? ""
                  : "md:border-b md:border-slate-200"
              }`}
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    Historic site
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{place.location}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-semibold leading-snug text-slate-900 hover:text-slate-800 cursor-pointer">
                  {place.name}
                </h3>
                <p className="text-sm text-slate-600">{place.description}</p>
                <p className="text-xs sm:text-sm text-slate-500">
                  Tip: {place.highlight}
                </p>
              </div>
              <div className="w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={place.image}
                  alt={place.name}
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