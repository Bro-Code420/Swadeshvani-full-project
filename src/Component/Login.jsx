import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Home,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import { authenticateAccount, isAdminAuthenticated, isUserAuthenticated } from "../utils/auth";
import logo from "./photos/logo.jpeg";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get("redirect");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Popup Modal State on Login Success
  const [loginModal, setLoginModal] = useState(null); // { role: 'admin' | 'user', title: '', message: '', target: '' }

  // If already logged in, redirect accordingly
  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate(redirectPath || "/Admin", { replace: true });
    } else if (isUserAuthenticated() && redirectPath) {
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, redirectPath]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!identifier.trim()) {
      setErrorMsg("कृपया अपना ईमेल या यूज़रनेम दर्ज करें।");
      return;
    }
    if (!password) {
      setErrorMsg("कृपया अपना पासवर्ड दर्ज करें।");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = authenticateAccount(identifier, password, rememberMe);
      setIsLoading(false);

      if (result.success) {
        // Determine redirect target
        const target =
          result.role === "admin"
            ? (redirectPath || "/Admin")
            : (redirectPath && redirectPath !== "/Admin" ? redirectPath : "/");

        // Trigger Success Popup
        setLoginModal({
          role: result.role,
          name: result.user?.name || "User",
          message: result.message,
          target,
        });

        // Navigate after brief confirmation animation
        setTimeout(() => {
          navigate(target, { replace: true });
        }, 1200);
      } else {
        setErrorMsg(result.message);
      }
    }, 400);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Success Popup Modal */}
      {loginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-slate-800 border border-slate-700 text-white rounded-3xl max-w-sm w-full p-7 shadow-2xl text-center space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              {loginModal.role === "admin" ? (
                <ShieldCheck size={32} />
              ) : (
                <UserCheck size={32} />
              )}
            </div>

            <span
              className={`inline-block text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${
                loginModal.role === "admin"
                  ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              }`}
            >
              {loginModal.role === "admin"
                ? "Admin Privileges Granted"
                : "Reader / User Login"}
            </span>

            <h3 className="text-xl font-bold text-white">
              {loginModal.role === "admin"
                ? "एडमिन लॉगिन सफल!"
                : `स्वागत है, ${loginModal.name}!`}
            </h3>

            <p className="text-xs text-slate-300">
              {loginModal.message}
            </p>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
              <div className="h-3.5 w-3.5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
              <span>रीडायरेक्ट किया जा रहा है...</span>
            </div>
          </div>
        </div>
      )}

      {/* Top Brand & Home Link */}
      <div className="mb-6 text-center relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white text-xs font-medium backdrop-blur transition mb-4"
        >
          <Home size={14} className="text-orange-400" />
          <span>मुख्य पृष्ठ पर वापस जाएं (Back to Home)</span>
        </Link>

        <div className="flex justify-center mb-2.5">
          <img
            src={logo}
            alt="Swadesh Vani Logo"
            className="h-14 w-auto object-contain drop-shadow-md rounded-lg p-1 bg-white"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          स्वदेश वाणी
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          सत्य, निष्पक्ष और सटीक पत्रकारिता
        </p>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full relative z-10">
        <div className="rounded-3xl border border-white/10 bg-slate-800/80 shadow-2xl backdrop-blur-xl p-7 sm:p-9 text-slate-100">
          <div className="pb-5 mb-5 border-b border-white/10 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white leading-tight">
              लॉगिन करें (Log In)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              अपने खाते में प्रवेश करने के लिए विवरण दर्ज करें
            </p>
          </div>

          {/* Feedback error alert */}
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle size={18} className="shrink-0 text-red-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                ईमेल या यूज़रनेम (Email or Username)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={17} />
                </div>
                <input
                  id="identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="you@example.com या यूज़रनेम"
                  autoComplete="username"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                >
                  पासवर्ड (Password)
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={17} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 pr-11 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-500 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-orange-600 focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs text-slate-300">Remember me</span>
              </label>

              <Link
                to="/"
                className="text-xs text-slate-400 hover:text-slate-200 transition"
              >
                होम पर जाएं
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>सत्यापित हो रहा है...</span>
                </>
              ) : (
                <>
                  <span>लॉगिन करें (Log In)</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <p className="mt-5 text-center text-xs text-slate-500">
          Swadesh Vaani &copy; {new Date().getFullYear()} &bull; All Rights Reserved
        </p>
      </div>
    </main>
  );
}