"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginProps {
  onLogin: (role: "patient" | "doctor" | "admin") => void;
}

const credentials = [
  { email: "patient@healnet.in", password: "patient123", role: "patient" as const, name: "Rahul Sharma" },
  { email: "doctor@healnet.in", password: "doctor123", role: "doctor" as const, name: "Dr. Priya Menon" },
  { email: "admin@healnet.in", password: "admin123", role: "admin" as const, name: "Admin User" },
];

export default function LoginPage({ onLogin }: LoginProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const validCredential = credentials.find(
      (c) => c.email === email && c.password === password
    );

    if (validCredential) {
      onLogin(validCredential.role);
      router.push(`/dashboard/${validCredential.role}`);
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  const handleQuickLogin = (credential: typeof credentials[0]) => {
    setEmail(credential.email);
    setPassword(credential.password);
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F2C4CE]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A8EDDF]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-[36px] font-bold bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] bg-clip-text text-transparent">
            HealNet
          </h1>
          <p className="text-[#8A9BB0] mt-2">Sign in to your dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[rgba(168,237,223,0.2)] rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[13px] text-[#8A9BB0] mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white placeholder-[#8A9BB0] focus:border-[#A8EDDF] focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-[13px] text-[#8A9BB0] mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white placeholder-[#8A9BB0] focus:border-[#A8EDDF] focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] text-[#0a0a0a] font-semibold hover:shadow-[0_0_30px_rgba(168,237,223,0.3)] transition-all"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Quick Login Buttons */}
          <div className="mt-8 pt-6 border-t border-[rgba(168,237,223,0.2)]">
            <p className="text-[12px] text-[#8A9BB0] mb-4 text-center">Quick Login (Demo)</p>
            <div className="space-y-3">
              {credentials.map((cred) => (
                <button
                  key={cred.role}
                  onClick={() => handleQuickLogin(cred)}
                  className="w-full h-11 px-4 rounded-xl border border-[rgba(168,237,223,0.3)] text-white text-sm font-medium hover:bg-[rgba(168,237,223,0.1)] transition-all flex items-center justify-between"
                >
                  <span>{cred.role.charAt(0).toUpperCase() + cred.role.slice(1)}</span>
                  <span className="text-[#8A9BB0] text-xs">{cred.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a href="/" className="text-[14px] text-[#8A9BB0] hover:text-[#A8EDDF] transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}