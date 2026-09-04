import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, History, Compass, ArrowRight, Clock, User, Bookmark } from "lucide-react";
import { getAllArticles, syncArticlesFromServer, toHindiNumber } from "../data/newsData";
import { useLanguage } from "../context/LanguageContext";

import palamuFortImage from "./photos/Palamu.jpeg";
import malutiTemplesImage from "./photos/Maluti.jpeg";
import ratuPalaceImage from "./photos/ratu.jpeg";
import hundruFallsImage from "./photos/Hundrufalls.jpeg";
import betlaParkImage from "./photos/Betla.jpeg";
import basukinathTempleImage from "./photos/baba.jpeg";
import hijlaMelaImage from "./photos/hijla.jpeg";
import dumkaRailwayImage from "./photos/railwaystation.jpeg";
import dumkaCityImage from "./photos/dumka.jpeg";

const historicPlaces = [
  {
    id: 1,
    name: "पलामू किला",
    location: "लातेहार / पलामू जिला",
    image: palamuFortImage,
    description:
      "बेतला राष्ट्रीय उद्यान के पास पहाड़ी पर स्थित पलामू किला क्षेत्र के महत्वपूर्ण ऐतिहासिक किलों में से एक है। इसके विशाल प्रवेश द्वार, बुर्ज और ऊंचाई से दिखने वाले प्राकृतिक दृश्य पुराने शासकों की स्थापत्य कला की याद दिलाते हैं।",
    highlight:
      "पलामू किले के साथ बेतला राष्ट्रीय उद्यान की यात्रा करके इतिहास और प्रकृति दोनों का आनंद लें।",
  },
  {
    id: 2,
    name: "मलूटी टेराकोटा मंदिर",
    location: "मलूटी, शिकारीपाड़ा, दुमका जिला",
    image: malutiTemplesImage,
    description:
      "मलूटी अपने ऐतिहासिक टेराकोटा मंदिरों के लिए प्रसिद्ध है। मंदिरों की दीवारों पर रामायण, महाभारत और हिंदू पौराणिक कथाओं से जुड़े सुंदर चित्र और कलाकृतियां बनाई गई हैं।",
    highlight:
      "टेराकोटा कलाकृतियों को देखने के लिए सुबह या शाम का समय सबसे अच्छा रहता है।",
  },
  {
    id: 3,
    name: "रातू राजमहल",
    location: "रांची जिला",
    image: ratuPalaceImage,
    description:
      "रातू राजमहल नागवंशी शासकों की ऐतिहासिक विरासत से जुड़ा हुआ है। राजमहल में स्थानीय वास्तुकला के साथ औपनिवेशिक शैली का भी प्रभाव दिखाई देता है।",
    highlight:
      "राजमहल के आसपास स्थित मंदिरों और पारंपरिक बस्तियों को भी अपनी यात्रा में शामिल करें।",
  },
  {
    id: 4,
    name: "हुंडरू जलप्रपात",
    location: "अंगड़ा प्रखंड, रांची के पास",
    image: hundruFallsImage,
    description:
      "स्वर्णरेखा नदी के ऊंची चट्टानों से गिरने के कारण बना हुंडरू जलप्रपात झारखंड के सबसे प्रसिद्ध प्राकृतिक स्थलों में से एक है। यहां जंगल, चट्टानें और सुंदर जलधारा पर्यटकों को आकर्षित करती हैं।",
    highlight:
      "बारिश के बाद जलप्रपात का दृश्य बेहद सुंदर होता है। फोटोग्राफी के दौरान निर्धारित स्थानों पर ही रहें।",
  },
  {
    id: 5,
    name: "बेतला राष्ट्रीय उद्यान एवं ऐतिहासिक अवशेष",
    location: "लातेहार जिला",
    image: betlaParkImage,
    description:
      "बेतला राष्ट्रीय उद्यान अपने वन्यजीवों के साथ-साथ पुराने प्रहरी टावरों, वन विश्राम गृहों और पलामू क्षेत्र से जुड़े ऐतिहासिक अवशेषों के लिए भी जाना जाता है।",
    highlight:
      "सुबह की सफारी के दौरान हिरण, गौर, पक्षियों और अन्य वन्यजीवों को देखने का अवसर मिल सकता है।",
  },
  {
    id: 6,
    name: "बाबा बासुकीनाथ मंदिर",
    location: "बासुकीनाथ, दुमका जिला",
    image: basukinathTempleImage,
    description:
      "बाबा बासुकीनाथ मंदिर झारखंड के प्रमुख धार्मिक स्थलों में से एक है। सावन के महीने में देशभर से श्रद्धालु भगवान शिव के दर्शन और पूजा-अर्चना के लिए यहां पहुंचते हैं।",
    highlight:
      "सावन और श्रावणी मेले के दौरान यहां काफी भीड़ रहती है, इसलिए यात्रा की योजना पहले बनाएं।",
  },
  {
    id: 7,
    name: "हिजला मेला स्थल",
    location: "हिजला, दुमका जिला",
    image: hijlaMelaImage,
    description:
      "हिजला मेला दुमका की आदिवासी संस्कृति, लोककला, हस्तशिल्प, लोकनृत्य और पारंपरिक जीवनशैली का महत्वपूर्ण उत्सव है। यह मेला मयूराक्षी नदी के आसपास आयोजित किया जाता है।",
    highlight:
      "मेले में स्थानीय हस्तशिल्प, पारंपरिक व्यंजन, लोकनृत्य और सांस्कृतिक कार्यक्रमों का आनंद लें।",
  },
  {
    id: 8,
    name: "दुमका रेलवे स्टेशन",
    location: "दुमका शहर, दुमका जिला",
    image: dumkaRailwayImage,
    description:
      "दुमका रेलवे स्टेशन संताल परगना क्षेत्र का एक महत्वपूर्ण परिवहन केंद्र है। रेलवे कनेक्टिविटी ने दुमका को झारखंड के कई प्रमुख शहरों और धार्मिक स्थलों से जोड़ा है।",
    highlight:
      "दुमका शहर, बासुकीनाथ और आसपास के पर्यटन स्थलों की यात्रा के लिए रेलवे स्टेशन एक सुविधाजनक प्रारंभिक स्थान है।",
  },
  {
    id: 9,
    name: "दुमका शहर",
    location: "दुमका जिला",
    image: dumkaCityImage,
    description:
      "दुमका संताल परगना का प्रमुख शहर और झारखंड की उपराजधानी है। यहां आदिवासी संस्कृति, स्थानीय बाजार, धार्मिक स्थल और प्राकृतिक वातावरण का सुंदर मेल देखने को मिलता है।",
    highlight:
      "स्थानीय बाजारों और आसपास के गांवों की यात्रा करके क्षेत्र की संस्कृति और पारंपरिक जीवनशैली को करीब से जानें।",
  },
];

export default function HistoricJharkhandPage() {
  const { language, t } = useLanguage();
  const [dynamicArticles, setDynamicArticles] = useState([]);

  useEffect(() => {
    const fetchHeritageNews = () => {
      const all = getAllArticles();
      const heritage = all.filter(
        (a) =>
          a.category === "ऐतिहासिक झारखंड" ||
          a.category === "Historic" ||
          a.category === "Historic Jharkhand" ||
          a.category === "धरोहर" ||
          a.category === "संस्कृति" ||
          (a.title && (a.title.includes("इतिहास") || a.title.includes("धरोहर") || a.title.includes("संस्कृति") || a.title.includes("किला")))
      );
      setDynamicArticles(heritage);
    };

    fetchHeritageNews();
    syncArticlesFromServer().then(() => fetchHeritageNews());

    window.addEventListener("sv_articles_change", fetchHeritageNews);
    window.addEventListener("storage", fetchHeritageNews);

    return () => {
      window.removeEventListener("sv_articles_change", fetchHeritageNews);
      window.removeEventListener("storage", fetchHeritageNews);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* मुख्य परिचय */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800">
                <History size={14} />
                {t("historicTitle")}
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                <span className="text-orange-500">{language === "hi" ? "ऐतिहासिक" : "Historic"}</span> {language === "hi" ? "झारखंड एवं संस्कृति" : "Jharkhand & Culture"}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {t("historicSubtitle")}
              </p>
            </div>

            <div className="text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {dynamicArticles.length > 0
                  ? `कुल ${toHindiNumber(dynamicArticles.length)} प्रकाशित ऐतिहासिक लेख`
                  : (language === "hi" ? "झारखंड धरोहर विशेषांक" : "Jharkhand Heritage Special")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Articles Published from Admin Panel */}
      {dynamicArticles.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">ताज़ा प्रकाशन</span>
              <h2 className="text-xl sm:text-2xl font-bold text-blue-950 mt-1 flex items-center gap-2">
                <Bookmark className="text-orange-500" size={22} />
                ऐतिहासिक शोध, धरोहर एवं संस्कृति विशेषांक
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {toHindiNumber(dynamicArticles.length)} लेख
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dynamicArticles.map((article) => (
              <article
                key={article.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 transition duration-300"
              >
                <div>
                  <Link to={`/news/${article.id}`} className="block relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={article.image || palamuFortImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-emerald-600/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                        {article.category || "ऐतिहासिक झारखंड"}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5">
                    {article.district && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 mb-2">
                        <MapPin size={12} className="text-orange-500" />
                        {article.district}
                      </span>
                    )}

                    <h3 className="font-bold text-base text-blue-950 group-hover:text-orange-600 line-clamp-2 leading-snug">
                      <Link to={`/news/${article.id}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {article.excerpt && (
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {article.date || "हालिया"}
                  </span>
                  <Link
                    to={`/news/${article.id}`}
                    className="inline-flex items-center gap-1 font-bold text-orange-600 hover:text-orange-700"
                  >
                    पूरा पढ़ें <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* सभी स्थायी धरोहर स्थल */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 border-t border-slate-100">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
          <Compass className="text-orange-500" size={20} />
          झारखंड के प्रमुख ऐतिहासिक एवं पर्यटन स्थल
        </h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {historicPlaces.map((place) => (
            <article
              key={place.id}
              className="group flex flex-col gap-4 rounded-3xl border border-slate-100 bg-slate-50/40 p-4 transition duration-300 hover:border-orange-200 hover:bg-white hover:shadow-md"
            >
              <div className="overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={place.image}
                  alt={place.name}
                  loading="lazy"
                  className="h-[260px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[280px]"
                />
              </div>

              <div className="space-y-2 p-2">
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 font-bold tracking-wider text-emerald-700">
                    धरोहर स्थल
                  </span>

                  <span className="text-slate-400">•</span>

                  <span className="flex items-center gap-1 font-medium text-slate-500">
                    <MapPin size={13} className="text-orange-500" />
                    {place.location}
                  </span>
                </div>

                <h3 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-orange-600 sm:text-2xl">
                  {place.name}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                  {place.description}
                </p>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3 text-xs text-emerald-800 sm:text-sm">
                  <strong>यात्रा सुझाव:</strong> {place.highlight}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}