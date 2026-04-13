"use client";

import { useState } from "react";

const users = [
  { id: 1, name: "Dr. Priya Menon", role: "Doctor", department: "Cardiology", hospital: "Apollo Chennai", status: "Active" },
  { id: 2, name: "Dr. Rahul Sharma", role: "Doctor", department: "Neurology", hospital: "Fortis Mumbai", status: "Active" },
  { id: 3, name: "Rahul Sharma", role: "Patient", hospital: "Apollo Chennai", status: "Active" },
  { id: 4, name: "Sunita Devi", role: "Patient", hospital: "Max Delhi", status: "Active" },
];

const appointments = [
  { id: 1, patient: "Rahul Sharma", doctor: "Dr. Priya Menon", date: "2026-04-09", time: "10:00 AM", hospital: "Apollo Chennai" },
  { id: 2, patient: "Priya Menon", doctor: "Dr. Rahul Sharma", date: "2026-04-09", time: "11:00 AM", hospital: "Fortis Mumbai" },
];

const analyticsData = {
  todayAppointments: 45,
  totalPatients: 1247,
  activeDoctors: 48,
  revenue: "₹12.5L",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#C9A96E]/20 to-[#D4A89A]/20 rounded-2xl p-8 border border-[rgba(201,169,110,0.3)]">
        <h1 className="text-[28px] font-bold text-white">Welcome back, Admin! 🔐</h1>
        <p className="text-[#8A9BB0] mt-2">Here's what's happening across the platform.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Appointments", value: analyticsData.todayAppointments, icon: "📅", color: "from-[#F2C4CE] to-[#A8EDDF]" },
          { label: "Total Patients", value: analyticsData.totalPatients, icon: "👥", color: "from-[#A8EDDF] to-[#F2C4CE]" },
          { label: "Active Doctors", value: analyticsData.activeDoctors, icon: "👨‍⚕️", color: "from-[#C9A96E] to-[#D4A89A]" },
          { label: "Today's Revenue", value: analyticsData.revenue, icon: "💰", color: "from-[#D4A89A] to-[#C9A96E]" },
        ].map((stat, i) => (
          <div key={i} className={`bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)] hover:border-[rgba(168,237,223,0.4)] transition-all`}>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl mb-4`}>
              {stat.icon}
            </div>
            <div className="text-[32px] font-bold text-white">{stat.value}</div>
            <div className="text-[13px] text-[#8A9BB0]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[rgba(168,237,223,0.2)] pb-4 overflow-x-auto">
        {[
          { id: "users", label: "User Management" },
          { id: "appointments", label: "Appointments" },
          { id: "records", label: "Medical Records" },
          { id: "labs", label: "Lab Management" },
          { id: "pharmacy", label: "Pharmacy" },
          { id: "finance", label: "Finance" },
          { id: "analytics", label: "Analytics" },
          { id: "settings", label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#C9A96E] to-[#D4A89A] text-[#0a0a0a]"
                : "text-[#8A9BB0] hover:text-white hover:bg-[#1a1a1a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* User Management */}
      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-white">User Management</h3>
            <button className="h-10 px-6 rounded-xl bg-gradient-to-r from-[#C9A96E] to-[#D4A89A] text-[#0a0a0a] font-semibold text-sm">
              + Add New User
            </button>
          </div>
          <div className="bg-[#111111] rounded-2xl border border-[rgba(168,237,223,0.15)] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#0a0a0a]">
                <tr>
                  <th className="text-left p-4 text-[12px] text-[#8A9BB0] font-medium">Name</th>
                  <th className="text-left p-4 text-[12px] text-[#8A9BB0] font-medium">Role</th>
                  <th className="text-left p-4 text-[12px] text-[#8A9BB0] font-medium">Department</th>
                  <th className="text-left p-4 text-[12px] text-[#8A9BB0] font-medium">Hospital</th>
                  <th className="text-left p-4 text-[12px] text-[#8A9BB0] font-medium">Status</th>
                  <th className="text-left p-4 text-[12px] text-[#8A9BB0] font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-[rgba(168,237,223,0.1)]">
                    <td className="p-4 text-white font-medium">{user.name}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "Doctor" ? "bg-[#A8EDDF]/20 text-[#A8EDDF]" :
                        "bg-[#F2C4CE]/20 text-[#F2C4CE]"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-[#8A9BB0]">{user.department || "-"}</td>
                    <td className="p-4 text-[#8A9BB0]">{user.hospital}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 rounded-lg border border-[rgba(168,237,223,0.3)] text-white text-xs hover:bg-[#1a1a1a]">Edit</button>
                        <button className="px-3 py-1 rounded-lg text-red-400 text-xs hover:bg-red-500/10">Delete</button>
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
          <h3 className="text-[18px] font-bold text-white mb-4">All Appointments</h3>
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)] flex items-center justify-between">
              <div>
                <h4 className="text-[16px] font-bold text-white">{apt.patient}</h4>
                <p className="text-[13px] text-[#8A9BB0]">Doctor: {apt.doctor}</p>
                <p className="text-[12px] text-[#A8EDDF] mt-1">{apt.date} at {apt.time} • {apt.hospital}</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-[#C9A96E]/20 text-[#C9A96E] text-sm font-medium hover:bg-[#C9A96E]/30">
                Manage
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Analytics */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
            <h3 className="text-[16px] font-bold text-white mb-4">Patient Flow (This Week)</h3>
            <div className="h-40 flex items-end gap-2">
              {[65, 80, 45, 90, 70, 55, 75].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-[#A8EDDF] to-[#F2C4CE] rounded-t-lg" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[11px] text-[#8A9BB0]">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
          <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
            <h3 className="text-[16px] font-bold text-white mb-4">Doctor Performance</h3>
            <div className="space-y-4">
              {["Dr. Priya Menon", "Dr. Rahul Sharma", "Dr. Sunita Devi"].map((doc, i) => (
                <div key={doc} className="flex items-center gap-4">
                  <span className="text-white text-sm w-32">{doc}</span>
                  <div className="flex-1 h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#A8EDDF] to-[#F2C4CE]" style={{ width: `${90 - i * 15}%` }} />
                  </div>
                  <span className="text-[#8A9BB0] text-sm">{90 - i * 15}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lab Management */}
      {activeTab === "labs" && (
        <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
          <h3 className="text-[18px] font-bold text-white mb-4">Lab Tests Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {["Blood Test", "ECG", "MRI Scan", "CT Scan", "X-Ray", "Ultrasound"].map((test) => (
              <div key={test} className="p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(168,237,223,0.2)] flex items-center justify-between">
                <span className="text-white">{test}</span>
                <span className="text-[12px] text-[#8A9BB0]">Active</span>
              </div>
            ))}
          </div>
          <button className="h-10 px-6 rounded-xl bg-gradient-to-r from-[#C9A96E] to-[#D4A89A] text-[#0a0a0a] font-semibold text-sm">
            + Add New Lab Test
          </button>
        </div>
      )}

      {/* Pharmacy */}
      {activeTab === "pharmacy" && (
        <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
          <h3 className="text-[18px] font-bold text-white mb-4">Pharmacy Inventory</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-[14px] text-[#8A9BB0] mb-3">Medicine Stock</h4>
              <div className="space-y-3">
                {[
                  { name: "Aspirin 75mg", stock: 500, expiry: "2027-03" },
                  { name: "Metoprolol 50mg", stock: 320, expiry: "2026-12" },
                  { name: "Vitamin D3 1000IU", stock: 850, expiry: "2027-06" },
                ].map((med, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-[#0a0a0a]">
                    <span className="text-white">{med.name}</span>
                    <div className="text-right">
                      <span className="text-[#A8EDDF]">{med.stock} units</span>
                      <p className="text-[10px] text-[#8A9BB0]">Exp: {med.expiry}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-[14px] text-[#8A9BB0] mb-3">Low Stock Alerts</h4>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <p className="text-red-400 text-sm">Paracetamol 500mg - Only 45 units left</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Finance */}
      {activeTab === "finance" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
              <div className="text-[12px] text-[#8A9BB0] mb-2">Total Revenue (This Month)</div>
              <div className="text-[32px] font-bold text-white">₹45.2L</div>
              <div className="text-[12px] text-green-400 mt-2">↑ 12% from last month</div>
            </div>
            <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
              <div className="text-[12px] text-[#8A9BB0] mb-2">Pending Payments</div>
              <div className="text-[32px] font-bold text-white">₹2.8L</div>
            </div>
            <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
              <div className="text-[12px] text-[#8A9BB0] mb-2">Insurance Claims</div>
              <div className="text-[32px] font-bold text-white">₹8.5L</div>
            </div>
          </div>
          <button className="h-10 px-6 rounded-xl bg-gradient-to-r from-[#C9A96E] to-[#D4A89A] text-[#0a0a0a] font-semibold text-sm">
            Generate Invoice
          </button>
        </div>
      )}

      {/* Settings */}
      {activeTab === "settings" && (
        <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
          <h3 className="text-[18px] font-bold text-white mb-4">Platform Settings</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a]">
              <div>
                <h4 className="text-white font-medium">Website Content</h4>
                <p className="text-[12px] text-[#8A9BB0]">Manage landing page content</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-[rgba(168,237,223,0.3)] text-white text-sm">Manage</button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a]">
              <div>
                <h4 className="text-white font-medium">Notifications</h4>
                <p className="text-[12px] text-[#8A9BB0]">System alerts and announcements</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-[rgba(168,237,223,0.3)] text-white text-sm">Manage</button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a]">
              <div>
                <h4 className="text-white font-medium">Security Settings</h4>
                <p className="text-[12px] text-[#8A9BB0]">Backup, permissions, 2FA</p>
              </div>
              <button className="px-4 py-2 rounded-lg border border-[rgba(168,237,223,0.3)] text-white text-sm">Configure</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}