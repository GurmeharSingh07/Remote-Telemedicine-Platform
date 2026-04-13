"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]/90" />
        {/* Subtle radial glow from center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,237,223,0.15),transparent_50%)]" />
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
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#A8EDDF]/40 bg-[#A8EDDF]/10 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#A8EDDF] animate-pulse" />
            <span className="text-[13px] font-medium text-[#A8EDDF] tracking-wide">
              Now in Beta · 200+ Hospitals
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div variants={fadeUpVariants}>
            <h1 className="text-[48px] md:text-[72px] lg:text-[88px] font-bold tracking-tight leading-[1.05] text-white">
              Every Patient.
              <br />
              <span className="text-transparent bg-gradient-to-r from-[#F2C4CE] via-[#A8EDDF] to-[#F2C4CE] bg-[length:200%_auto] bg-clip-text">
                Every Hospital.
              </span>
              <br />
              One Platform.
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-8 text-[18px] md:text-[22px] text-[#8A9BB0] font-[family-name:var(--font-body)] leading-[1.7] max-w-2xl mx-auto"
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
            {/* Secondary CTA */}
            <button className="flex items-center gap-3 h-14 px-8 rounded-full border border-white/30 text-white font-medium text-[15px] hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
              <span className="text-[#A8EDDF]">▶</span>
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
                <div className="text-[28px] md:text-[32px] font-bold text-white">
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
        <div className="w-7 h-12 rounded-full border-2 border-white/20 flex justify-center pt-3">
          <motion.div
            className="w-1.5 h-3 bg-white/60 rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}