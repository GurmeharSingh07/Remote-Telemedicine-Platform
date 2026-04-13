"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  rating: number;
  experience: string;
  distance: string;
  available: boolean;
  image: string;
}

const appointments = [
  { id: 1, doctor: "Dr. Priya Menon", specialty: "Cardiologist", date: "2026-04-09", time: "10:00 AM", status: "confirmed" },
  { id: 2, doctor: "Dr. Rahul Sharma", specialty: "Neurologist", date: "2026-04-11", time: "2:30 PM", status: "pending" },
  { id: 3, doctor: "Dr. Sunita Devi", specialty: "Dermatologist", date: "2026-04-05", time: "11:00 AM", status: "completed" },
];

const medicalRecords = [
  { id: 1, title: "Annual Health Checkup", date: "2026-03-15", hospital: "Apollo Chennai", type: "Checkup" },
  { id: 2, title: "ECG Report", date: "2026-02-20", hospital: "Fortis Mumbai", type: "Test" },
  { id: 3, title: "Blood Test Results", date: "2026-01-10", hospital: "Max Delhi", type: "Lab" },
];

const testResults = [
  { id: 1, test: "Complete Blood Count", date: "2026-04-01", status: "Ready", hospital: "Apollo Chennai" },
  { id: 2, test: "Lipid Profile", date: "2026-04-01", status: "Ready", hospital: "Apollo Chennai" },
  { id: 3, test: "Thyroid Function", date: "2026-03-25", status: "Pending", hospital: "Max Delhi" },
];

const prescriptions = [
  { id: 1, doctor: "Dr. Priya Menon", date: "2026-04-05", medicines: ["Aspirin 75mg", "Metoprolol 50mg"], validUntil: "2026-05-05" },
  { id: 2, doctor: "Dr. Rahul Sharma", date: "2026-03-20", medicines: ["Vitamin D3 1000IU", "Calcium 500mg"], validUntil: "2026-04-20" },
];

const specialties = ["All", "Cardiologist", "Neurologist", "Dermatologist", "Orthopedic", "Pediatrician", "Gastroenterologist", "General Physician", "Pulmonologist", "Radiologist", "Oncologist", "Nephrologist", "Urologist", "Psychiatrist", "Gynecologist", "ENT", "Endocrinologist", "Vascular Surgeon", "Rheumatologist"];

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "book-appointment", label: "Book Appointment" },
  { id: "appointments", label: "My Appointments" },
  { id: "records", label: "Medical Records" },
  { id: "tests", label: "Test Results" },
  { id: "prescriptions", label: "Prescriptions" },
  { id: "nearby", label: "Find Doctors Near Me" },
];

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  useEffect(() => {
    if (activeTab === "nearby") {
      fetchDoctors();
    }
  }, [activeTab, selectedSpecialty]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/doctors?action=doctors&specialty=${selectedSpecialty}`);
      const data = await res.json();
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#F2C4CE]/20 to-[#A8EDDF]/20 rounded-2xl p-8 border border-[rgba(168,237,223,0.3)]">
        <h1 className="text-[28px] font-bold text-[#1A2332]">Welcome back, Rahul! 👋</h1>
        <p className="text-[#8A9BB0] mt-2">Your health is our priority. Here's your overview.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Upcoming Appointments", value: "2", icon: "📅", color: "from-[#F2C4CE] to-[#A8EDDF]" },
          { label: "Medical Records", value: "12", icon: "📁", color: "from-[#A8EDDF] to-[#F2C4CE]" },
          { label: "Test Results", value: "5", icon: "🧪", color: "from-[#C9A96E] to-[#D4A89A]" },
          { label: "Prescriptions", value: "3", icon: "💊", color: "from-[#D4A89A] to-[#C9A96E]" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-[rgba(168,237,223,0.2)] hover:border-[rgba(168,237,223,0.5)] hover:shadow-lg transition-all cursor-pointer" onClick={() => setActiveTab(stat.label === "Medical Records" ? "records" : stat.label === "Test Results" ? "tests" : stat.label === "Prescriptions" ? "prescriptions" : "dashboard")}>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl mb-4`}>
              {stat.icon}
            </div>
            <div className="text-[32px] font-bold text-[#1A2332]">{stat.value}</div>
            <div className="text-[13px] text-[#8A9BB0]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-[rgba(168,237,223,0.2)] pb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-[14px] font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] text-[#0a0a0a]"
                : "text-[#8A9BB0] hover:text-[#1A2332] hover:bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Book Appointment Form */}
      {activeTab === "book-appointment" && (
        <div className="bg-white rounded-2xl p-8 border border-[rgba(168,237,223,0.2)]">
          <h3 className="text-[20px] font-bold text-[#1A2332] mb-6">Book New Appointment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[13px] text-[#8A9BB0] mb-2 block">Select Department</label>
              <select className="w-full h-12 px-4 bg-[#F7F9FC] border border-[rgba(168,237,223,0.3)] rounded-xl text-[#1A2332] focus:border-[#A8EDDF] focus:outline-none">
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Dermatology</option>
                <option>Orthopedics</option>
                <option>General Medicine</option>
                <option>Pediatrics</option>
                <option>Gastroenterology</option>
                <option>Ophthalmology</option>
                <option>Pulmonology</option>
                <option>Radiology</option>
                <option>Oncology</option>
                <option>Nephrology</option>
                <option>Urology</option>
                <option>Psychiatry</option>
                <option>Gynecology</option>
                <option>ENT</option>
                <option>Endocrinology</option>
                <option>Vascular Surgery</option>
                <option>Rheumatology</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] text-[#8A9BB0] mb-2 block">Select Doctor</label>
              <select className="w-full h-12 px-4 bg-[#F7F9FC] border border-[rgba(168,237,223,0.3)] rounded-xl text-[#1A2332] focus:border-[#A8EDDF] focus:outline-none">
                <option>Dr. Priya Menon - Cardiologist</option>
                <option>Dr. Rahul Sharma - Neurologist</option>
                <option>Dr. Sunita Devi - Dermatologist</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] text-[#8A9BB0] mb-2 block">Preferred Date</label>
              <input type="date" className="w-full h-12 px-4 bg-[#F7F9FC] border border-[rgba(168,237,223,0.3)] rounded-xl text-[#1A2332] focus:border-[#A8EDDF] focus:outline-none" />
            </div>
            <div>
              <label className="text-[13px] text-[#8A9BB0] mb-2 block">Preferred Time</label>
              <select className="w-full h-12 px-4 bg-[#F7F9FC] border border-[rgba(168,237,223,0.3)] rounded-xl text-[#1A2332] focus:border-[#A8EDDF] focus:outline-none">
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
                <option>04:00 PM</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label className="text-[13px] text-[#8A9BB0] mb-2 block">Symptoms / Reason for Visit</label>
            <textarea className="w-full h-24 px-4 py-3 bg-[#F7F9FC] border border-[rgba(168,237,223,0.3)] rounded-xl text-[#1A2332] placeholder-[#8A9BB0] focus:border-[#A8EDDF] focus:outline-none" placeholder="Describe your symptoms..." />
          </div>
          <button className="mt-6 h-12 px-8 rounded-xl bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] text-[#0a0a0a] font-semibold hover:shadow-[0_0_30px_rgba(168,237,223,0.3)] transition-all">
            Book Appointment
          </button>
        </div>
      )}

      {/* My Appointments */}
      {activeTab === "appointments" && (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-2xl p-6 border border-[rgba(168,237,223,0.2)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-2xl">
                  👨‍⚕️
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A2332]">{apt.doctor}</h4>
                  <p className="text-[13px] text-[#8A9BB0]">{apt.specialty}</p>
                  <p className="text-[12px] text-[#A8EDDF] mt-1">{apt.date} at {apt.time}</p>
                </div>
              </div>
              <span className={`px-4 py-2 rounded-full text-[12px] font-medium ${
                apt.status === "confirmed" ? "bg-green-100 text-green-600" :
                apt.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                "bg-gray-100 text-gray-500"
              }`}>
                {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Medical Records */}
      {activeTab === "records" && (
        <div className="space-y-4">
          {medicalRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-2xl p-6 border border-[rgba(168,237,223,0.2)] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#F7F9FC] border border-[rgba(168,237,223,0.3)] flex items-center justify-center text-2xl">
                  📄
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A2332]">{record.title}</h4>
                  <p className="text-[13px] text-[#8A9BB0]">{record.hospital}</p>
                  <p className="text-[12px] text-[#A8EDDF] mt-1">{record.date}</p>
                </div>
              </div>
              <span className="px-4 py-2 rounded-full text-[12px] font-medium bg-[#A8EDDF]/20 text-[#A8EDDF]">
                {record.type}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Test Results */}
      {activeTab === "tests" && (
        <div className="space-y-4">
          {testResults.map((test) => (
            <div key={test.id} className="bg-white rounded-2xl p-6 border border-[rgba(168,237,223,0.2)] flex items-center justify-between">
              <div>
                <h4 className="text-[16px] font-bold text-[#1A2332]">{test.test}</h4>
                <p className="text-[13px] text-[#8A9BB0]">{test.hospital}</p>
                <p className="text-[12px] text-[#A8EDDF] mt-1">{test.date}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-[12px] font-medium ${
                test.status === "Ready" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
              }`}>
                {test.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Prescriptions */}
      {activeTab === "prescriptions" && (
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="bg-white rounded-2xl p-6 border border-[rgba(168,237,223,0.2)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-[16px] font-bold text-[#1A2332]">{rx.doctor}</h4>
                  <p className="text-[12px] text-[#A8EDDF]">{rx.date}</p>
                </div>
                <span className="text-[12px] text-[#8A9BB0]">Valid until: {rx.validUntil}</span>
              </div>
              <div className="space-y-2">
                {rx.medicines.map((med, i) => (
                  <div key={i} className="flex items-center gap-3 text-[14px] text-[#8A9BB0]">
                    <span className="w-2 h-2 rounded-full bg-[#A8EDDF]" />
                    {med}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Find Doctors Near Me - Map & List */}
      {activeTab === "nearby" && (
        <div className="space-y-6">
          {/* Filter */}
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty.toLowerCase())}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                  selectedSpecialty === specialty.toLowerCase()
                    ? "bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] text-[#0a0a0a]"
                    : "bg-white border border-[rgba(168,237,223,0.3)] text-[#8A9BB0] hover:border-[#A8EDDF]"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="bg-white rounded-2xl p-6 border border-[rgba(168,237,223,0.2)]">
            <h3 className="text-[18px] font-bold text-[#1A2332] mb-4">📍 Doctors Near You</h3>
            <div className="h-64 rounded-xl bg-[#F7F9FC] border border-[rgba(168,237,223,0.2)] flex items-center justify-center relative overflow-hidden">
              {/* Simulated map with dots */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 opacity-20">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="border border-[rgba(168,237,223,0.3)]" />
                ))}
              </div>
              {/* Doctor location markers */}
              <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-[#A8EDDF] animate-pulse" />
              <div className="absolute top-1/2 left-1/3 w-4 h-4 rounded-full bg-[#F2C4CE] animate-pulse" />
              <div className="absolute top-3/4 left-2/3 w-4 h-4 rounded-full bg-[#A8EDDF] animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-[#C9A96E] animate-pulse" />
              <p className="text-[#8A9BB0] text-sm z-10">Interactive Map View</p>
            </div>
          </div>

          {/* Doctors List */}
          <div className="space-y-4">
            <h3 className="text-[18px] font-bold text-[#1A2332]">Found {doctors.length} doctors near you</h3>
            {loading ? (
              <div className="text-[#8A9BB0]">Loading doctors...</div>
            ) : (
              doctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-2xl p-6 border border-[rgba(168,237,223,0.2)]">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-[#0a0a0a] font-bold text-xl">
                      {doctor.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-[18px] font-bold text-[#1A2332]">{doctor.name}</h4>
                          <p className="text-[14px] text-[#8A9BB0]">{doctor.specialty} • {doctor.experience}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-[18px] font-bold text-[#A8EDDF]">⭐ {doctor.rating}</div>
                          <div className="text-[12px] text-[#8A9BB0]">{doctor.distance} away</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[12px] text-[#8A9BB0]">🏥 {doctor.hospital}</span>
                        <span className="text-[12px] text-[#8A9BB0]">•</span>
                        <span className="text-[12px] text-[#8A9BB0]">📍 {doctor.location}</span>
                      </div>
                      <div className="flex gap-3 mt-4">
                        <button className="h-10 px-6 rounded-xl bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] text-[#0a0a0a] font-semibold text-sm">
                          Book Appointment
                        </button>
                        <button className="h-10 px-6 rounded-xl border border-[rgba(168,237,223,0.3)] text-[#1A2332] text-sm hover:bg-[#F7F9FC]">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${doctor.available ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                      {doctor.available ? "Available Today" : "Not Available"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}