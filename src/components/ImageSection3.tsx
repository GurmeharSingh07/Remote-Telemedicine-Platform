"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function ImageSection3() {
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
          src="/images/Whisk_2b64974f3d4b5e9b2344f1b10a97b872dr.png"
          alt="Connected Healthcare"
          fill
          className="object-cover"
          priority
        />
        {/* Theme-aware Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/85 via-[var(--background)]/50 to-[var(--background)]/85" />
      </div>

      {/* Content - Center aligned */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
        <motion.div
          className="max-w-3xl text-center"
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
            Network Effect
          </motion.span>

          {/* Headline */}
          <motion.h2
            className="text-[56px] lg:text-[72px] font-bold text-[var(--foreground)] leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Built for India.
            <br />
            <span className="text-transparent bg-gradient-to-r from-[var(--primary-accent)] via-[var(--secondary-accent)] to-[var(--primary-accent)] bg-[length:200%_auto] animate-gradient-slow bg-clip-text drop-shadow-[0_0_15px_var(--primary-accent)]/30">
              Ready for the World.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-[18px] text-[var(--text-muted)] mt-6 mx-auto max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            200+ hospitals. 18 states. 12,000+ doctors.
            One unified healthcare ecosystem.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex gap-4 mt-12 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button className="h-14 px-10 rounded-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] font-semibold text-[15px] hover:scale-105 hover:shadow-[0_0_20px_var(--secondary-accent)]/40 transition-all duration-300">
              Get Started
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}