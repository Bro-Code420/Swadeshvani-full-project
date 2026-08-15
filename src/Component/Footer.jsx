import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

import hindilogo from "./photos/logo.jpeg";

const Footer = () => {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "District News", to: "/district" },
    { label: "Journal", to: "/journal" },
    { label: "Videos", to: "/videos" },
    { label: "Advertisement", to: "/advertisement" },
    { label: "About Us", to: "/about" },
  ];

  const newsLinks = [
    { label: "Education", to: "/education" },
    { label: "World News", to: "/world-news" },
    { label: "Technology", to: "/technology-news" },
    { label: "Sports", to: "/sports-news" },
    { label: "Historic Jharkhand", to: "/historic-jharkhand" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      icon: <FaFacebookF size={16} />,
      href: "https://www.facebook.com/",
    },
    {
      label: "Instagram",
      icon: <FaInstagram size={18} />,
      href: "https://www.instagram.com/",
    },
    {
      label: "YouTube",
      icon: <FaYoutube size={18} />,
      href: "https://www.youtube.com/",
    },
    {
      label: "Twitter",
      icon: <FaTwitter size={17} />,
      href: "https://twitter.com/",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-blue-950 text-white">
      <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600" />

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src={hindilogo}
                alt="NewsDesk logo"
                className="h-24 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-blue-100">
              आपके क्षेत्र, राज्य और देश की महत्वपूर्ण खबरें सही और सरल भाषा
              में आप तक पहुंचाने का हमारा प्रयास।
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-800 text-blue-200 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <FooterColumn title="Quick Links" links={quickLinks} />

          {/* News categories */}
          <FooterColumn title="News Categories" links={newsLinks} />

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm text-blue-100">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-orange-400"
                />

                <span>
                  Dumka, Jharkhand
                  <br />
                  India
                </span>
              </div>

              <a
                href="tel:+917979093015"
                className="flex items-center gap-3 transition hover:text-orange-400"
              >
                <Phone size={17} className="text-orange-400" />
                +91 79790 93015
              </a>

              <a
                href="mailto:swaveshvaninewsnetwork@gmail.com"
                className="flex items-center gap-3 break-all transition hover:text-orange-400"
              >
                <Mail size={17} className="shrink-0 text-orange-400" />
                swaveshvaninewsnetwork@gmail.com
              </a>
            </div>

            <Link
              to="/advertisement"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Advertise With Us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-blue-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 text-center sm:px-8 md:flex-row md:text-left">
          <p className="text-xs text-blue-200">
            © {new Date().getFullYear()} NewsDesk. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-blue-200">
            <Link
              to="/PrivacyPolicy"
              className="transition hover:text-orange-400"
            >
              Privacy Policy
            </Link>

            <Link
              to="/t&c"
              className="transition hover:text-orange-400"
            >
              Terms &amp; Conditions
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 rounded-full border border-blue-800 px-3 py-2 transition hover:border-orange-500 hover:bg-orange-500 hover:text-white"
            >
              <ArrowUp size={14} />
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="group flex items-center gap-2 text-sm text-blue-100 transition hover:text-orange-400"
            >
              <ArrowRight
                size={14}
                className="text-orange-500 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
              />

              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;