"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

interface CityNode {
  name: string;
  x: number;
  y: number;
  hospitals: string;
  doctors: string;
  records: string;
}

const cityNodes: CityNode[] = [
  { name: "Delhi", x: 30, y: 35, hospitals: "24", doctors: "1,200", records: "180K" },
  { name: "Mumbai", x: 22, y: 58, hospitals: "32", doctors: "2,100", records: "250K" },
  { name: "Bangalore", x: 35, y: 78, hospitals: "28", doctors: "1,800", records: "210K" },
  { name: "Chennai", x: 40, y: 82, hospitals: "22", doctors: "1,500", records: "175K" },
  { name: "Hyderabad", x: 38, y: 68, hospitals: "18", doctors: "950", records: "120K" },
  { name: "Kolkata", x: 48, y: 42, hospitals: "20", doctors: "1,100", records: "140K" },
  { name: "Pune", x: 28, y: 62, hospitals: "15", doctors: "720", records: "85K" },
  { name: "Ahmedabad", x: 18, y: 48, hospitals: "12", doctors: "580", records: "65K" },
];

const connectionLines = [
  { from: "Delhi", to: "Mumbai", path: "M30,35 L22,58" },
  { from: "Delhi", to: "Kolkata", path: "M30,35 L48,42" },
  { from: "Mumbai", to: "Pune", path: "M22,58 L28,62" },
  { from: "Mumbai", to: "Bangalore", path: "M22,58 L35,78" },
  { from: "Bangalore", to: "Chennai", path: "M35,78 L40,82" },
  { from: "Bangalore", to: "Hyderabad", path: "M35,78 L38,68" },
  { from: "Hyderabad", to: "Mumbai", path: "M38,68 L22,58" },
];

const stats = [
  { value: "18", label: "States" },
  { value: "200+", label: "Hospitals" },
  { value: "Growing Daily", label: "Network" },
];

function CityNodeMarker({ city, onHover }: { city: CityNode; onHover: (city: CityNode | null) => void }) {
  return (
    <div
      className="absolute cursor-pointer"
      style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -50%)" }}
      onMouseEnter={() => onHover(city)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Outer Ring */}
      <motion.div
        className="w-6 h-6 rounded-full border-2 border-[#A8EDDF] opacity-20"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Inner Dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#A8EDDF]" />
    </div>
  );
}

function HoverCard({ city }: { city: CityNode }) {
  return (
    <motion.div
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 glass rounded-xl px-4 py-3 min-w-[160px]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div className="text-[14px] font-bold text-[#1A2332] font-[family-name:var(--font-heading)] mb-2">
        {city.name}
      </div>
      <div className="space-y-1">
        <div className="text-[12px] text-[#8A9BB0] font-[family-name:var(--font-body)]">
          <span className="text-[#1A2332] font-medium">{city.hospitals}</span> hospitals
        </div>
        <div className="text-[12px] text-[#8A9BB0] font-[family-name:var(--font-body)]">
          <span className="text-[#1A2332] font-medium">{city.doctors}</span> doctors
        </div>
        <div className="text-[12px] text-[#8A9BB0] font-[family-name:var(--font-body)]">
          <span className="text-[#1A2332] font-medium">{city.records}</span> records
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedConnectionLine({ path }: { path: string }) {
  return (
    <motion.path
      d={path}
      fill="none"
      stroke="#A8EDDF"
      strokeWidth="1"
      strokeOpacity={0.3}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <animate
        attributeName="stroke-dasharray"
        values="0,1000;200,1000;200,1000"
        dur="3s"
        repeatCount="indefinite"
      />
    </motion.path>
  );
}

export default function HospitalNetworkMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null);

  return (
    <section className="relative w-full bg-[#FFFFFF] py-[120px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hospital-campus.png"
          alt="Network Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#FFFFFF]/90" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[40px] lg:text-[56px] font-extrabold text-[#1A2332] font-[family-name:var(--font-heading)] tracking-tight">
            Built for India. Ready for Bharat.
          </h2>
        </motion.div>

        <motion.p
          className="text-[18px] lg:text-[20px] text-[#1A2332]/70 font-semibold font-[family-name:var(--font-body)] text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          HealNet&apos;s network spans <span className="text-[#A8EDDF]">200+ hospitals</span> across <span className="text-[#A8EDDF]">18 states</span> and growing.
        </motion.p>

        {/* India Map */}
        <div className="relative w-[60%] mx-auto aspect-[1.4/1]">
          {/* SVG Map */}
          <svg
            viewBox="0 0 100 80"
            className="w-full h-full"
            style={{ filter: "drop-shadow(0 8px 30px rgba(168,237,223,0.4))" }}
          >
            {/* Simplified India Map Path */}
            <path
              d="M25,10 L35,8 L45,10 L55,12 L65,15 L75,20 L80,30 L82,40 L80,50 L75,60 L65,65 L55,70 L45,72 L35,70 L25,65 L18,55 L15,45 L18,35 L22,25 Z"
              fill="#E8F5F0"
              stroke="#A8EDDF"
              strokeWidth="1.5"
            />

            {/* Connection Lines */}
            {connectionLines.map((line, i) => {
              const fromCity = cityNodes.find((c) => c.name === line.from);
              const toCity = cityNodes.find((c) => c.name === line.to);
              if (!fromCity || !toCity) return null;
              const path = `M${fromCity.x},${fromCity.y} L${toCity.x},${toCity.y}`;
              return (
                <g key={i}>
                  <path d={path} fill="none" stroke="#F2C4CE" strokeWidth="1.5" strokeOpacity={0.7} />
                  <motion.circle r="2" fill="#A8EDDF">
                    <animateMotion
                      dur={`${2 + i * 0.3}s`}
                      repeatCount="indefinite"
                      path={path}
                    />
                  </motion.circle>
                </g>
              );
            })}
          </svg>

          {/* City Nodes */}
          {cityNodes.map((city) => (
            <div
              key={city.name}
              className="absolute"
              style={{ left: `${city.x}%`, top: `${city.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                className="w-8 h-8 rounded-full border-3 border-[#A8EDDF] bg-[#A8EDDF]/20 cursor-pointer"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#A8EDDF] cursor-pointer" />

              {/* Hover Card */}
              {hoveredCity?.name === city.name && <HoverCard city={city} />}
            </div>
          ))}
        </div>

        {/* Stat Callouts */}
        <motion.div
          className="flex items-center justify-center gap-16 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-[48px] lg:text-[56px] font-extrabold font-[family-name:var(--font-heading)] text-[#1A2332]">
                {stat.value}
              </div>
              <div className="text-[16px] font-semibold text-[#A8EDDF] font-[family-name:var(--font-body)] mt-1 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}