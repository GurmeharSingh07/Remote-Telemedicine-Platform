"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/70 to-transparent" />
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
            className="inline-block text-[12px] font-semibold tracking-[0.3em] text-[#A8EDDF] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Unified Healthcare
          </motion.span>

          {/* Headline */}
          <motion.h2
            className="text-[56px] lg:text-[72px] font-bold text-white leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            One Platform.
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] bg-clip-text">
              Infinite Care.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-[18px] text-[#8A9BB0] mt-6 max-w-md leading-relaxed"
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
            <button className="h-14 px-8 rounded-full bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] text-[#0a0a0a] font-semibold text-[15px] hover:scale-105 transition-transform">
              Start Free Trial
            </button>
            <button className="h-14 px-8 rounded-full border border-white/30 text-white font-medium text-[15px] hover:bg-white/10 transition-colors">
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
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}