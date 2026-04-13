"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ImageSection2() {
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
          src="/images/Whisk_321e3726f4cea49a2eb421f4c4549284dr.png"
          alt="AI Health Analysis"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a]/90 via-[#0a0a0a]/60 to-transparent" />
      </div>

      {/* Content - Right aligned */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-end">
        <motion.div
          className="max-w-2xl text-right"
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
            AI-Powered
          </motion.span>

          {/* Headline */}
          <motion.h2
            className="text-[56px] lg:text-[72px] font-bold text-white leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            HEAL AI.
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#A8EDDF] to-[#F2C4CE] bg-clip-text">
              Clinician's Edge.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-[18px] text-[#8A9BB0] mt-6 ml-auto max-w-md leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Real-time diagnostic intelligence. Pattern recognition.
            Clinical decisions augmented by AI.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex justify-end gap-12 mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-[36px] font-bold text-white">1.2M+</div>
              <div className="text-[12px] text-[#8A9BB0] tracking-widest uppercase">Records Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-bold text-white">98%</div>
              <div className="text-[12px] text-[#8A9BB0] tracking-widest uppercase">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-bold text-white">48</div>
              <div className="text-[12px] text-[#8A9BB0] tracking-widest uppercase">Hospitals Live</div>
            </div>
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