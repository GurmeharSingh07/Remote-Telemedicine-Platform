"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[900px] overflow-hidden"
    >
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hospital.png"
          alt="HealNet Hospital"
          fill
          className="object-cover"
          priority
        />
        {/* Cinematic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/80 via-[var(--background)]/60 to-[var(--background)]/90" />
        {/* Subtle radial glow from center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,var(--primary-accent),transparent_50%)] opacity-15" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
        <motion.div
          className="max-w-4xl text-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Badge */}
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[var(--primary-accent)]/40 bg-[var(--primary-accent)]/10 backdrop-blur-sm mb-8 shadow-[0_0_15px_var(--primary-accent)]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)] animate-pulse shadow-[0_0_8px_var(--primary-accent)]" />
            <span className="text-[13px] font-medium text-[var(--primary-accent)] tracking-wide">
              Now in Beta · 200+ Hospitals
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={fadeUpVariants}>
            <h1 className="text-[48px] md:text-[72px] lg:text-[88px] font-bold tracking-tight leading-[1.05] text-[var(--foreground)]">
              Every Patient.
              <br />
              <span className="text-transparent bg-gradient-to-r from-[var(--primary-accent)] via-[var(--secondary-accent)] to-[var(--primary-accent)] bg-[length:200%_auto] bg-clip-text animate-gradient-slow drop-shadow-[0_0_15px_var(--secondary-accent)]/30">
                Every Hospital.
              </span>
              <br />
              HealNet.
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="text-[18px] md:text-[22px] text-[var(--text-muted)] mt-8 max-w-2xl mx-auto font-medium font-[family-name:var(--font-body)] leading-relaxed"
          >
            India&apos;s first AI-powered centralized healthcare platform.
            <br className="hidden md:block" />
            Connecting records, doctors, and hospitals through intelligent automation.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center justify-center gap-5 mt-12"
          >
            <Link href="/login">
              <button className="h-14 px-8 rounded-full bg-[var(--foreground)] text-[var(--background)] font-bold text-[15px] hover:-translate-y-0.5 hover:shadow-[0_0_30px_var(--foreground)]/20 transition-all duration-300">
                Start Building Free
              </button>
            </Link>
            {/* Secondary CTA */}
            <button className="flex items-center gap-3 h-14 px-8 rounded-full border border-[var(--border-color)] text-[var(--foreground)] font-medium text-[15px] hover:bg-[var(--foreground)]/10 hover:shadow-[0_0_20px_var(--foreground)]/10 transition-all duration-300 backdrop-blur-sm">
              <span className="text-[var(--primary-accent)] drop-shadow-[0_0_8px_var(--primary-accent)]/60">▶</span>
              Watch Demo
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center justify-center gap-10 md:gap-16 mt-16"
          >
            {[
              { value: "200+", label: "Hospitals" },
              { value: "1.2M+", label: "Patient Records" },
              { value: "12,000+", label: "Doctors" },
              { value: "18", label: "States" },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-[28px] md:text-[32px] font-bold text-[var(--foreground)]">
                  {stat.value}
                </div>
                <div className="text-[12px] text-[#8A9BB0] tracking-widest uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-7 h-12 rounded-full border-2 border-[var(--foreground)]/20 flex justify-center pt-3">
          <motion.div
            className="w-1.5 h-3 bg-[var(--foreground)]/60 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}