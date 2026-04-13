"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const navItems = [
  { icon: "📊", label: "Dashboard", active: true },
  { icon: "👥", label: "Patients", active: false },
  { icon: "📁", label: "Records", active: false },
  { icon: "📈", label: "Analytics", active: false },
  { icon: "🏥", label: "Hospitals", active: false },
  { icon: "⚙️", label: "Settings", active: false },
];

const statsCards = [
  { label: "Today's Appointments", value: "12", icon: "📅" },
  { label: "Active Patients", value: "847", icon: "👥" },
  { label: "Pending Records", value: "3", icon: "📋" },
  { label: "AI Alerts", value: "2", icon: "🤖", highlight: true },
];

const patients = [
  {
    name: "Rahul Sharma",
    condition: "Hypertension",
    lastVisit: "Today, 9:30 AM",
    hospital: "Apollo Chennai",
    avatar: "RS",
  },
  {
    name: "Priya Menon",
    condition: "Diabetes Type 2",
    lastVisit: "Yesterday",
    hospital: "Fortis Mumbai",
    avatar: "PM",
  },
  {
    name: "Arun Patel",
    condition: "Post-Surgery Recovery",
    lastVisit: "2 days ago",
    hospital: "Max Delhi",
    avatar: "AP",
  },
  {
    name: "Sunita Devi",
    condition: "Cardiac Checkup",
    lastVisit: "3 days ago",
    hospital: "Medanta Gurgaon",
    avatar: "SD",
  },
];

const aiInsights = [
  "Patient Rahul Sharma - BP trending up, recommend medication review",
  "3 patients due for follow-up this week",
  "Lab results pending for Priya Menon - review required",
];

export default function DashboardShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const rotateVariants: Variants = {
    hidden: { rotateX: 12, opacity: 0 },
    visible: {
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative w-full bg-[#F7F9FC] py-[120px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hospital-campus.png"
          alt="Dashboard Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#F7F9FC]/85" />
      </div>

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
            THE PRODUCT
          </span>
        </motion.div>

        <motion.h2
          className="text-[40px] lg:text-[56px] font-bold text-[#1A2332] font-[family-name:var(--font-heading)] text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          One Dashboard. Complete Clinical Picture.
        </motion.h2>

        <motion.p
          className="text-[18px] lg:text-[20px] text-[#8A9BB0] font-[family-name:var(--font-body)] text-center mt-4 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Doctors and hospital admins get a unified view of every patient,
          every visit, every record.
        </motion.p>

        {/* Browser Mockup */}
        <motion.div
          className="relative w-[85%] mx-auto mt-16 perspective-container"
          variants={rotateVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: "1200px" }}
        >
          <div className="relative rotate-x-4 origin-top">
            {/* Browser Chrome */}
            <div className="bg-white rounded-t-2xl p-4 flex items-center gap-3 border border-[rgba(168,237,223,0.3)] border-b-0">
              {/* Colored Dots */}
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              {/* URL Bar */}
              <div className="flex-1 bg-[#F7F9FC] rounded-lg px-4 py-2 text-[13px] text-[#8A9BB0] font-[family-name:var(--font-body)]">
                app.healnet.in/dashboard
              </div>
            </div>

            {/* Dashboard UI */}
            <div className="bg-white rounded-b-2xl border border-[rgba(168,237,223,0.3)] overflow-hidden flex min-h-[500px]">
              {/* Left Sidebar */}
              <div className="w-[200px] bg-[#F7F9FC] p-4 border-r border-[rgba(168,237,223,0.3)]">
                {/* Logo */}
                <div className="text-[20px] font-bold font-[family-name:var(--font-heading)] bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] bg-clip-text text-transparent mb-8">
                  HealNet
                </div>

                {/* Nav Items */}
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-[family-name:var(--font-body)] cursor-pointer transition-colors ${
                        item.active
                          ? "bg-[#F2C4CE]/20 text-[#1A2332] border-l-2 border-[#A8EDDF]"
                          : "text-[#8A9BB0] hover:bg-[#A8EDDF]/10"
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[18px] font-[family-name:var(--font-body)] text-[#1A2332]">
                    Good morning, Dr. Sharma 👋
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-[#F7F9FC] flex items-center justify-center text-[#8A9BB0]">
                      🔔
                    </span>
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-white text-sm font-bold">
                      DS
                    </span>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {statsCards.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`glass rounded-xl p-4 ${
                        stat.highlight ? "bg-[#F2C4CE]/20" : ""
                      }`}
                    >
                      <div className="text-[13px] text-[#8A9BB0] font-[family-name:var(--font-body)] mb-1">
                        {stat.label}
                      </div>
                      <div className="text-[24px] font-bold text-[#1A2332] font-[family-name:var(--font-heading)]">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Two Column Layout */}
                <div className="flex gap-6">
                  {/* Patient Timeline - 60% */}
                  <div className="flex-[3]">
                    <h3 className="text-[16px] font-bold text-[#1A2332] font-[family-name:var(--font-heading)] mb-4">
                      Recent Patients
                    </h3>
                    <div className="space-y-3">
                      {patients.map((patient, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-3 rounded-xl bg-[#F7F9FC] hover:bg-[#A8EDDF]/10 transition-colors cursor-pointer"
                        >
                          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-white text-sm font-bold">
                            {patient.avatar}
                          </span>
                          <div className="flex-1">
                            <div className="text-[14px] font-medium text-[#1A2332] font-[family-name:var(--font-body)]">
                              {patient.name}
                            </div>
                            <div className="text-[12px] text-[#8A9BB0] font-[family-name:var(--font-body)]">
                              {patient.condition}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[12px] text-[#8A9BB0] font-[family-name:var(--font-body)]">
                              {patient.lastVisit}
                            </div>
                            <div className="text-[11px] text-[#A8EDDF] font-[family-name:var(--font-body)]">
                              {patient.hospital}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Insights - 40% */}
                  <div className="flex-[2]">
                    <h3 className="text-[16px] font-bold text-[#1A2332] font-[family-name:var(--font-heading)] mb-4">
                      AI Insights
                    </h3>
                    <div className="bg-[#F7F9FC] rounded-xl border-l-4 border-[#A8EDDF] p-4 space-y-4">
                      {aiInsights.map((insight, i) => (
                        <div
                          key={i}
                          className="text-[13px] text-[#1A2332] font-[family-name:var(--font-body)] leading-relaxed"
                        >
                          {insight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animated Data Stream */}
        <div className="mt-20 relative">
          <svg
            className="w-full h-20"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
          >
            {/* Main Line */}
            <path
              d="M0 40 L200 40 L250 20 L450 60 L700 20 L950 60 L1100 40 L1200 40"
              fill="none"
              stroke="rgba(168,237,223,0.3)"
              strokeWidth="2"
            />
            {/* Glowing Dot Animation */}
            <motion.circle
              cx="0"
              cy="40"
              r="6"
              fill="#A8EDDF"
              animate={{
                cx: [0, 200, 250, 450, 700, 950, 1100, 1200],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="1s"
                repeatCount="indefinite"
              />
            </motion.circle>
          </svg>

          {/* Hospital Icons */}
          <div className="absolute top-8 left-0 right-0 flex justify-between px-8 max-w-4xl mx-auto">
            {["🏥", "🏩", "🏨", "🏥", "🏩"].map((icon, i) => (
              <motion.div
                key={i}
                className="text-2xl opacity-40"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}