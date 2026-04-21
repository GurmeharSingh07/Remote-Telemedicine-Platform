"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  FlaskConical,
  Pill,
  CreditCard,
  BarChart3,
  Settings,
  Building2,
  MapPin,
  Plus,
  ChevronRight,
  TrendingUp,
  Clock,
  Bell,
  Activity,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Globe,
  Shield,
} from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const StatsCard = ({ label, value, icon, color, trend }: StatsCardProps) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(13,115,119,0.15)" }}
    className="bg-[var(--background-alt)] rounded-2xl p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
  >
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-2xl mb-4 shadow-[0_4px_12px_rgba(13,115,119,0.2)]`}>
      {icon}
    </div>
    <div className="text-[28px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">{value}</div>
    <div className="text-[13px] text-[var(--text-muted)] mt-1">{label}</div>
    {trend && <div className="text-[11px] text-green-500 mt-2 flex items-center gap-1"><TrendingUp size={10} /> {trend}</div>}
  </motion.div>
);

const users = [
  { id: 1, name: "Dr. Priya Menon", role: "Doctor", department: "Cardiology", hospital: "Apollo Chennai", status: "Active", avatar: "PM" },
  { id: 2, name: "Dr. Rahul Sharma", role: "Doctor", department: "Neurology", hospital: "Fortis Mumbai", status: "Active", avatar: "RS" },
  { id: 3, name: "Rahul Sharma", role: "Patient", hospital: "Apollo Chennai", status: "Active", avatar: "RS" },
  { id: 4, name: "Sunita Devi", role: "Patient", hospital: "Max Delhi", status: "Active", avatar: "SD" },
];

const appointments = [
  { id: 1, patient: "Rahul Sharma", doctor: "Dr. Priya Menon", date: "2026-04-09", time: "10:00 AM", hospital: "Apollo Chennai", status: "confirmed" },
  { id: 2, patient: "Priya Menon", doctor: "Dr. Rahul Sharma", date: "2026-04-09", time: "11:00 AM", hospital: "Fortis Mumbai", status: "pending" },
];

const analyticsData = {
  todayAppointments: 45,
  totalPatients: 1247,
  activeDoctors: 48,
  revenue: "₹12.5L",
};

interface AdminDashboardProps {
  activeItem?: string;
  onActiveItemChange?: (item: string) => void;
}

export default function AdminDashboard({ activeItem: externalActiveItem, onActiveItemChange }: AdminDashboardProps) {
  const [internalActiveTab, setInternalActiveTab] = useState("dashboard");
  const activeTab = externalActiveItem !== undefined ? externalActiveItem : internalActiveTab;
  const setActiveTab = (item: string) => {
    if (onActiveItemChange) {
      onActiveItemChange(item);
    } else {
      setInternalActiveTab(item);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "User Management", icon: Users },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "records", label: "Medical Records", icon: FileText },
    { id: "labs", label: "Lab Management", icon: FlaskConical },
    { id: "pharmacy", label: "Pharmacy", icon: Pill },
    { id: "finance", label: "Finance", icon: CreditCard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "hospitals", label: "Hospitals", icon: Building2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const chartData = [
    { day: "Mon", value: 65 },
    { day: "Tue", value: 80 },
    { day: "Wed", value: 45 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 55 },
    { day: "Sun", value: 75 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[var(--gold)]/10 to-[var(--tertiary)]/10 rounded-2xl p-6 border border-[var(--gold)]/20"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">Welcome back, Admin! 🔐</h1>
            <p className="text-[var(--text-muted)] mt-1">Here's what's happening across the platform.</p>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-muted)]">
            <Clock size={16} />
            <span className="text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard label="Today's Appointments" value={analyticsData.todayAppointments} icon="📅" trend="↑ 12% from yesterday" color="from-[#F2C4CE] to-[#C2626A]" />
        <StatsCard label="Total Patients" value={analyticsData.totalPatients.toLocaleString()} icon="👥" trend="↑ 8% this month" color="from-[#A8EDDF] to-[#14A3A8]" />
        <StatsCard label="Active Doctors" value={analyticsData.activeDoctors} icon="👨‍⚕️" color="from-[#C9A96E] to-[#B8954A]" />
        <StatsCard label="Today's Revenue" value={analyticsData.revenue} icon="💰" trend="↑ 15% from last week" color="from-[#00E5FF] to-[#B535F6]" />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-[var(--border-color)] pb-0 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-[14px] font-medium whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? "text-[var(--gold)] border-[var(--gold)] bg-[var(--gold)]/5"
                  : "text-[var(--text-muted)] border-transparent hover:text-[var(--foreground)] hover:bg-[var(--background-alt)]"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Dashboard Overview */}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Flow Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]"
          >
            <h3 className="text-[16px] font-bold text-[var(--foreground)] mb-4">Patient Flow (This Week)</h3>
            <div className="h-48 flex items-end gap-3">
              {chartData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gradient-to-t from-[var(--primary-accent)] to-[var(--secondary-accent)] rounded-t-lg transition-all hover:opacity-80" style={{ height: `${data.value}%` }} />
                  <span className="text-[11px] text-[var(--text-muted)]">{data.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Doctor Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]"
          >
            <h3 className="text-[16px] font-bold text-[var(--foreground)] mb-4">Doctor Performance</h3>
            <div className="space-y-4">
              {[
                { name: "Dr. Priya Menon", score: 95 },
                { name: "Dr. Rahul Sharma", score: 88 },
                { name: "Dr. Sunita Devi", score: 82 },
              ].map((doc, i) => (
                <div key={doc.name} className="flex items-center gap-4">
                  <span className="text-[var(--foreground)] text-sm w-36">{doc.name}</span>
                  <div className="flex-1 h-3 bg-[var(--background)] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${doc.score}%` }}
                      transition={{ delay: i * 0.2, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)]"
                    />
                  </div>
                  <span className="text-[var(--text-muted)] text-sm w-10">{doc.score}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)] md:col-span-2"
          >
            <h3 className="text-[16px] font-bold text-[var(--foreground)] mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { icon: CheckCircle2, color: "text-green-500", text: "Dr. Priya Menon completed a consultation", time: "5 min ago" },
                { icon: Plus, color: "text-[var(--primary-accent)]", text: "New patient registered: Sunita Devi", time: "15 min ago" },
                { icon: AlertTriangle, color: "text-yellow-500", text: "Low stock alert: Paracetamol 500mg", time: "1 hour ago" },
                { icon: CreditCard, color: "text-[var(--gold)]", text: "Payment received: ₹2,500", time: "2 hours ago" },
              ].map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--background)]">
                    <Icon size={18} className={activity.color} />
                    <span className="text-[var(--foreground)] text-sm flex-1">{activity.text}</span>
                    <span className="text-[var(--text-muted)] text-xs">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* User Management */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-[var(--background-alt)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)]"
                />
              </div>
              <button className="flex items-center gap-2 px-4 h-12 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--primary-accent)]">
                <Filter size={16} /> Filter
              </button>
            </div>
            <button onClick={() => setShowAddUserModal(true)} className="flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--tertiary)] text-[var(--background)] font-semibold">
              <Plus size={16} /> Add New User
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-[var(--background-alt)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--background)]">
                <tr>
                  <th className="text-left p-4 text-[12px] text-[var(--text-muted)] font-medium">Name</th>
                  <th className="text-left p-4 text-[12px] text-[var(--text-muted)] font-medium">Role</th>
                  <th className="text-left p-4 text-[12px] text-[var(--text-muted)] font-medium">Department</th>
                  <th className="text-left p-4 text-[12px] text-[var(--text-muted)] font-medium">Hospital</th>
                  <th className="text-left p-4 text-[12px] text-[var(--text-muted)] font-medium">Status</th>
                  <th className="text-left p-4 text-[12px] text-[var(--text-muted)] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-[var(--border-color)] hover:bg-[var(--background)]">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold text-sm">
                          {user.avatar}
                        </div>
                        <span className="text-[var(--foreground)] font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "Doctor" ? "bg-[var(--primary-accent)]/10 text-[var(--primary-accent)]" : "bg-[var(--tertiary)]/10 text-[var(--tertiary)]"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-[var(--text-muted)]">{user.department || "-"}</td>
                    <td className="p-4 text-[var(--text-muted)]">{user.hospital}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 flex items-center gap-1 w-fit">
                        <CheckCircle2 size={10} /> {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg hover:bg-[var(--background)] text-[var(--text-muted)]"><Eye size={16} /></button>
                        <button className="p-2 rounded-lg hover:bg-[var(--background)] text-[var(--primary-accent)]"><Edit size={16} /></button>
                        <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Appointments Overview */}
      {activeTab === "appointments" && (
        <div className="space-y-4">
          <h3 className="text-[16px] font-bold text-[var(--foreground)]">All Appointments</h3>
          {appointments.map((apt, i) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--background-alt)] rounded-2xl p-5 border border-[var(--border-color)] hover:border-[var(--gold)]/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--tertiary)] flex items-center justify-center text-[var(--background)] font-bold">
                    {apt.patient.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-[var(--foreground)]">{apt.patient}</h4>
                    <p className="text-[12px] text-[var(--text-muted)]">Doctor: {apt.doctor}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar size={12} className="text-[var(--gold)]" />
                      <span className="text-xs text-[var(--gold)]">{apt.date} at {apt.time}</span>
                      <span className="text-[var(--text-muted)]">•</span>
                      <Building2 size={12} className="text-[var(--text-muted)]" />
                      <span className="text-xs text-[var(--text-muted)]">{apt.hospital}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === "confirmed" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {apt.status}
                  </span>
                  <button className="p-2 rounded-lg bg-[var(--gold)]/10 text-[var(--gold)] hover:bg-[var(--gold)]/20">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Analytics */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]">
            <h3 className="text-[16px] font-bold text-[var(--foreground)] mb-4">Patient Flow (This Week)</h3>
            <div className="h-48 flex items-end gap-3">
              {chartData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gradient-to-t from-[var(--primary-accent)] to-[var(--secondary-accent)] rounded-t-lg" style={{ height: `${data.value}%` }} />
                  <span className="text-[11px] text-[var(--text-muted)]">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]">
            <h3 className="text-[16px] font-bold text-[var(--foreground)] mb-4">Revenue Overview</h3>
            <div className="space-y-4">
              {[
                { label: "Consultations", value: "₹8.5L", percent: 60 },
                { label: "Lab Tests", value: "₹2.8L", percent: 20 },
                { label: "Pharmacy", value: "₹1.2L", percent: 15 },
                { label: "Other", value: "₹0.5L", percent: 5 },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="text-[var(--text-muted)] text-sm w-28">{item.label}</span>
                  <div className="flex-1 h-3 bg-[var(--background)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)]" style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className="text-[var(--foreground)] text-sm w-16 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lab Management */}
      {activeTab === "labs" && (
        <div className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[16px] font-bold text-[var(--foreground)]">Lab Tests Management</h3>
            <button className="flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] text-sm font-medium">
              <Plus size={14} /> Add New Lab Test
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Blood Test", "ECG", "MRI Scan", "CT Scan", "X-Ray", "Ultrasound"].map((test) => (
              <div key={test} className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-between hover:border-[var(--primary-accent)]/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary-accent)]/10 flex items-center justify-center">
                    <FlaskConical size={18} className="text-[var(--primary-accent)]" />
                  </div>
                  <span className="text-[var(--foreground)] font-medium">{test}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pharmacy */}
      {activeTab === "pharmacy" && (
        <div className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]">
          <h3 className="text-[16px] font-bold text-[var(--foreground)] mb-4">Pharmacy Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[14px] text-[var(--text-muted)] mb-3">Medicine Stock</h4>
              <div className="space-y-3">
                {[
                  { name: "Aspirin 75mg", stock: 500, expiry: "2027-03" },
                  { name: "Metoprolol 50mg", stock: 320, expiry: "2026-12" },
                  { name: "Vitamin D3 1000IU", stock: 850, expiry: "2027-06" },
                ].map((med, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[var(--background)] border border-[var(--border-color)]">
                    <div className="flex items-center gap-3">
                      <Pill size={18} className="text-[var(--primary-accent)]" />
                      <span className="text-[var(--foreground)]">{med.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[var(--primary-accent)] font-medium">{med.stock} units</span>
                      <p className="text-[10px] text-[var(--text-muted)]">Exp: {med.expiry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[14px] text-[var(--text-muted)] mb-3">Low Stock Alerts</h4>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-red-500" />
                  <div>
                    <p className="text-red-400 text-sm font-medium">Paracetamol 500mg</p>
                    <p className="text-red-500/70 text-xs">Only 45 units left - Reorder required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Finance */}
      {activeTab === "finance" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <DollarSign size={20} className="text-green-500" />
                </div>
                <div>
                  <div className="text-[12px] text-[var(--text-muted)]">Total Revenue (This Month)</div>
                  <div className="text-[24px] font-bold text-[var(--foreground)]">₹45.2L</div>
                  <div className="text-[11px] text-green-500 mt-1">↑ 12% from last month</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Clock size={20} className="text-yellow-500" />
                </div>
                <div>
                  <div className="text-[12px] text-[var(--text-muted)]">Pending Payments</div>
                  <div className="text-[24px] font-bold text-[var(--foreground)]">₹2.8L</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--primary-accent)]/10 flex items-center justify-center">
                  <Activity size={20} className="text-[var(--primary-accent)]" />
                </div>
                <div>
                  <div className="text-[12px] text-[var(--text-muted)]">Insurance Claims</div>
                  <div className="text-[24px] font-bold text-[var(--foreground)]">₹8.5L</div>
                </div>
              </div>
            </motion.div>
          </div>
          <button className="h-12 px-6 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--tertiary)] text-[var(--background)] font-semibold">
            Generate Invoice
          </button>
        </div>
      )}

      {/* Settings */}
      {activeTab === "settings" && (
        <div className="bg-[var(--background-alt)] rounded-2xl p-6 border border-[var(--border-color)]">
          <h3 className="text-[16px] font-bold text-[var(--foreground)] mb-4">Platform Settings</h3>
          <div className="space-y-4">
            {[
              { icon: Globe, title: "Website Content", desc: "Manage landing page content" },
              { icon: Bell, title: "Notifications", desc: "System alerts and announcements" },
              { icon: Shield, title: "Security Settings", desc: "Backup, permissions, 2FA" },
              { icon: Building2, title: "Hospital Management", desc: "Configure hospital details" },
            ].map((setting, i) => {
              const Icon = setting.icon;
              return (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[var(--background)] border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary-accent)]/10 flex items-center justify-center">
                      <Icon size={18} className="text-[var(--primary-accent)]" />
                    </div>
                    <div>
                      <h4 className="text-[var(--foreground)] font-medium">{setting.title}</h4>
                      <p className="text-[12px] text-[var(--text-muted)]">{setting.desc}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] text-sm hover:bg-[var(--background-alt)]">Configure</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hospitals - with Map */}
      {activeTab === "hospitals" && (
        <div className="space-y-6">
          <div className="bg-[var(--background-alt)] rounded-2xl border border-[var(--border-color)] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center">
                  <Building2 size={18} className="text-[var(--background)]" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[var(--foreground)]">Network Hospitals</h3>
                  <p className="text-xs text-[var(--text-muted)]">5 hospitals connected</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] text-sm font-medium">
                <MapPin size={14} /> View Map
              </button>
            </div>
            <div className="h-80 relative bg-[var(--background)]">
              <div className="absolute inset-0 grid-pattern opacity-20" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 320">
                <line x1="0" y1="160" x2="800" y2="160" stroke="var(--border-color)" strokeWidth="3" />
                <line x1="400" y1="0" x2="400" y2="320" stroke="var(--border-color)" strokeWidth="3" />
                <line x1="150" y1="80" x2="650" y2="80" stroke="var(--border-color)" strokeWidth="2" />
                <line x1="150" y1="240" x2="650" y2="240" stroke="var(--border-color)" strokeWidth="2" />
              </svg>
              {[
                { name: "Apollo Chennai", x: "20%", y: "30%" },
                { name: "Fortis Mumbai", x: "50%", y: "25%" },
                { name: "Max Delhi", x: "75%", y: "35%" },
                { name: "Medanta Gurgaon", x: "60%", y: "70%" },
                { name: "Manipal Bangalore", x: "35%", y: "75%" },
              ].map((hospital, i) => (
                <div key={hospital.name} className="absolute" style={{ left: hospital.x, top: hospital.y }}>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--tertiary)] flex items-center justify-center text-[var(--background)] text-xs font-bold shadow-[0_4px_12px_rgba(184,149,74,0.5)]">
                      {i + 1}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[var(--background-alt)] px-2 py-1 rounded-lg text-xs text-[var(--foreground)] whitespace-nowrap border border-[var(--border-color)] shadow-lg">
                      {hospital.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Apollo Chennai", beds: 250, doctors: 45, location: "Chennai, Tamil Nadu" },
              { name: "Fortis Mumbai", beds: 200, doctors: 38, location: "Mumbai, Maharashtra" },
              { name: "Max Delhi", beds: 180, doctors: 35, location: "Delhi NCR" },
            ].map((hospital) => (
              <div key={hospital.name} className="bg-[var(--background-alt)] rounded-2xl p-5 border border-[var(--border-color)] hover:border-[var(--gold)]/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 size={20} className="text-[var(--gold)]" />
                  <h4 className="text-[var(--foreground)] font-semibold">{hospital.name}</h4>
                </div>
                <div className="space-y-2 text-sm text-[var(--text-muted)]">
                  <div className="flex justify-between"><span>Beds:</span><span className="text-[var(--foreground)]">{hospital.beds}</span></div>
                  <div className="flex justify-between"><span>Doctors:</span><span className="text-[var(--foreground)]">{hospital.doctors}</span></div>
                  <div className="flex justify-between"><span>Location:</span><span className="text-[var(--foreground)]">{hospital.location}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}