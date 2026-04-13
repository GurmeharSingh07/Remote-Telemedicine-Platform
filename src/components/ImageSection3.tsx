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
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/85 via-[#0a0a0a]/50 to-[#0a0a0a]/85" />
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
            className="inline-block text-[12px] font-semibold tracking-[0.3em] text-[#A8EDDF] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Network Effect
          </motion.span>

          {/* Headline */}
          <motion.h2
            className="text-[56px] lg:text-[72px] font-bold text-white leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Built for India.
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#F2C4CE] via-[#A8EDDF] to-[#F2C4CE] bg-clip-text">
              Ready for the World.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-[18px] text-[#8A9BB0] mt-6 mx-auto max-w-lg leading-relaxed"
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
            <button className="h-14 px-10 rounded-full bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] text-[#0a0a0a] font-semibold text-[15px] hover:scale-105 transition-transform">
              Get Started
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}