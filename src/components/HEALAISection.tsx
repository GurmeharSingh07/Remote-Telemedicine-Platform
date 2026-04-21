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
      className="absolute -top-4 left-4 rounded-2xl px-5 py-3 bg-[var(--background)]/60 backdrop-blur-md border border-[var(--border-color)] shadow-[0_0_20px_var(--border-color)]"
      variants={cardFloat1}
      animate="float"
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)] shadow-[0_0_8px_var(--primary-accent)]" />
        <span className="text-[13px] font-[family-name:var(--font-body)] text-[var(--foreground)]">
          O2 Saturation — <strong className="font-bold">98%</strong>
        </span>
      </div>
    </motion.div>
  );
}

function VitalsCard2() {
  return (
    <motion.div
      className="absolute bottom-8 right-4 rounded-2xl px-5 py-3 bg-[var(--background)]/60 backdrop-blur-md border border-[var(--secondary-accent)]/30 shadow-[0_0_20px_var(--secondary-accent)]/20"
      variants={cardFloat2}
      animate="float"
    >
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-[family-name:var(--font-body)] text-[var(--foreground)]">
          Heart Rate — <strong className="font-bold">72 BPM</strong>
        </span>
        <svg width="40" height="16" viewBox="0 0 40 16" className="opacity-80 drop-shadow-[0_0_5px_var(--secondary-accent)]">
          <path
            d="M0 8 L5 8 L7 3 L10 13 L13 6 L16 10 L19 8 L22 8 L25 4 L28 12 L31 7 L34 11 L37 8 L40 8"
            fill="none"
            stroke="var(--secondary-accent)"
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
      className="absolute top-1/2 -translate-y-1/2 right-8 rounded-2xl px-5 py-3 bg-[var(--background)]/60 backdrop-blur-md border border-[var(--gold)]/30 shadow-[0_0_20px_var(--gold)]/10"
      variants={cardFloat3}
      animate="float"
    >
      <div className="flex items-center gap-2">
        <span className="text-[13px] font-[family-name:var(--font-body)] text-[var(--foreground)]">
          AI Scan Complete
        </span>
        <span className="text-[var(--gold)] drop-shadow-[0_0_5px_var(--gold)]">✓</span>
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
          className="w-0.5 bg-[var(--primary-accent)] rounded-full shadow-[0_0_8px_var(--primary-accent)]"
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
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background-alt)] via-[var(--background)]/95 to-[var(--background)]/90" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row">
        {/* LEFT COLUMN - Visual */}
        <div className="relative w-full lg:w-1/2 bg-transparent py-[120px] flex items-center justify-center overflow-hidden">
          {/* Radial Glow Behind */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary-accent),transparent_60%)] opacity-10 pointer-events-none" />

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
        <div className="relative w-full lg:w-1/2 bg-transparent py-[120px] px-6 lg:px-16">
          <div className="max-w-lg mx-auto lg:mx-0">
            {/* Label */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--primary-accent)] uppercase drop-shadow-[0_0_8px_var(--primary-accent)]/40">
                MEET HEAL
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="text-[40px] lg:text-[56px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)] leading-tight mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              AI That Thinks Like a Clinician.
            </motion.h2>

            {/* Subtext */}
            <motion.p
              className="text-[16px] lg:text-[18px] text-[var(--text-muted)] font-[family-name:var(--font-body)] leading-[1.8] mt-6"
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
                  <span className="text-[var(--primary-accent)] text-lg mt-0.5 drop-shadow-[0_0_5px_var(--primary-accent)]">✓</span>
                  <span className="text-[15px] text-[var(--foreground)] font-[family-name:var(--font-body)]">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Chat Preview UI */}
            <motion.div
              className="mt-10 bg-[var(--background-alt)]/80 backdrop-blur-md rounded-2xl p-5 border border-[var(--border-color)] shadow-[0_0_30px_var(--border-color)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Doctor Message */}
              <div className="flex justify-end mb-4">
                <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] shadow-sm">
                  <p className="text-[13px] text-[var(--foreground)] font-[family-name:var(--font-body)]">
                    What are the risk factors for this patient&apos;s recent BP
                    spike?
                  </p>
                </div>
              </div>

              {/* HEAL Message */}
              <div className="flex justify-start mb-3">
                <div className="bg-[var(--secondary-accent)]/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border-l-2 border-[var(--secondary-accent)] shadow-[inset_0_0_15px_var(--secondary-accent)]/10">
                  <p className="text-[13px] text-[var(--foreground)] font-[family-name:var(--font-body)]">
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
                  className="flex-1 h-10 px-4 rounded-full bg-[var(--background)] border border-[var(--border-color)] text-[14px] font-[family-name:var(--font-body)] text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary-accent)] focus:shadow-[0_0_15px_var(--primary-accent)]/20 transition-all"
                />
                <button className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] text-lg hover:shadow-[0_0_15px_var(--secondary-accent)]/50 transition-all hover:-translate-y-0.5">
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