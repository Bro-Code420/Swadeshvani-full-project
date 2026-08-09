import React from "react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo / brand */}
       

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur">
          <div className="px-6 py-7 sm:px-8 sm:py-8">
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Use your email and password to log in.
            </p>

            <form className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-600 uppercase tracking-[0.14em]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/70 focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-slate-600 uppercase tracking-[0.14em]"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-slate-500 hover:text-slate-700"
                  >
                    Forgot?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/70 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-black transition-colors"
              >
                Log in
              </button>
            </form>

            <p className="mt-4 text-xs text-center text-slate-500">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-orange-600 hover:text-orange-700"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Small footer */}
        <p className="mt-6 text-xs text-center text-slate-400">
          Protected by reCAPTCHA and subject to our{" "}
          <a href="/privacy" className="underline hover:text-slate-500">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}