"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "patient" | "doctor" | "admin";
}

const menuItems = {
  patient: [
    { icon: "📅", label: "Book Appointment", href: "book-appointment" },
    { icon: "📋", label: "My Appointments", href: "appointments" },
    { icon: "📁", label: "Medical Records", href: "records" },
    { icon: "🧪", label: "Test Results", href: "tests" },
    { icon: "💊", label: "Prescriptions", href: "prescriptions" },
    { icon: "💬", label: "Messages", href: "messages" },
    { icon: "👤", label: "Profile", href: "profile" },
  ],
  doctor: [
    { icon: "📅", label: "Appointments", href: "appointments" },
    { icon: "👥", label: "Patient Records", href: "patients" },
    { icon: "🧪", label: "Test Management", href: "tests" },
    { icon: "💊", label: "Prescriptions", href: "prescriptions" },
    { icon: "💬", label: "Chat with Patients", href: "chat" },
    { icon: "⚙️", label: "My Schedule", href: "schedule" },
    { icon: "👤", label: "Profile", href: "profile" },
  ],
  admin: [
    { icon: "👥", label: "User Management", href: "users" },
    { icon: "📅", label: "Appointments", href: "appointments" },
    { icon: "📁", label: "Medical Records", href: "records" },
    { icon: "🧪", label: "Lab Management", href: "labs" },
    { icon: "💊", label: "Pharmacy", href: "pharmacy" },
    { icon: "💰", label: "Finance", href: "finance" },
    { icon: "📊", label: "Analytics", href: "analytics" },
    { icon: "⚙️", label: "Settings", href: "settings" },
  ],
};

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(menuItems[role][0].href);

  const handleLogout = () => {
    router.push("/login");
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
    <div className="min-h-screen w-full bg-[#FFFFFF] flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#FFFFFF] border-r border-[rgba(168,237,223,0.3)] shadow-[4px_0_24px_rgba(168,237,223,0.15)] transition-all duration-300 z-50 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-4 border-b border-[rgba(168,237,223,0.2)]">
          <div className="text-[22px] font-bold bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] bg-clip-text text-transparent">
            HealNet
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems[role].map((item) => (
            <button
              key={item.href}
              onClick={() => setActiveItem(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeItem === item.href
                  ? `bg-gradient-to-r ${roleColors[role]} text-[#0a0a0a] font-medium`
                  : "text-[#8A9BB0] hover:bg-[#F7F9FC] hover:text-[#1A2332]"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="text-[14px]">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border-2 border-[#A8EDDF] shadow-md flex items-center justify-center text-[#A8EDDF] hover:text-[#1A2332]"
        >
          {sidebarOpen ? "←" : "→"}
        </button>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#8A9BB0] hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <span>🚪</span>
            {sidebarOpen && <span className="text-[14px]">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Header */}
        <header className="h-20 bg-white border-b border-[rgba(168,237,223,0.2)] shadow-sm flex items-center justify-between px-8">
          <div>
            <h2 className="text-[20px] font-bold text-[#1A2332]">{roleNames[role]}</h2>
            <p className="text-[12px] text-[#8A9BB0]">Welcome back!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-[#F7F9FC] border border-[rgba(168,237,223,0.3)] flex items-center justify-center text-[#8A9BB0]">
              🔔
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-[#0a0a0a] font-bold">
              {role === "patient" ? "RS" : role === "doctor" ? "PM" : "AD"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 bg-[#F7F9FC] min-h-[calc(100vh-80px)]">{children}</div>
      </main>
    </div>
  );
}