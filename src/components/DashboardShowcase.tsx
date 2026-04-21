"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Building2,
  Settings,
  Bell,
  Calendar,
  MapPin,
  Clock,
  Activity,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Patients", active: false },
  { icon: FileText, label: "Records", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Building2, label: "Hospitals", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const statsCards = [
  { label: "Today's Appointments", value: "12", icon: Calendar },
  { label: "Active Patients", value: "847", icon: Users },
  { label: "Pending Records", value: "3", icon: FileText },
  { label: "AI Alerts", value: "2", icon: Activity, highlight: true },
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
    <section className="relative w-full bg-[var(--background)] py-[120px] overflow-hidden border-t border-[var(--border-color)]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hospital-campus.png"
          alt="Dashboard Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--background)] opacity-85" />
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
          <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--primary-accent)] uppercase">
            THE PRODUCT
          </span>
        </motion.div>

        <motion.h2
          className="text-[40px] lg:text-[56px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)] text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          One Dashboard. Complete Clinical Picture.
        </motion.h2>

        <motion.p
          className="text-[18px] lg:text-[20px] text-[var(--text-muted)] font-[family-name:var(--font-body)] text-center mt-4 max-w-xl mx-auto"
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
            <div className="bg-[var(--background-alt)] rounded-t-2xl p-4 flex items-center gap-3 border border-[var(--primary-accent)]/20 border-b-0 backdrop-blur-md">
              {/* Colored Dots */}
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[var(--tertiary)]" />
                <span className="w-3 h-3 rounded-full bg-[var(--gold)]" />
                <span className="w-3 h-3 rounded-full bg-[var(--primary-accent)]" />
              </div>
              {/* URL Bar */}
              <div className="flex-1 bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-4 py-2 text-[13px] text-[var(--text-muted)] font-[family-name:var(--font-body)]">
                app.healnet.in/dashboard
              </div>
            </div>

            {/* Dashboard UI */}
            <div className="bg-[var(--background-alt)] rounded-b-2xl border border-[var(--primary-accent)]/20 overflow-hidden flex min-h-[500px] backdrop-blur-md">
              {/* Left Sidebar */}
              <div className="w-[200px] bg-[var(--background)]/80 p-4 border-r border-[var(--border-color)]">
                {/* Logo */}
                <div className="text-[20px] font-bold font-[family-name:var(--font-heading)] bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent mb-8">
                  HealNet
                </div>

                {/* Nav Items */}
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-[family-name:var(--font-body)] cursor-pointer transition-colors ${
                          item.active
                            ? "bg-[var(--primary-accent)]/20 text-[var(--foreground)] border-l-2 border-[var(--primary-accent)]"
                            : "text-[var(--text-muted)] hover:bg-[var(--primary-accent)]/10 hover:text-[var(--foreground)]"
                        }`}
                      >
                        <Icon size={16} className={item.active ? "text-[var(--primary-accent)]" : ""} />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 z-10">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[18px] font-[family-name:var(--font-body)] text-[var(--foreground)]">
                    Good morning, Dr. Sharma 👋
                  </span>
                  <div className="flex items-center gap-4">
                    <button className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors relative">
                      <Bell size={16} />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--tertiary)] rounded-full" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] text-sm font-bold shadow-[0_0_15px_var(--primary-accent)]/40">
                      DS
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {statsCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className={`rounded-xl p-4 border bg-[var(--background)]/50 backdrop-blur-sm ${
                          stat.highlight ? "border-[var(--secondary-accent)]/50 shadow-[0_0_20px_var(--secondary-accent)]/15" : "border-[var(--border-color)]"
                        }`}
                      >
                        <Icon size={18} className={`mb-2 ${stat.highlight ? "text-[var(--secondary-accent)]" : "text-[var(--primary-accent)]"}`} />
                        <div className="text-[13px] text-[var(--text-muted)] font-[family-name:var(--font-body)] mb-1">
                          {stat.label}
                        </div>
                        <div className="text-[24px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">
                          {stat.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Two Column Layout */}
                <div className="flex gap-6">
                  {/* Patient Timeline - 60% */}
                  <div className="flex-[3]">
                    <h3 className="text-[16px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)] mb-4">
                      Recent Patients
                    </h3>
                    <div className="space-y-3">
                      {patients.map((patient, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-3 rounded-xl bg-[var(--background)]/50 border border-transparent hover:border-[var(--primary-accent)]/30 hover:bg-[var(--primary-accent)]/5 transition-all duration-300 cursor-pointer"
                        >
                          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] text-sm font-bold shadow-[0_0_10px_var(--secondary-accent)]/30">
                            {patient.avatar}
                          </span>
                          <div className="flex-1">
                            <div className="text-[14px] font-medium text-[var(--foreground)] font-[family-name:var(--font-body)]">
                              {patient.name}
                            </div>
                            <div className="text-[12px] text-[var(--text-muted)] font-[family-name:var(--font-body)]">
                              {patient.condition}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[12px] text-[var(--text-muted)] font-[family-name:var(--font-body)]">
                              {patient.lastVisit}
                            </div>
                            <div className="text-[11px] text-[var(--primary-accent)] font-[family-name:var(--font-body)]">
                              {patient.hospital}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Insights - 40% */}
                  <div className="flex-[2]">
                    <h3 className="text-[16px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)] mb-4 flex items-center gap-2">
                      <span className="text-[var(--primary-accent)]">✨</span> AI Insights
                    </h3>
                    <div className="bg-[var(--background)]/50 rounded-xl border border-[var(--border-color)] border-l-4 border-l-[var(--secondary-accent)] p-4 space-y-4 shadow-[inset_0_0_20px_var(--primary-accent)]/5">
                      {aiInsights.map((insight, i) => (
                        <div
                          key={i}
                          className="text-[13px] text-[var(--foreground)] font-[family-name:var(--font-body)] leading-relaxed relative pl-3"
                        >
                          <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] shadow-[0_0_5px_var(--primary-accent)]" />
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
              stroke="var(--border-color)"
              strokeWidth="2"
            />
            {/* Glowing Dot Animation */}
            <motion.circle
              cx="0"
              cy="40"
              r="6"
              fill="var(--primary-accent)"
              style={{ filter: "drop-shadow(0 0 8px var(--primary-accent))" }}
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