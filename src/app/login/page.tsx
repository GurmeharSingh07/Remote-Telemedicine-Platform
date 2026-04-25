"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  clearAuthSession,
  createSessionFromAuthPayload,
  getAuthSession,
  getDashboardPath,
  loginUser,
  saveAuthSession,
  validateStoredSession,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const existingSession = getAuthSession();
    if (!existingSession) {
      return;
    }

    let isActive = true;

    const verifySession = async () => {
      try {
        const refreshedSession = await validateStoredSession(existingSession);
        if (!isActive) {
          return;
        }

        saveAuthSession(refreshedSession);
        router.replace(getDashboardPath(refreshedSession.role));
      } catch {
        clearAuthSession();
      }
    };

    verifySession();

    return () => {
      isActive = false;
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({ email: email.trim(), password });
      const session = createSessionFromAuthPayload(response.data);

      saveAuthSession(session);
      router.push(getDashboardPath(session.role));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to login. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const floatingIcons = [
    { icon: "🏥", delay: 0, x: "20%", y: "15%" },
    { icon: "💊", delay: 0.5, x: "75%", y: "20%" },
    { icon: "🩺", delay: 1, x: "15%", y: "70%" },
    { icon: "❤️", delay: 1.5, x: "80%", y: "65%" },
    { icon: "🧬", delay: 0.8, x: "50%", y: "85%" },
    { icon: "💉", delay: 1.2, x: "60%", y: "10%" },
  ];

  return (
    <div className="min-h-screen w-full flex">
      {/* LEFT PANEL - Immersive Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[var(--background-alt)]">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(135deg, var(--primary-accent) 0%, var(--secondary-accent) 50%, var(--tertiary) 100%)",
            }}
            animate={{
              background: [
                "linear-gradient(135deg, var(--primary-accent) 0%, var(--secondary-accent) 50%, var(--tertiary) 100%)",
                "linear-gradient(225deg, var(--primary-accent) 0%, var(--secondary-accent) 50%, var(--tertiary) 100%)",
                "linear-gradient(315deg, var(--primary-accent) 0%, var(--secondary-accent) 50%, var(--tertiary) 100%)",
                "linear-gradient(135deg, var(--primary-accent) 0%, var(--secondary-accent) 50%, var(--tertiary) 100%)",
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating Medical Icons */}
        {mounted && floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [-15, 15, -15],
              rotate: [-10, 10, -10],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 6,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Decorative Circles */}
        <motion.div
          className="absolute w-64 h-64 rounded-full border border-[var(--primary-accent)]/10"
          style={{ top: "20%", left: "15%" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full border border-[var(--secondary-accent)]/10"
          style={{ bottom: "10%", right: "10%" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-16 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h2 className="text-[48px] font-bold font-[family-name:var(--font-heading)] text-[var(--foreground)] leading-tight">
              Welcome back to
              <br />
              <span className="gradient-text">HealNet</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg mt-6 max-w-md mx-auto font-[family-name:var(--font-body)]">
              Your unified healthcare platform connecting doctors, hospitals, and patients across India.
            </p>

            {/* Stats Preview */}
            <motion.div
              className="flex items-center justify-center gap-12 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center">
                <div className="text-[32px] font-bold font-[family-name:var(--font-heading)] text-[var(--primary-accent)]">200+</div>
                <div className="text-[12px] text-[var(--text-muted)] uppercase tracking-wider">Hospitals</div>
              </div>
              <div className="w-px h-12 bg-[var(--border-color)]" />
              <div className="text-center">
                <div className="text-[32px] font-bold font-[family-name:var(--font-heading)] text-[var(--secondary-accent)]">1.2M+</div>
                <div className="text-[12px] text-[var(--text-muted)] uppercase tracking-wider">Records</div>
              </div>
              <div className="w-px h-12 bg-[var(--border-color)]" />
              <div className="text-center">
                <div className="text-[32px] font-bold font-[family-name:var(--font-heading)] text-[var(--tertiary)]">12K+</div>
                <div className="text-[12px] text-[var(--text-muted)] uppercase tracking-wider">Doctors</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background-alt)] to-transparent" />
      </div>

      {/* RIGHT PANEL - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[var(--background)]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="text-[32px] font-bold font-[family-name:var(--font-heading)] gradient-text">
                HealNet
              </Link>
            </motion.div>
          </div>

          {/* Form Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-[32px] font-bold font-[family-name:var(--font-heading)] text-[var(--foreground)]">
              Sign in
            </h1>
            <p className="text-[var(--text-muted)] mt-2 font-[family-name:var(--font-body)]">
              Enter your credentials to access your dashboard
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[14px] font-medium text-[var(--foreground)] font-[family-name:var(--font-body)]">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-4 bg-[var(--background-alt)] border border-[var(--border-color)] rounded-2xl text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-accent)] focus:shadow-[0_0_0_4px_var(--primary-accent)/10] transition-all font-[family-name:var(--font-body)]"
                  placeholder="you@example.com"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[14px] font-medium text-[var(--foreground)] font-[family-name:var(--font-body)]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[13px] text-[var(--primary-accent)] hover:text-[var(--primary-light)] transition-colors font-[family-name:var(--font-body)]">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 px-4 pr-14 bg-[var(--background-alt)] border border-[var(--border-color)] rounded-2xl text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-accent)] focus:shadow-[0_0_0_4px_var(--primary-accent)/10] transition-all font-[family-name:var(--font-body)]"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 p-4 bg-[var(--tertiary)]/10 border border-[var(--tertiary)]/30 rounded-xl"
                >
                  <svg className="w-5 h-5 text-[var(--tertiary)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[14px] text-[var(--tertiary)] font-[family-name:var(--font-body)]">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="relative w-full h-14 rounded-2xl font-semibold text-[15px] font-[family-name:var(--font-body)] overflow-hidden group disabled:opacity-70"
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-[var(--background)] flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </span>
            </motion.button>
          </motion.form>

          {/* Divider */}
          <motion.div
            className="flex items-center gap-4 my-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex-1 h-px bg-[var(--border-color)]" />
            <span className="text-[13px] text-[var(--text-muted)] font-[family-name:var(--font-body)]">or continue with</span>
            <div className="flex-1 h-px bg-[var(--border-color)]" />
          </motion.div>

          {/* Social Login */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button className="h-12 rounded-xl border border-[var(--border-color)] bg-[var(--background-alt)] hover:bg-[var(--background)] flex items-center justify-center gap-2 transition-all duration-300 group">
              <svg className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-[14px] font-medium text-[var(--foreground)] font-[family-name:var(--font-body)]">Google</span>
            </button>
            <button className="h-12 rounded-xl border border-[var(--border-color)] bg-[var(--background-alt)] hover:bg-[var(--background)] flex items-center justify-center gap-2 transition-all duration-300 group">
              <svg className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--foreground)] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-[14px] font-medium text-[var(--foreground)] font-[family-name:var(--font-body)]">GitHub</span>
            </button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.p
            className="text-center mt-8 text-[14px] text-[var(--text-muted)] font-[family-name:var(--font-body)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[var(--primary-accent)] font-semibold hover:text-[var(--primary-light)] transition-colors">
              Create account
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Theme Toggle - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
