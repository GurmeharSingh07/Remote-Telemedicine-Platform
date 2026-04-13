"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  "Product",
  "Solutions",
  "For Hospitals",
  "Pricing",
  "AI Assistant",
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 h-[68px] transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(180,210,220,0.25)]"
            : "bg-white/80 backdrop-blur-[20px]"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left: Logo */}
            <a
              href="#"
              className="text-[24px] font-bold font-[family-name:var(--font-heading)] bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] bg-clip-text text-transparent"
            >
              HealNet
            </a>

            {/* Center: Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[15px] font-[family-name:var(--font-body)] text-[#1A2332] hover:text-[#A8EDDF] transition-colors duration-300 relative group"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#A8EDDF] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Right: CTA Buttons (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="/login" className="h-[36px] px-5 rounded-full border border-[#A8EDDF] text-[#1A2332] font-medium text-[15px] font-[family-name:var(--font-body)] hover:bg-[#A8EDDF]/10 transition-all duration-300">
                Sign In
              </a>
            </div>

            {/* Mobile: Hamburger Menu Button */}
            <button
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="w-6 h-0.5 bg-[#1A2332] origin-center"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-[#1A2332]"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-[#1A2332] origin-center"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-[68px] left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(180,210,220,0.2)]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="container mx-auto px-6 py-6">
                {/* Mobile Nav Links */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link}
                      href="#"
                      className="text-[17px] font-[family-name:var(--font-body)] text-[#1A2332] py-2 border-b border-[#A8EDDF]/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col gap-3 mt-6">
                  <a href="/login" className="h-[44px] rounded-full border border-[#A8EDDF] text-[#1A2332] font-medium text-[15px] font-[family-name:var(--font-body)] flex items-center justify-center">
                    Sign In
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}