"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ImageSection1() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[800px] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Whisk_8cbe491356ab75b9b054a545bb1a706fdr.png"
          alt="HealNet Hospital Campus"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/90 via-[var(--background)]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Label */}
          <motion.span
            className="inline-block text-[12px] font-semibold tracking-[0.3em] text-[var(--primary-accent)] uppercase mb-6 drop-shadow-[0_0_8px_var(--primary-accent)]/50"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Unified Healthcare
          </motion.span>

          {/* Headline */}
          <motion.h2
            className="text-[56px] lg:text-[72px] font-bold text-[var(--foreground)] leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            One Platform.
            <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text drop-shadow-[0_0_15px_var(--secondary-accent)]/50">
              Infinite Care.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-[18px] text-[var(--text-muted)] mt-6 max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Connect every hospital, every doctor, every patient.
            Experience healthcare without boundaries.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex gap-4 mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/login">
            <button className="h-14 px-8 rounded-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] font-semibold text-[15px] hover:scale-105 hover:shadow-[0_0_20px_var(--secondary-accent)]/40 transition-all">
              Get Started
            </button>
            </Link>
            <button className="h-14 px-8 rounded-full border border-[var(--foreground)]/30 text-[var(--foreground)] font-medium text-[15px] hover:bg-[var(--foreground)]/10 hover:shadow-[0_0_15px_var(--foreground)]/10 transition-all">
              Watch Demo
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-[var(--foreground)]/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-[var(--foreground)]/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}