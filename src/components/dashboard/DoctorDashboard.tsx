"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  FlaskConical,
  Pill,
  MessageSquare,
  Clock,
  MapPin,
  Phone,
  Star,
  ChevronRight,
  Plus,
  X,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  User,
  CalendarCheck,
} from "lucide-react";

interface Appointment {
  id: number;
  patientId: string;
  patientName: string;
  doctorId: number;
  doctorName: string;
  specialty: string;
  hospital: string;
  date: string;
  time: string;
  status: string;
  reason?: string;
}

interface Referral {
  id: number;
  fromDoctor: string;
  toDoctor: string;
  patientName: string;
  reason: string;
  status: string;
  date: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  rating: number;
  available: boolean;
}

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

const StatsCard = ({ label, value, icon, trend, color }: StatsCardProps) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(13,115,119,0.15)" }}
    className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
  >
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-4 shadow-[0_4px_12px_rgba(13,115,119,0.2)]`}>
      {icon}
    </div>
    <div className="text-xl md:text-[28px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">{value}</div>
    <div className="text-[12px] md:text-[13px] text-[var(--text-muted)] mt-1">{label}</div>
    {trend && <div className="text-[11px] text-green-500 mt-2">{trend}</div>}
  </motion.div>
);

const patientRecords = [
  { id: 1, name: "Rahul Sharma", age: 45, condition: "Hypertension", lastVisit: "2026-04-05", hospital: "Apollo Chennai", avatar: "RS" },
  { id: 2, name: "Priya Menon", age: 38, condition: "Diabetes Type 2", lastVisit: "2026-04-03", hospital: "Fortis Mumbai", avatar: "PM" },
  { id: 3, name: "Arun Patel", age: 52, condition: "Cardiac Checkup", lastVisit: "2026-04-01", hospital: "Max Delhi", avatar: "AP" },
];

const testRequests = [
  { id: 1, patient: "Rahul Sharma", test: "ECG", date: "2026-04-08", status: "Pending" },
  { id: 2, patient: "Priya Menon", test: "Blood Sugar", date: "2026-04-08", status: "Completed" },
];

interface DoctorDashboardProps {
  activeItem?: string;
  onActiveItemChange?: (item: string) => void;
}

export default function DoctorDashboard({ activeItem: externalActiveItem, onActiveItemChange }: DoctorDashboardProps) {
  const [internalActiveTab, setInternalActiveTab] = useState("appointments");
  const activeTab = externalActiveItem !== undefined ? externalActiveItem : internalActiveTab;
  const setActiveTab = (item: string) => {
    if (onActiveItemChange) {
      onActiveItemChange(item);
    } else {
      setInternalActiveTab(item);
    }
  };
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralForm, setReferralForm] = useState({ patientName: "", toDoctor: "", reason: "" });

  // Current doctor ID (in production, get from auth)
  const currentDoctorId = 1;

  useEffect(() => {
    fetchAppointments();
    fetchReferrals();
    fetchDoctors();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/appointments?doctorId=${currentDoctorId}`);
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
    setLoading(false);
  };

  const fetchReferrals = async () => {
    const res = await fetch("/api/doctors?action=referrals");
    const data = await res.json();
    if (data.success) setReferrals(data.referrals);
  };

  const fetchDoctors = async () => {
    const res = await fetch("/api/doctors?action=doctors");
    const data = await res.json();
    if (data.success) setDoctors(data.doctors);
  };

  const handleUpdateAppointmentStatus = async (appointmentId: number, status: string) => {
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateStatus", appointmentId, status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  const handleCreateReferral = async () => {
    const res = await fetch("/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "createReferral",
        fromDoctor: "Dr. Priya Menon",
        toDoctor: referralForm.toDoctor,
        patientName: referralForm.patientName,
        reason: referralForm.reason,
      }),
    });
    const data = await res.json();
    if (data.success) {
      fetchReferrals();
      setShowReferralModal(false);
      setReferralForm({ patientName: "", toDoctor: "", reason: "" });
    }
  };

  const handleUpdateReferralStatus = async (referralId: number, status: string) => {
    await fetch("/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "updateReferral", referralId, status }),
    });
    fetchReferrals();
  };

  const tabs = [
    { id: "appointments", label: "Appointments" },
    { id: "patients", label: "Patients" },
    { id: "referrals", label: "Referrals" },
    { id: "tests", label: "Tests" },
    { id: "prescriptions", label: "Rx" },
    { id: "chat", label: "Chat" },
    { id: "schedule", label: "Schedule" },
  ];

  const pendingCount = appointments.filter(a => a.status === "pending").length;
  const confirmedCount = appointments.filter(a => a.status === "confirmed").length;
  const completedToday = appointments.filter(a => a.status === "completed").length;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[var(--primary-accent)]/10 to-[var(--secondary-accent)]/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-[var(--primary-accent)]/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
          <div>
            <h1 className="text-xl md:text-[24px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">Good morning, Dr. Priya! 👋</h1>
            <p className="text-[var(--text-muted)] mt-1 text-sm md:text-base">You have {appointments.length} appointments scheduled.</p>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs md:text-sm">
            <Clock size={16} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatsCard label="Today's Appointments" value={appointments.length} icon={<Calendar size={20} />} trend="↑ 2 from yesterday" color="from-[#A8EDDF] to-[#14A3A8]" />
        <StatsCard label="Pending" value={pendingCount} icon={<AlertCircle size={20} />} color="from-[#F2C4CE] to-[#C2626A]" />
        <StatsCard label="Confirmed" value={confirmedCount} icon={<CalendarCheck size={20} />} color="from-[#C9A96E] to-[#B8954A]" />
        <StatsCard label="Completed" value={completedToday} icon={<CheckCircle2 size={20} />} color="from-[#00E5FF] to-[#B535F6]" />
      </div>

      {/* Tab Navigation */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-1 md:gap-2 min-w-max md:min-w-0 md:bg-[var(--background-alt)] md:p-1 md:rounded-xl md:overflow-visible">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 text-[12px] md:text-[14px] font-medium whitespace-nowrap transition-all rounded-lg md:rounded-xl ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] shadow-[0_4px_12px_rgba(13,115,119,0.3)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--primary-accent)]/10"
              }`}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.substring(0, 3)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Management */}
      {activeTab === "appointments" && (
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)]">Today's Schedule</h3>
            <span className="text-xs md:text-sm text-[var(--text-muted)]">{appointments.length} appointments</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-[var(--primary-accent)]" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-8 border border-[var(--border-color)] text-center">
              <Calendar size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
              <p className="text-[var(--text-muted)]">No appointments scheduled for today</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">New bookings will appear here</p>
            </div>
          ) : (
            appointments.map((apt, i) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold shadow-[0_4px_12px_rgba(13,115,119,0.3)] flex-shrink-0">
                      {apt.patientName.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{apt.patientName}</h4>
                      <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">{apt.specialty}</p>
                      {apt.reason && <p className="text-[11px] text-[var(--primary-accent)] mt-0.5">Reason: {apt.reason}</p>}
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] md:text-[12px]">
                        <span className="flex items-center gap-1 text-[var(--primary-accent)]">
                          <Calendar size={12} /> {apt.date}
                        </span>
                        <span className="flex items-center gap-1 text-[var(--primary-accent)]">
                          <Clock size={12} /> {apt.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end ml-14 sm:ml-0">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium ${
                      apt.status === "confirmed" ? "bg-green-500/10 text-green-500" :
                      apt.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                      apt.status === "completed" ? "bg-blue-500/10 text-blue-500" :
                      "bg-red-500/10 text-red-500"
                    }`}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                    {apt.status === "pending" && (
                      <div className="flex gap-1.5 md:gap-2">
                        <button
                          onClick={() => handleUpdateAppointmentStatus(apt.id, "confirmed")}
                          className="px-2.5 md:px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 text-[11px] md:text-xs font-medium hover:bg-green-500/20"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateAppointmentStatus(apt.id, "cancelled")}
                          className="px-2.5 md:px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-[11px] md:text-xs font-medium hover:bg-red-500/20"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {apt.status === "confirmed" && (
                      <button
                        onClick={() => handleUpdateAppointmentStatus(apt.id, "completed")}
                        className="px-2.5 md:px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-[11px] md:text-xs font-medium hover:bg-blue-500/20"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Patient Records */}
      {activeTab === "patients" && (
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)]">Patient Records</h3>
            <button className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg bg-[var(--primary-accent)] text-[var(--background)] text-[12px] md:text-sm font-medium">
              <Plus size={14} /> Add
            </button>
          </div>
          {patientRecords.map((patient, i) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-[var(--secondary-accent)] to-[var(--tertiary)] flex items-center justify-center text-[var(--background)] font-bold shadow-[0_4px_12px_rgba(91,75,138,0.3)] flex-shrink-0">
                    {patient.avatar}
                  </div>
                  <div>
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{patient.name}</h4>
                    <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">Age: {patient.age} • {patient.condition}</p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] md:text-[12px] text-[var(--primary-accent)]">
                      <MapPin size={12} />
                      <span>{patient.lastVisit} • {patient.hospital}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-14 sm:ml-0">
                  <button className="px-3 md:px-4 py-2 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] text-[11px] md:text-sm font-medium">Records</button>
                  <button className="px-3 md:px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] text-[11px] md:text-sm">Notes</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Referrals */}
      {activeTab === "referrals" && (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)]">Patient Referrals</h3>
            <button
              onClick={() => setShowReferralModal(true)}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] text-[12px] md:text-sm font-semibold"
            >
              <Plus size={14} /> Create
            </button>
          </div>

          <div className="space-y-3 md:space-y-4">
            <h4 className="text-[12px] md:text-[14px] font-semibold text-[var(--text-muted)]">Incoming Referrals</h4>
            {referrals.length === 0 ? (
              <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-6 md:p-8 border border-[var(--border-color)] text-center">
                <AlertCircle size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
                <p className="text-[var(--text-muted)] text-sm md:text-base">No incoming referrals</p>
              </div>
            ) : (
              referrals.map((referral) => (
                <div key={referral.id} className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-[#0a0a0a] font-bold flex-shrink-0">
                        {referral.patientName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{referral.patientName}</h4>
                        <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">From: {referral.fromDoctor}</p>
                        <p className="text-[11px] md:text-[12px] text-[var(--primary-accent)] mt-0.5">Reason: {referral.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end ml-14 sm:ml-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1 ${
                        referral.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                        referral.status === "accepted" ? "bg-green-500/10 text-green-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {referral.status === "pending" && <AlertCircle size={10} />}
                        {referral.status === "accepted" && <CheckCircle2 size={10} />}
                        {referral.status === "rejected" && <XCircle size={10} />}
                        {referral.status}
                      </span>
                      {referral.status === "pending" && (
                        <div className="flex gap-1.5">
                          <button onClick={() => handleUpdateReferralStatus(referral.id, "accepted")} className="px-2.5 py-1.5 rounded-lg bg-green-500/10 text-green-500 text-[11px] font-medium">Accept</button>
                          <button onClick={() => handleUpdateReferralStatus(referral.id, "rejected")} className="px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-[11px] font-medium">Reject</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Referral Modal */}
      <AnimatePresence>
        {showReferralModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReferralModal(false)}
          >
            <motion.div
              className="bg-[var(--background-alt)] rounded-2xl p-5 md:p-6 border border-[var(--border-color)] max-w-md w-full shadow-[var(--shadow-elevated)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg font-bold text-[var(--foreground)]">Create Referral</h3>
                <button onClick={() => setShowReferralModal(false)} className="p-2 rounded-lg hover:bg-[var(--background)]">
                  <X size={18} className="text-[var(--text-muted)]" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 block">Patient Name</label>
                  <input type="text" value={referralForm.patientName} onChange={(e) => setReferralForm({ ...referralForm, patientName: e.target.value })} className="w-full h-11 px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm" placeholder="Enter patient name" />
                </div>
                <div>
                  <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 block">Refer to Doctor</label>
                  <select value={referralForm.toDoctor} onChange={(e) => setReferralForm({ ...referralForm, toDoctor: e.target.value })} className="w-full h-11 px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm">
                    <option value="">Select a doctor</option>
                    {doctors.map((doc) => (<option key={doc.id} value={doc.name}>{doc.name} - {doc.specialty}</option>))}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 block">Reason for Referral</label>
                  <textarea value={referralForm.reason} onChange={(e) => setReferralForm({ ...referralForm, reason: e.target.value })} className="w-full h-20 md:h-24 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm resize-none" placeholder="Describe the reason..." />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowReferralModal(false)} className="flex-1 h-11 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] font-medium text-sm">Cancel</button>
                <button onClick={handleCreateReferral} className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] font-semibold text-sm">Send</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test Management */}
      {activeTab === "tests" && (
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)]">Test Requests</h3>
          {testRequests.map((test) => (
            <div key={test.id} className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-[#A8EDDF] to-[#14A3A8] flex items-center justify-center text-xl md:text-2xl flex-shrink-0">🧪</div>
                <div>
                  <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{test.patient}</h4>
                  <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">Test: {test.test}</p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] md:text-[12px] text-[var(--primary-accent)]">
                    <Calendar size={12} />
                    <span>{test.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-14 sm:ml-0">
                <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium ${
                  test.status === "Completed" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {test.status}
                </span>
                {test.status === "Pending" && (
                  <button className="px-3 py-1.5 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] text-[11px] md:text-sm font-medium">Upload</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescriptions */}
      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)]">Create Prescription</h3>
          <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[var(--border-color)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 block">Patient</label>
                <select className="w-full h-11 px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm">
                  <option>Select Patient</option>
                  {patientRecords.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 block">Diagnosis</label>
                <input type="text" className="w-full h-11 px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm" placeholder="Enter diagnosis" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 block">Medicines</label>
              <textarea className="w-full h-20 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm resize-none" placeholder="Enter medicines (one per line)&#10;Format: Medicine Name - Dosage - Duration" />
            </div>
            <button className="w-full sm:w-auto h-11 px-6 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] font-semibold text-sm">Create Prescription</button>
          </div>
        </div>
      )}

      {/* Chat */}
      {activeTab === "chat" && (
        <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[var(--border-color)]">
          <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)] mb-4">Chat with Patients</h3>
          <div className="space-y-2 md:space-y-3">
            {["Rahul Sharma", "Priya Menon", "Arun Patel"].map((patient) => (
              <div key={patient} className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-[var(--background)] border border-[var(--border-color)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold text-sm">
                    {patient.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-[13px] md:text-[14px] text-[var(--foreground)] font-medium">{patient}</span>
                </div>
                <button className="px-3 md:px-4 py-1.5 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] text-[11px] md:text-sm font-medium">Chat</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule */}
      {activeTab === "schedule" && (
        <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[var(--border-color)]">
          <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)] mb-4">My Schedule</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-3 block">Working Days</label>
              <div className="flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <button key={day} className="px-3 md:px-4 py-2 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] text-[12px] md:text-sm font-medium border border-[var(--primary-accent)]/30">{day}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-3 block">Working Hours</label>
              <div className="flex items-center gap-2 md:gap-4">
                <input type="time" className="flex-1 h-11 px-3 md:px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm" defaultValue="09:00" />
                <span className="text-[var(--text-muted)] text-sm">to</span>
                <input type="time" className="flex-1 h-11 px-3 md:px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm" defaultValue="17:00" />
              </div>
            </div>
          </div>
          <button className="mt-6 w-full sm:w-auto h-11 px-6 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] font-semibold text-sm">Update Schedule</button>
        </div>
      )}
    </div>
  );
}