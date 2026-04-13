"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const todayAppointments = [
  { id: 1, patient: "Rahul Sharma", time: "09:00 AM", type: "Follow-up", status: "confirmed" },
  { id: 2, patient: "Priya Menon", time: "10:30 AM", type: "New Patient", status: "confirmed" },
  { id: 3, patient: "Arun Patel", time: "11:30 AM", type: "Consultation", status: "pending" },
  { id: 4, patient: "Sunita Devi", time: "02:00 PM", type: "Checkup", status: "pending" },
];

const patientRecords = [
  { id: 1, name: "Rahul Sharma", age: 45, condition: "Hypertension", lastVisit: "2026-04-05", hospital: "Apollo Chennai" },
  { id: 2, name: "Priya Menon", age: 38, condition: "Diabetes Type 2", lastVisit: "2026-04-03", hospital: "Fortis Mumbai" },
  { id: 3, name: "Arun Patel", age: 52, condition: "Cardiac Checkup", lastVisit: "2026-04-01", hospital: "Max Delhi" },
];

const testRequests = [
  { id: 1, patient: "Rahul Sharma", test: "ECG", date: "2026-04-08", status: "Pending" },
  { id: 2, patient: "Priya Menon", test: "Blood Sugar", date: "2026-04-08", status: "Completed" },
];

const prescriptions = [
  { id: 1, patient: "Rahul Sharma", date: "2026-04-08", medicines: ["Aspirin 75mg", "Metoprolol 50mg"], status: "Active" },
];

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("appointments");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralForm, setReferralForm] = useState({ patientName: "", toDoctor: "", reason: "" });

  useEffect(() => {
    fetchReferrals();
    fetchDoctors();
  }, []);

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

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#A8EDDF]/20 to-[#F2C4CE]/20 rounded-2xl p-8 border border-[rgba(168,237,223,0.3)]">
        <h1 className="text-[28px] font-bold text-[#1A2332]">Good morning, Dr. Priya! 👋</h1>
        <p className="text-[#8A9BB0] mt-2">You have 4 appointments scheduled for today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Appointments", value: "4", icon: "📅" },
          { label: "Pending Requests", value: "2", icon: "⏳" },
          { label: "Patients Today", value: "12", icon: "👥" },
          { label: "Completed Today", value: "8", icon: "✅" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-[rgba(168,237,223,0.2)] hover:border-[rgba(168,237,223,0.5)] hover:shadow-lg transition-all">
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className="text-[32px] font-bold text-[#1A2332]">{stat.value}</div>
            <div className="text-[13px] text-[#8A9BB0]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[rgba(168,237,223,0.2)] pb-4 overflow-x-auto">
        {[
          { id: "appointments", label: "Appointments" },
          { id: "patients", label: "Patient Records" },
          { id: "referrals", label: "Referrals" },
          { id: "tests", label: "Test Management" },
          { id: "prescriptions", label: "Prescriptions" },
          { id: "chat", label: "Chat" },
          { id: "schedule", label: "My Schedule" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#A8EDDF] to-[#F2C4CE] text-[#0a0a0a]"
                : "text-[#8A9BB0] hover:text-[#1A2332] hover:bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Appointments Management */}
      {activeTab === "appointments" && (
        <div className="space-y-4">
          <h3 className="text-[18px] font-bold text-[#1A2332] mb-4">Today's Appointments</h3>
          {todayAppointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-2xl p-6 border border-[rgba(168,237,223,0.2)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#A8EDDF] to-[#F2C4CE] flex items-center justify-center text-white font-bold">
                    {apt.patient.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-[#1A2332]">{apt.patient}</h4>
                    <p className="text-[13px] text-[#8A9BB0]">{apt.type}</p>
                    <p className="text-[12px] text-[#A8EDDF] mt-1">🕐 {apt.time}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {apt.status === "pending" && (
                    <>
                      <button className="px-4 py-2 rounded-lg bg-green-100 text-green-600 text-sm font-medium hover:bg-green-200">
                        Accept
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-red-100 text-red-600 text-sm font-medium hover:bg-red-200">
                        Reject
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 rounded-lg bg-[#A8EDDF]/20 text-[#A8EDDF] text-sm font-medium hover:bg-[#A8EDDF]/30">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Patient Records */}
      {activeTab === "patients" && (
        <div className="space-y-4">
          <h3 className="text-[18px] font-bold text-white mb-4">Patient Records</h3>
          {patientRecords.map((patient) => (
            <div key={patient.id} className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-[rgba(168,237,223,0.3)] flex items-center justify-center text-white font-bold">
                    {patient.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-[16px] font-bold text-white">{patient.name}</h4>
                    <p className="text-[13px] text-[#8A9BB0]">Age: {patient.age} • {patient.condition}</p>
                    <p className="text-[12px] text-[#A8EDDF] mt-1">{patient.lastVisit} • {patient.hospital}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg bg-[#A8EDDF]/20 text-[#A8EDDF] text-sm font-medium hover:bg-[#A8EDDF]/30">
                    View Records
                  </button>
                  <button className="px-4 py-2 rounded-lg border border-[rgba(168,237,223,0.3)] text-white text-sm font-medium hover:bg-[#1a1a1a]">
                    Upload Notes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Referrals */}
      {activeTab === "referrals" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-white">Patient Referrals</h3>
            <button
              onClick={() => setShowReferralModal(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#A8EDDF] to-[#F2C4CE] text-[#0a0a0a] font-semibold hover:shadow-[0_0_30px_rgba(168,237,223,0.3)] transition-all"
            >
              + Create Referral
            </button>
          </div>

          {/* Incoming Referrals */}
          <div className="space-y-4">
            <h4 className="text-[16px] font-semibold text-white">Incoming Referrals</h4>
            {referrals.length === 0 ? (
              <div className="bg-[#111111] rounded-2xl p-8 border border-[rgba(168,237,223,0.15)] text-center">
                <p className="text-[#8A9BB0]">No incoming referrals</p>
              </div>
            ) : (
              referrals.map((referral) => (
                <div key={referral.id} className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-white font-bold">
                        {referral.patientName.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="text-[16px] font-bold text-white">{referral.patientName}</h4>
                        <p className="text-[13px] text-[#8A9BB0]">From: {referral.fromDoctor}</p>
                        <p className="text-[12px] text-[#A8EDDF] mt-1">Reason: {referral.reason}</p>
                        <p className="text-[11px] text-[#8A9BB0] mt-1">📅 {referral.date}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-4 py-2 rounded-full text-[12px] font-medium ${
                        referral.status === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                        referral.status === "accepted" ? "bg-green-500/20 text-green-400" :
                        "bg-red-500/20 text-red-400"
                      }`}>
                        {referral.status}
                      </span>
                      {referral.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleUpdateReferralStatus(referral.id, "accepted")}
                            className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/30"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleUpdateReferralStatus(referral.id, "rejected")}
                            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/30"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Outgoing Referrals */}
          <div className="space-y-4">
            <h4 className="text-[16px] font-semibold text-white">Outgoing Referrals</h4>
            <div className="bg-[#111111] rounded-2xl p-8 border border-[rgba(168,237,223,0.15)] text-center">
              <p className="text-[#8A9BB0]">No outgoing referrals</p>
            </div>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      <AnimatePresence>
        {showReferralModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReferralModal(false)}
          >
            <motion.div
              className="bg-[#111111] rounded-3xl p-8 border border-[rgba(168,237,223,0.3)] max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-[20px] font-bold text-white mb-6">Create Patient Referral</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[13px] text-[#8A9BB0] mb-2 block">Patient Name</label>
                  <input
                    type="text"
                    value={referralForm.patientName}
                    onChange={(e) => setReferralForm({ ...referralForm, patientName: e.target.value })}
                    className="w-full h-12 px-4 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white placeholder-[#8A9BB0]"
                    placeholder="Enter patient name"
                  />
                </div>
                <div>
                  <label className="text-[13px] text-[#8A9BB0] mb-2 block">Refer to Doctor</label>
                  <select
                    value={referralForm.toDoctor}
                    onChange={(e) => setReferralForm({ ...referralForm, toDoctor: e.target.value })}
                    className="w-full h-12 px-4 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white"
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.name}>{doc.name} - {doc.specialty}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[13px] text-[#8A9BB0] mb-2 block">Reason for Referral</label>
                  <textarea
                    value={referralForm.reason}
                    onChange={(e) => setReferralForm({ ...referralForm, reason: e.target.value })}
                    className="w-full h-24 px-4 py-3 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white placeholder-[#8A9BB0]"
                    placeholder="Describe the reason for referral..."
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setShowReferralModal(false)}
                  className="flex-1 h-12 rounded-xl border border-[rgba(168,237,223,0.3)] text-white font-medium hover:bg-[#1a1a1a] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateReferral}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#A8EDDF] to-[#F2C4CE] text-[#0a0a0a] font-semibold hover:shadow-[0_0_30px_rgba(168,237,223,0.3)] transition-all"
                >
                  Send Referral
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test Management */}
      {activeTab === "tests" && (
        <div className="space-y-4">
          <h3 className="text-[18px] font-bold text-white mb-4">Test Requests</h3>
          {testRequests.map((test) => (
            <div key={test.id} className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)] flex items-center justify-between">
              <div>
                <h4 className="text-[16px] font-bold text-white">{test.patient}</h4>
                <p className="text-[13px] text-[#8A9BB0]">Test: {test.test}</p>
                <p className="text-[12px] text-[#A8EDDF] mt-1">{test.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 rounded-full text-[12px] font-medium ${
                  test.status === "Completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {test.status}
                </span>
                {test.status === "Pending" && (
                  <button className="px-4 py-2 rounded-lg bg-[#A8EDDF]/20 text-[#A8EDDF] text-sm font-medium hover:bg-[#A8EDDF]/30">
                    Upload Results
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescriptions */}
      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          <h3 className="text-[18px] font-bold text-white mb-4">Create Prescription</h3>
          <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[13px] text-[#8A9BB0] mb-2 block">Patient</label>
                <select className="w-full h-12 px-4 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white">
                  <option>Select Patient</option>
                  {patientRecords.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[13px] text-[#8A9BB0] mb-2 block">Diagnosis</label>
                <input type="text" className="w-full h-12 px-4 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white" placeholder="Enter diagnosis" />
              </div>
            </div>
            <div className="mb-6">
              <label className="text-[13px] text-[#8A9BB0] mb-2 block">Medicines</label>
              <textarea className="w-full h-24 px-4 py-3 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white placeholder-[#8A9BB0]" placeholder="Enter medicines (one per line)&#10;Format: Medicine Name - Dosage - Duration" />
            </div>
            <button className="h-12 px-8 rounded-xl bg-gradient-to-r from-[#A8EDDF] to-[#F2C4CE] text-[#0a0a0a] font-semibold hover:shadow-[0_0_30px_rgba(168,237,223,0.3)] transition-all">
              Create Prescription
            </button>
          </div>
        </div>
      )}

      {/* Chat */}
      {activeTab === "chat" && (
        <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
          <h3 className="text-[18px] font-bold text-white mb-4">Chat with Patients</h3>
          <div className="space-y-4">
            {["Rahul Sharma", "Priya Menon", "Arun Patel"].map((patient) => (
              <div key={patient} className="flex items-center justify-between p-4 rounded-xl bg-[#0a0a0a] border border-[rgba(168,237,223,0.2)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#A8EDDF] to-[#F2C4CE] flex items-center justify-center text-[#0a0a0a] font-bold text-sm">
                    {patient.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-white font-medium">{patient}</span>
                </div>
                <button className="px-4 py-2 rounded-lg bg-[#A8EDDF]/20 text-[#A8EDDF] text-sm font-medium">
                  Open Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Schedule */}
      {activeTab === "schedule" && (
        <div className="bg-[#111111] rounded-2xl p-6 border border-[rgba(168,237,223,0.15)]">
          <h3 className="text-[18px] font-bold text-white mb-4">My Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[13px] text-[#8A9BB0] mb-2 block">Working Days</label>
              <div className="flex gap-2 flex-wrap">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <button key={day} className="px-4 py-2 rounded-lg bg-[#A8EDDF]/20 text-[#A8EDDF] text-sm font-medium">
                    {day}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[13px] text-[#8A9BB0] mb-2 block">Working Hours</label>
              <div className="flex gap-4">
                <input type="time" className="h-12 px-4 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white" defaultValue="09:00" />
                <input type="time" className="h-12 px-4 bg-[#0a0a0a] border border-[rgba(168,237,223,0.3)] rounded-xl text-white" defaultValue="17:00" />
              </div>
            </div>
          </div>
          <button className="mt-6 h-12 px-8 rounded-xl bg-gradient-to-r from-[#A8EDDF] to-[#F2C4CE] text-[#0a0a0a] font-semibold hover:shadow-[0_0_30px_rgba(168,237,223,0.3)] transition-all">
            Update Schedule
          </button>
        </div>
      )}
    </div>
  );
}