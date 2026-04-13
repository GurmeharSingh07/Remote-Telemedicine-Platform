"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";

const clinicFeatures = [
  "Up to 5 doctors",
  "10,000 patient records",
  "HEAL AI (Basic)",
  "ABDM Integration",
  "Mobile app access",
  "Email support",
];

const hospitalFeatures = [
  "Up to 50 doctors",
  "Unlimited patient records",
  "HEAL AI (Advanced)",
  "Multi-hospital coordination",
  "Live analytics dashboard",
  "Priority support",
  "Custom integrations",
];

const enterpriseFeatures = [
  "Unlimited doctors",
  "Dedicated infrastructure",
  "HEAL AI (Enterprise + Custom Training)",
  "SLA guarantee 99.9%",
  "Dedicated account manager",
  "On-premise deployment option",
];

function Checkmark({ color = "#A8EDDF" }: { color?: string }) {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill={color} viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PricingCard({
  title,
  price,
  description,
  features,
  isFeatured,
  isDark,
  ctaText,
  ctaType,
  index,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  isDark?: boolean;
  ctaText: string;
  ctaType: "ghost" | "gradient" | "white";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-[24px] p-8 ${
        isFeatured
          ? "bg-white border-2 border-transparent shadow-[0_20px_60px_rgba(168,237,223,0.25)] scale-[1.04] z-10"
          : isDark
          ? "bg-[#1A2332]"
          : "bg-white border border-[rgba(168,237,223,0.4)]"
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Most Popular Badge */}
      {isFeatured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold text-white bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF]">
            Most Popular
          </span>
        </div>
      )}

      {/* Title */}
      <h3
        className={`text-[24px] font-bold font-[family-name:var(--font-heading)] ${
          isDark ? "text-white" : "text-[#1A2332]"
        }`}
      >
        {title}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <span
          className={`text-[40px] font-bold font-[family-name:var(--font-heading)] ${
            isDark ? "text-white" : "text-[#1A2332]"
          }`}
        >
          {price}
        </span>
        <span
          className={`text-[14px] font-[family-name:var(--font-body)] ${
            isDark ? "text-[#8A9BB0]" : "text-[#8A9BB0]"
          }`}
        >
          /month
        </span>
      </div>

      {/* Description */}
      <p
        className={`mt-2 text-[14px] font-[family-name:var(--font-body)] ${
          isDark ? "text-[#8A9BB0]" : "text-[#8A9BB0]"
        }`}
      >
        {description}
      </p>

      {/* Features */}
      <ul className="mt-8 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <Checkmark color={isDark ? "#C9A96E" : "#A8EDDF"} />
            <span
              className={`text-[14px] font-[family-name:var(--font-body)] ${
                isDark ? "text-[#E0E0E0]" : "text-[#1A2332]"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`w-full mt-8 h-[48px] rounded-full font-semibold text-[15px] font-[family-name:var(--font-body)] transition-all duration-300 ${
          ctaType === "gradient"
            ? "bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] text-white hover:shadow-lg hover:-translate-y-0.5"
            : ctaType === "white"
            ? "bg-transparent border border-white text-white hover:bg-white/10"
            : "bg-transparent border border-[#A8EDDF] text-[#1A2332] hover:bg-[#A8EDDF]/10"
        }`}
      >
        {ctaText}
      </button>
    </motion.div>
  );
}

function FloatingBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-[5%] w-32 h-32 rounded-full bg-[#F2C4CE] opacity-[0.07] animate-float-bubble-1" />
      <div className="absolute top-40 right-[10%] w-48 h-48 rounded-full bg-[#A8EDDF] opacity-[0.07] animate-float-bubble-2" />
      <div className="absolute bottom-20 left-[20%] w-28 h-28 rounded-full bg-[#F2C4CE] opacity-[0.07] animate-float-bubble-3" />
      <div className="absolute bottom-40 right-[25%] w-36 h-36 rounded-full bg-[#A8EDDF] opacity-[0.07] animate-float-bubble-1" />
    </div>
  );
}

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isAnnual, setIsAnnual] = useState(false);

  const clinicPrice = isAnnual ? "₹3,999" : "₹4,999";
  const hospitalPrice = isAnnual ? "₹15,999" : "₹19,999";

  return (
    <section className="relative w-full bg-[#F7F9FC] py-[120px] overflow-hidden">
      <FloatingBubbles />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-bold tracking-[0.2em] text-[#A8EDDF] uppercase">
            PRICING
          </span>
        </motion.div>

        <motion.h2
          className="text-[40px] lg:text-[56px] font-bold text-[#1A2332] font-[family-name:var(--font-heading)] text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Simple pricing. Serious healthcare.
        </motion.h2>

        <motion.p
          className="text-[18px] lg:text-[20px] text-[#8A9BB0] font-[family-name:var(--font-body)] text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          No hidden fees. No lock-ins. Cancel anytime.
        </motion.p>

        {/* Toggle */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span
            className={`text-[14px] font-[family-name:var(--font-body)] ${
              !isAnnual ? "text-[#1A2332] font-semibold" : "text-[#8A9BB0]"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-14 h-7 rounded-full bg-[rgba(168,237,223,0.3)] transition-colors duration-300"
          >
            <motion.div
              className="absolute top-1 w-5 h-5 rounded-full bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF]"
              animate={{ left: isAnnual ? "calc(100% - 22px)" : "4px" }}
              transition={{ duration: 0.2 }}
            />
          </button>
          <span
            className={`text-[14px] font-[family-name:var(--font-body)] ${
              isAnnual ? "text-[#1A2332] font-semibold" : "text-[#8A9BB0]"
            }`}
          >
            Annual
          </span>
          <span className="ml-2 px-2 py-0.5 rounded-full text-[11px] font-medium text-white bg-[#C9A96E]">
            Save 20%
          </span>
        </motion.div>

        {/* Pricing Cards */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 mt-16 max-w-5xl mx-auto">
          <div className="flex-1">
            <PricingCard
              title="Clinic"
              price={clinicPrice}
              description="For independent clinics and small practices"
              features={clinicFeatures}
              ctaText="Start Free Trial"
              ctaType="ghost"
              index={0}
            />
          </div>
          <div className="flex-1">
            <PricingCard
              title="Hospital"
              price={hospitalPrice}
              description="For mid-size hospitals and multi-branch clinics"
              features={hospitalFeatures}
              isFeatured
              ctaText="Start Free Trial"
              ctaType="gradient"
              index={1}
            />
          </div>
          <div className="flex-1">
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For hospital chains, government health systems, and large networks"
              features={enterpriseFeatures}
              isDark
              ctaText="Contact Sales"
              ctaType="white"
              index={2}
            />
          </div>
        </div>
      </div>
    </section>
  );
}