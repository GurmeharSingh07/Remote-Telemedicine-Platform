"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../ThemeToggle";
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Pill,
  MessageSquare,
  Bell,
  Building2,
  FlaskConical,
  CreditCard,
  TestTube,
  MapPin,
  Menu,
  X,
  Home,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "patient" | "doctor" | "admin";
  activeItem?: string;
  onActiveItemChange?: (item: string) => void;
}

const menuItems = {
  patient: [
    { icon: LayoutDashboard, label: "Dashboard", href: "dashboard" },
    { icon: Calendar, label: "Book Appointment", href: "book-appointment" },
    { icon: Calendar, label: "My Appointments", href: "appointments" },
    { icon: FileText, label: "Medical Records", href: "records" },
    { icon: FlaskConical, label: "Test Results", href: "tests" },
    { icon: Pill, label: "Prescriptions", href: "prescriptions" },
    { icon: MessageSquare, label: "Messages", href: "messages" },
    { icon: MapPin, label: "Find Doctors", href: "nearby" },
  ],
  doctor: [
    { icon: LayoutDashboard, label: "Dashboard", href: "dashboard" },
    { icon: Calendar, label: "Appointments", href: "appointments" },
    { icon: Users, label: "Patient Records", href: "patients" },
    { icon: FlaskConical, label: "Test Management", href: "tests" },
    { icon: Pill, label: "Prescriptions", href: "prescriptions" },
    { icon: MessageSquare, label: "Chat with Patients", href: "chat" },
    { icon: BarChart3, label: "My Schedule", href: "schedule" },
    { icon: Settings, label: "Profile", href: "profile" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", href: "dashboard" },
    { icon: Users, label: "User Management", href: "users" },
    { icon: Calendar, label: "Appointments", href: "appointments" },
    { icon: FileText, label: "Medical Records", href: "records" },
    { icon: FlaskConical, label: "Lab Management", href: "labs" },
    { icon: Pill, label: "Pharmacy", href: "pharmacy" },
    { icon: CreditCard, label: "Finance", href: "finance" },
    { icon: BarChart3, label: "Analytics", href: "analytics" },
    { icon: Building2, label: "Hospitals", href: "hospitals" },
    { icon: Settings, label: "Settings", href: "settings" },
  ],
};

export default function DashboardLayout({ children, role, activeItem: externalActiveItem, onActiveItemChange }: DashboardLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [internalActiveItem, setInternalActiveItem] = useState("dashboard");
  const activeItem = externalActiveItem !== undefined ? externalActiveItem : internalActiveItem;
  const setActiveItem = (item: string) => {
    if (onActiveItemChange) {
      onActiveItemChange(item);
    } else {
      setInternalActiveItem(item);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  const handleNavClick = (href: string) => {
    setActiveItem(href);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const roleColors = {
    patient: "from-[#F2C4CE] to-[#A8EDDF]",
    doctor: "from-[#A8EDDF] to-[#F2C4CE]",
    admin: "from-[#C9A96E] to-[#D4A89A]",
  };

  const roleNames = {
    patient: "Patient Dashboard",
    doctor: "Doctor Dashboard",
    admin: "Admin Dashboard",
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background)] flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-full bg-[var(--background-alt)] border-r border-[var(--border-color)] shadow-[var(--shadow-default)] transition-all duration-300 z-50 flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-[var(--border-color)]">
          <div className="text-xl font-bold bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent">
            HealNet
          </div>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-1 mt-2 flex-1 overflow-y-auto">
          {menuItems[role].map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${roleColors[role]} text-[#0a0a0a] font-medium shadow-[0_4px_12px_rgba(168,237,223,0.3)]`
                    : "text-[var(--text-muted)] hover:bg-[var(--primary-accent)]/10 hover:text-[var(--foreground)]"
                }`}
              >
                <Icon size={20} className={isActive ? "text-[#0a0a0a] flex-shrink-0" : "flex-shrink-0"} />
                {sidebarOpen && <span className="text-[14px] whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[var(--background-alt)] border-2 border-[var(--primary-accent)] shadow-md flex items-center justify-center text-[var(--primary-accent)] hover:text-[var(--foreground)] transition-colors"
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Logout */}
        <div className="p-3 border-t border-[var(--border-color)]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-[14px]">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-72 bg-[var(--background-alt)] border-r border-[var(--border-color)] shadow-[var(--shadow-elevated)] z-50 flex flex-col"
          >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border-color)]">
              <div className="text-xl font-bold bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] bg-clip-text text-transparent">
                HealNet
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 rounded-lg bg-[var(--background)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Menu */}
            <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
              {menuItems[role].map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                      isActive
                        ? `bg-gradient-to-r ${roleColors[role]} text-[#0a0a0a] font-medium`
                        : "text-[var(--text-muted)] hover:bg-[var(--primary-accent)]/10 hover:text-[var(--foreground)]"
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-[#0a0a0a]" : ""} />
                    <span className="text-[15px]">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-[var(--border-color)]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-400 transition-all"
              >
                <LogOut size={20} />
                <span className="text-[15px]">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen && !isMobile ? "lg:ml-64" : "lg:ml-20"}`}>
        {/* Header */}
        <header className="h-16 bg-[var(--background-alt)] border-b border-[var(--border-color)] shadow-[var(--shadow-default)] flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-lg bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)]"
            >
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-base md:text-lg font-bold text-[var(--foreground)]">{roleNames[role]}</h2>
              <p className="text-[11px] md:text-[12px] text-[var(--text-muted)] hidden sm:block">Welcome back!</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors relative">
              <Bell size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--tertiary)] rounded-full" />
            </button>
            <ThemeToggle />
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold text-sm shadow-[0_4px_12px_rgba(13,115,119,0.3)]">
              {role === "patient" ? "RS" : role === "doctor" ? "PM" : "AD"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6 bg-[var(--background)] min-h-[calc(100vh-64px)]">{children}</div>
      </main>
    </div>
  );
}