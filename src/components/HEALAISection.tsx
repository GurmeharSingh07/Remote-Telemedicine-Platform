"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const floatVariants: Variants = {
  float: {
    y: [-10, 0, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

const cardFloat1: Variants = {
  float: {
    y: [-6, 4, -6],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0,
    },
  },
};

const cardFloat2: Variants = {
  float: {
    y: [-8, 2, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 0.5,
    },
  },
};

const cardFloat3: Variants = {
  float: {
    y: [-5, 5, -5],
    transition: {
      duration: 3.8,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 1,
    },
  },
};

const features = [
  "Symptom mapping and pattern recognition",
  "Diagnostic anomaly detection",
  "Prescription cross-reference alerts",
  "Predictive patient risk scoring",
  "Natural language clinical queries",
];

function VitalsCard1() {
  return (
    <motion.div
      className="absolute -top-4 left-4 glass rounded-2xl px-5 py-3"
      variants={cardFloat1}
      animate="float"
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#A8EDDF]" />
        <span className="text-[13px] font-[family-name:var(--font-body)] text-[#1A2332]">
          O2 Saturation — <strong>98%</strong>
        </span>
      </div>
    </motion.div>
  );
}

function VitalsCard2() {
  return (
    <motion.div
      className="absolute bottom-8 right-4 glass rounded-2xl px-5 py-3"
      variants={cardFloat2}
      animate="float"
    >
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-[family-name:var(--font-body)] text-[#1A2332]">
          Heart Rate — <strong>72 BPM</strong>
        </span>
        <svg width="40" height="16" viewBox="0 0 40 16" className="opacity-60">
          <path
            d="M0 8 L5 8 L7 3 L10 13 L13 6 L16 10 L19 8 L22 8 L25 4 L28 12 L31 7 L34 11 L37 8 L40 8"
            fill="none"
            stroke="#F2C4CE"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </motion.div>
  );
}

function VitalsCard3() {
  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 right-8 glass rounded-2xl px-5 py-3"
      variants={cardFloat3}
      animate="float"
    >
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-[family-name:var(--font-body)] text-[#1A2332]">
          AI Scan Complete
        </span>
        <span className="text-[#C9A96E]">✓</span>
      </div>
    </motion.div>
  );
}

function Soundwave() {
  return (
    <div className="flex items-center gap-0.5 h-4 mt-2">
      {[0.3, 0.6, 1, 0.7, 0.4].map((height, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-[#A8EDDF] rounded-full"
          animate={{
            height: [`${height * 12}px`, `${height * 16}px`, `${height * 12}px`],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

export default function HEALAISection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/Whisk_7242f784bccf2a691af4ea68536ae0c1dr.png"
          alt="AI Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/85" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* LEFT COLUMN - Visual */}
        <div className="relative w-full lg:w-1/2 bg-[#F7F9FC] py-[120px] flex items-center justify-center overflow-hidden">
          {/* Radial Glow Behind */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,196,206,0.2),transparent_60%)]] pointer-events-none" />

          {/* 3D Lung Illustration with Float */}
          <motion.div
            className="relative z-10 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
            variants={floatVariants}
            animate="float"
          >
            <Image
              src="/images/lungs-visualization.png"
              alt="Lungs Visualization"
              fill
              className="object-contain"
              priority
            />

            {/* Floating Vitals Cards */}
            <VitalsCard1 />
            <VitalsCard2 />
            <VitalsCard3 />
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Content */}
        <div className="relative w-full lg:w-1/2 bg-[#FFFFFF] py-[120px] px-6 lg:px-16">
          <div className="max-w-lg mx-auto lg:mx-0">
            {/* Label */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#A8EDDF] uppercase">
                MEET HEAL
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="text-[40px] lg:text-[56px] font-bold text-[#1A2332] font-[family-name:var(--font-heading)] leading-tight mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              AI That Thinks Like a Clinician.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              className="text-[16px] lg:text-[18px] text-[#8A9BB0] font-[family-name:var(--font-body)] leading-[1.8] mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              HEAL is HealNet&apos;s clinical AI — trained on anonymized Indian
              patient data to support doctors with real-time diagnostic
              intelligence.
            </motion.p>

            {/* Feature List */}
            <motion.div
              className="mt-8 space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <span className="text-[#A8EDDF] text-lg mt-0.5">✓</span>
                  <span className="text-[15px] text-[#1A2332] font-[family-name:var(--font-body)]">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Chat Preview UI */}
            <motion.div
              className="mt-10 glass rounded-2xl p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Doctor Message */}
              <div className="flex justify-end mb-4">
                <div className="bg-[#F7F9FC] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]">
                  <p className="text-[13px] text-[#1A2332] font-[family-name:var(--font-body)]">
                    What are the risk factors for this patient&apos;s recent BP
                    spike?
                  </p>
                </div>
              </div>

              {/* HEAL Message */}
              <div className="flex justify-start mb-3">
                <div className="bg-[#F7F9FC] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border-l-2 border-[#A8EDDF]">
                  <p className="text-[13px] text-[#1A2332] font-[family-name:var(--font-body)]">
                    Based on 3 prior visits and current vitals, elevated sodium
                    intake and stress markers suggest hypertensive episode.
                    Recommend 48hr monitoring and dietary review.
                  </p>
                  <Soundwave />
                </div>
              </div>

              {/* Input Bar */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Ask HEAL anything..."
                  className="flex-1 h-10 px-4 rounded-full bg-white border border-[rgba(168,237,223,0.4)] text-[14px] font-[family-name:var(--font-body)] text-[#1A2332] placeholder-[#8A9BB0] focus:outline-none focus:border-[#A8EDDF]"
                />
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-white text-lg">
                  →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}