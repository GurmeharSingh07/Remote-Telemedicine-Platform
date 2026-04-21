"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: "🏥",
    title: "Unified Patient Records",
    description: "One record, accessible across every connected hospital in real time.",
  },
  {
    icon: "🤖",
    title: "HEAL AI Assistant",
    description:
      "Real-time clinical intelligence, diagnostic support, and smart suggestions.",
  },
  {
    icon: "🔒",
    title: "ABDM Compliant",
    description:
      "Built natively on India's National Health Stack and Ayushman Bharat framework.",
  },
  {
    icon: "📊",
    title: "Live Analytics Dashboard",
    description:
      "Hospital-wide clinical and operational insights, updated in real time.",
  },
  {
    icon: "🔗",
    title: "Multi-Hospital Coordination",
    description:
      "Seamless patient referrals, record transfers, and cross-hospital visibility.",
  },
  {
    icon: "📱",
    title: "Doctor & Patient Apps",
    description:
      "Native mobile experience for every stakeholder in the care journey.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`group relative glass rounded-[24px] p-8 hover:-translate-y-2 hover:shadow-[0_20px_40px_var(--border-color)] hover:border-[var(--primary-accent)]/40 transition-all duration-300`}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      {/* Icon Circle */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-2xl mb-6 shadow-[0_0_15px_var(--secondary-accent)]/30">
        {feature.icon}
      </div>

      {/* Title */}
      <h3 className="text-[20px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)] mb-3">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-[15px] text-[var(--text-muted)] font-[family-name:var(--font-body)] leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

function FloatingBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
  {/* Float bubbles rendered in globals.css now to stay consistent */}
      {/* Bubble 1 - Top Left */}
      <div className="absolute top-20 left-[10%] w-40 h-40 rounded-full bg-[var(--primary-accent)] opacity-[0.08] animate-float-bubble-1 filter blur-[60px]" />
      {/* Bubble 2 - Middle Right */}
      <div className="absolute top-40 right-[15%] w-56 h-56 rounded-full bg-[var(--secondary-accent)] opacity-[0.08] animate-float-bubble-2 filter blur-[60px]" />
      {/* Bubble 3 - Bottom Left */}
      <div className="absolute bottom-20 left-[25%] w-32 h-32 rounded-full bg-[var(--primary-accent)] opacity-[0.08] animate-float-bubble-3 filter blur-[60px]" />
    </div>
  );
}

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full bg-[var(--background)] py-[120px] overflow-hidden border-t border-[var(--border-color)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hospital-campus.png"
          alt="Features Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--background)] opacity-85" />
      </div>
      <FloatingBubbles />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Label */}
        <motion.div
          ref={ref}
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--primary-accent)] uppercase">
            THE PLATFORM
          </span>
        </motion.div>

        {/* Section Headline */}
        <motion.h2
          className="text-[40px] lg:text-[56px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)] text-center max-w-[640px] mx-auto leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Everything your hospital needs. Nothing it doesn&apos;t.
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          className="text-[18px] lg:text-[20px] text-[var(--text-muted)] font-[family-name:var(--font-body)] text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Built for India&apos;s complexity. Designed for clinical simplicity.
        </motion.p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}