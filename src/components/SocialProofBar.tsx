"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: "200", suffix: "+", label: "Hospitals Connected" },
  { value: "1.2", suffix: "M+", label: "Patient Records" },
  { value: "12,000", suffix: "+", label: "Doctors Onboard" },
  { value: "98", suffix: "%", label: "Uptime SLA" },
];

const hospitalNames = [
  "Apollo Hospitals",
  "Fortis Healthcare",
  "Max Healthcare",
  "Manipal Hospitals",
  "Narayana Health",
  "Medanta Medicity",
  "CK Birla Hospital",
  "Columbia Asia",
  "Aster DM Healthcare",
  "HCG Oncology",
  "Saibaba Nursing Home",
  "Vijaya Hospital",
  "G Kuppuswamy Naidu",
  "MIOT Hospitals",
  "Sankara Nethralaya",
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: string;
  suffix: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const numericPart = parseFloat(value.replace(/,/g, ""));
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = numericPart * easedProgress;

        if (value.includes(".")) {
          setDisplayValue(currentValue.toFixed(1));
        } else {
          setDisplayValue(Math.floor(currentValue).toLocaleString());
        }

        if (currentStep >= steps) {
          clearInterval(timer);
          setDisplayValue(value);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function SocialProofBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="w-full bg-[var(--background-alt)]/50 backdrop-blur-md border-y border-[var(--primary-accent)]/10"
    >
      <div className="h-[96px] flex items-center justify-center gap-8 lg:gap-16 px-6">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex items-center gap-8 lg:gap-16">
            <div className="flex flex-col items-center text-center">
              <motion.span
                className="text-[28px] font-bold font-[family-name:var(--font-heading)] bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent drop-shadow-[0_0_10px_var(--primary-accent)]/30"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </motion.span>
              <motion.span
                className="text-[13px] text-[var(--text-muted)] font-[family-name:var(--font-body)] mt-1 whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              >
                {stat.label}
              </motion.span>
            </div>
            {/* Vertical Divider */}
            {index < stats.length - 1 && (
              <div className="w-px h-8 bg-[var(--primary-accent)]/20 hidden sm:block" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Marquee() {
  const duplicatedNames = [...hospitalNames, ...hospitalNames, ...hospitalNames];

  return (
    <div className="w-full bg-[var(--background)] pb-4 pt-2">
      <div className="relative overflow-hidden mx-auto max-w-4xl">
        {/* Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        {/* Marquee Container */}
        <div className="marquee-container">
          {duplicatedNames.map((name, index) => (
            <span
              key={index}
              className="text-[13px] text-[var(--text-muted)] font-[family-name:var(--font-body)] inline-flex items-center gap-4 px-4"
            >
              {name}
              <span className="w-1 h-1 rounded-full bg-[var(--primary-accent)] flex-shrink-0 shadow-[0_0_5px_var(--primary-accent)]/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SocialProofWithMarquee() {
  return (
    <>
      <SocialProofBar />
      <Marquee />
    </>
  );
}