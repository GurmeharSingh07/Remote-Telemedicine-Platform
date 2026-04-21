"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  FlaskConical,
  Pill,
  MessageSquare,
  MapPin,
  Star,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Navigation,
  Phone,
  Building2,
  Plus,
  X,
  CheckCircle2,
  Loader2,
  User,
  AlertCircle,
  ListFilter,
} from "lucide-react";

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

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const StatsCard = ({ label, value, icon, color, onClick }: StatsCardProps) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(13,115,119,0.15)" }}
    onClick={onClick}
    className="bg-[var(--background-alt)] rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 cursor-pointer transition-all"
  >
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-4 shadow-[0_4px_12px_rgba(13,115,119,0.2)]`}>
      {icon}
    </div>
    <div className="text-xl md:text-[28px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">{value}</div>
    <div className="text-[12px] md:text-[13px] text-[var(--text-muted)] mt-1">{label}</div>
  </motion.div>
);

const appointments: Appointment[] = [
  { id: 1, patientId: "patient-001", patientName: "Rahul Sharma", doctorId: 1, doctorName: "Dr. Priya Menon", specialty: "Cardiologist", hospital: "Apollo Chennai", date: "2026-04-21", time: "10:00 AM", status: "confirmed" },
  { id: 2, patientId: "patient-001", patientName: "Rahul Sharma", doctorId: 2, doctorName: "Dr. Rahul Sharma", specialty: "Neurologist", hospital: "Fortis Mumbai", date: "2026-04-23", time: "2:30 PM", status: "pending" },
  { id: 3, patientId: "patient-001", patientName: "Rahul Sharma", doctorId: 3, doctorName: "Dr. Sunita Devi", specialty: "Dermatologist", hospital: "Max Delhi", date: "2026-04-05", time: "11:00 AM", status: "completed" },
];

const medicalRecords = [
  { id: 1, title: "Annual Health Checkup", date: "2026-03-15", hospital: "Apollo Chennai", type: "Checkup", icon: "📋" },
  { id: 2, title: "ECG Report", date: "2026-02-20", hospital: "Fortis Mumbai", type: "Test", icon: "❤️" },
  { id: 3, title: "Blood Test Results", date: "2026-01-10", hospital: "Max Delhi", type: "Lab", icon: "🩸" },
];

const testResults = [
  { id: 1, test: "Complete Blood Count", date: "2026-04-01", status: "Ready", hospital: "Apollo Chennai", icon: "🔬" },
  { id: 2, test: "Lipid Profile", date: "2026-04-01", status: "Ready", hospital: "Apollo Chennai", icon: "🧪" },
  { id: 3, test: "Thyroid Function", date: "2026-03-25", status: "Pending", hospital: "Max Delhi", icon: "🧬" },
];

const prescriptions = [
  { id: 1, doctor: "Dr. Priya Menon", date: "2026-04-05", medicines: ["Aspirin 75mg", "Metoprolol 50mg"], validUntil: "2026-05-05" },
  { id: 2, doctor: "Dr. Rahul Sharma", date: "2026-03-20", medicines: ["Vitamin D3 1000IU", "Calcium 500mg"], validUntil: "2026-04-20" },
];

const specialties = [
  "All", "Cardiologist", "Neurologist", "Dermatologist", "Orthopedic",
  "Pediatrician", "Gastroenterologist", "General Physician", "Pulmonologist",
  "Radiologist", "Oncologist", "Nephrologist", "Urologist", "Psychiatrist",
  "Gynecologist", "ENT", "Endocrinologist", "Vascular Surgeon", "Rheumatologist"
];

interface PatientDashboardProps {
  activeItem?: string;
  onActiveItemChange?: (item: string) => void;
}

export default function PatientDashboard({ activeItem: externalActiveItem, onActiveItemChange }: PatientDashboardProps) {
  const [internalActiveTab, setInternalActiveTab] = useState("dashboard");
  const activeTab = externalActiveItem !== undefined ? externalActiveItem : internalActiveTab;
  const setActiveTab = (item: string) => {
    if (onActiveItemChange) {
      onActiveItemChange(item);
    } else {
      setInternalActiveTab(item);
    }
  };
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMapFullscreen, setShowMapFullscreen] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "book-appointment", label: "Book", icon: Plus },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "records", label: "Records", icon: FileText },
    { id: "tests", label: "Tests", icon: FlaskConical },
    { id: "prescriptions", label: "Rx", icon: Pill },
    { id: "nearby", label: "Doctors", icon: MapPin },
  ];

  useEffect(() => {
    if (activeTab === "nearby" || activeTab === "book-appointment") {
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

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !bookingForm.date || !bookingForm.time) {
      setBookingError("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "bookAppointment",
          patientId: "patient-001",
          patientName: "Rahul Sharma",
          doctorId: selectedDoctor.id,
          doctorName: selectedDoctor.name,
          specialty: selectedDoctor.specialty,
          hospital: selectedDoctor.hospital,
          date: bookingForm.date,
          time: bookingForm.time,
          reason: bookingForm.reason,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingSuccess(true);
        setBookingError("");
        setTimeout(() => {
          setShowBookingModal(false);
          setBookingSuccess(false);
          setSelectedDoctor(null);
          setBookingForm({ date: "", time: "", reason: "" });
          setActiveTab("appointments");
        }, 2000);
      } else {
        setBookingError(data.error || "Failed to book appointment");
      }
    } catch (error) {
      setBookingError("Something went wrong. Please try again.");
    }
  };

  const openBookingModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
    setBookingSuccess(false);
    setBookingError("");
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-xl md:text-[24px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">Welcome back, Rahul! 👋</h1>
            <p className="text-[var(--text-muted)] mt-1 text-sm md:text-base">Your health is our priority.</p>
          </div>
          <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs md:text-sm">
            <Clock size={16} />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatsCard label="Appointments" value={appointments.filter(a => a.status !== "completed").length} icon="📅" color="from-[#F2C4CE] to-[#C2626A]" onClick={() => setActiveTab("appointments")} />
        <StatsCard label="Records" value={medicalRecords.length} icon="📁" color="from-[#A8EDDF] to-[#14A3A8]" onClick={() => setActiveTab("records")} />
        <StatsCard label="Test Results" value={testResults.length} icon="🔬" color="from-[#C9A96E] to-[#B8954A]" onClick={() => setActiveTab("tests")} />
        <StatsCard label="Prescriptions" value={prescriptions.length} icon="💊" color="from-[#00E5FF] to-[#B535F6]" onClick={() => setActiveTab("prescriptions")} />
      </div>

      {/* Tab Navigation - Horizontal Scroll on Mobile */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-1 md:gap-2 border-b border-[var(--border-color)] min-w-max md:min-w-0 md:border-b-0 md:bg-[var(--background-alt)] md:p-1 md:rounded-xl md:overflow-visible">
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
              <span className="sm:hidden">{tab.label.substring(0, 4)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Book Appointment */}
      {activeTab === "book-appointment" && (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Book New Appointment</h3>
            <span className="text-xs md:text-sm text-[var(--text-muted)]">{filteredDoctors.length} doctors available</span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 md:h-12 pl-12 pr-4 bg-[var(--background-alt)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] placeholder-[var(--text-muted)] text-sm md:text-base"
            />
          </div>

          {/* Specialty Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:m-0 md:p-0">
            {specialties.slice(0, 10).map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty.toLowerCase())}
                className={`px-3 py-1.5 rounded-full text-[11px] md:text-[13px] font-medium whitespace-nowrap transition-all ${
                  selectedSpecialty === specialty.toLowerCase()
                    ? "bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)]"
                    : "bg-[var(--background-alt)] border border-[var(--border-color)] text-[var(--text-muted)]"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>

          {/* Doctors Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={32} className="animate-spin text-[var(--primary-accent)]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDoctors.slice(0, 6).map((doctor) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold text-lg md:text-xl shadow-[0_4px_12px_rgba(13,115,119,0.3)] flex-shrink-0">
                      {doctor.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[15px] md:text-[16px] font-bold text-[var(--foreground)] truncate">{doctor.name}</h4>
                      <p className="text-[11px] md:text-[13px] text-[var(--text-muted)]">{doctor.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={12} className="text-[var(--gold)] fill-current" />
                        <span className="text-xs text-[var(--gold)]">{doctor.rating}</span>
                        <span className="text-[11px] text-[var(--text-muted)]">• {doctor.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[11px] md:text-[12px] text-[var(--text-muted)]">
                    <Building2 size={12} />
                    <span className="truncate">{doctor.hospital}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {doctor.distance}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => openBookingModal(doctor)}
                      className="flex-1 h-9 md:h-10 rounded-lg bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] text-[12px] md:text-[14px] font-semibold"
                    >
                      Book Now
                    </button>
                    <button className="h-9 md:h-10 px-3 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)]">
                      <Phone size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* My Appointments */}
      {activeTab === "appointments" && (
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg font-bold text-[var(--foreground)]">My Appointments</h3>
          {appointments.length === 0 ? (
            <div className="bg-[var(--background-alt)] rounded-2xl p-8 border border-[var(--border-color)] text-center">
              <Calendar size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
              <p className="text-[var(--text-muted)]">No appointments yet</p>
            </div>
          ) : (
            appointments.map((apt, i) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold shadow-[0_4px_12px_rgba(13,115,119,0.3)] flex-shrink-0">
                      {apt.doctorName.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{apt.doctorName}</h4>
                      <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">{apt.specialty}</p>
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
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium ${
                      apt.status === "confirmed" ? "bg-green-500/10 text-green-500" :
                      apt.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                      apt.status === "completed" ? "bg-blue-500/10 text-blue-500" :
                      "bg-red-500/10 text-red-500"
                    }`}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                    {apt.status === "pending" && (
                      <button className="text-[11px] md:text-xs text-red-500 hover:underline">Cancel</button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Medical Records */}
      {activeTab === "records" && (
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg font-bold text-[var(--foreground)]">Medical Records</h3>
          {medicalRecords.map((record, i) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-2xl flex-shrink-0">
                  {record.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{record.title}</h4>
                  <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">{record.hospital}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={12} className="text-[var(--primary-accent)]" />
                    <span className="text-[11px] md:text-[12px] text-[var(--primary-accent)]">{record.date}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium bg-[var(--primary-accent)]/10 text-[var(--primary-accent)]">
                  {record.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Test Results */}
      {activeTab === "tests" && (
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg font-bold text-[var(--foreground)]">Test Results</h3>
          {testResults.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-2xl flex-shrink-0">
                  {test.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{test.test}</h4>
                  <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">{test.hospital}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar size={12} className="text-[var(--primary-accent)]" />
                    <span className="text-[11px] md:text-[12px] text-[var(--primary-accent)]">{test.date}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium ${
                  test.status === "Ready" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                }`}>
                  {test.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Prescriptions */}
      {activeTab === "prescriptions" && (
        <div className="space-y-3 md:space-y-4">
          <h3 className="text-lg font-bold text-[var(--foreground)]">Prescriptions</h3>
          {prescriptions.map((rx, i) => (
            <motion.div
              key={rx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)]"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{rx.doctor}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar size={12} className="text-[var(--primary-accent)]" />
                    <span className="text-[11px] md:text-[12px] text-[var(--primary-accent)]">{rx.date}</span>
                  </div>
                </div>
                <span className="text-[11px] md:text-[12px] text-[var(--text-muted)]">Valid until: {rx.validUntil}</span>
              </div>
              <div className="space-y-2">
                {rx.medicines.map((med, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[13px] md:text-[14px] text-[var(--text-muted)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--primary-accent)]" />
                    {med}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Find Doctors Near Me - Map & List */}
      {activeTab === "nearby" && (
        <div className="space-y-4 md:space-y-6">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search doctors, hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-[var(--background-alt)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] placeholder-[var(--text-muted)]"
              />
            </div>
            <button className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl bg-[var(--background-alt)] border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--primary-accent)]">
              <Filter size={16} /> Filter
            </button>
          </div>

          {/* Specialty Pills */}
          <div className="flex flex-wrap gap-2">
            {specialties.slice(0, 8).map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty.toLowerCase())}
                className={`px-3 py-1.5 md:px-4 py-2 rounded-full text-[12px] md:text-[13px] font-medium transition-all ${
                  selectedSpecialty === specialty.toLowerCase()
                    ? "bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)]"
                    : "bg-[var(--background-alt)] border border-[var(--border-color)] text-[var(--text-muted)]"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>

          {/* Map Section */}
          <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl border border-[var(--border-color)] overflow-hidden">
            <div className="flex items-center justify-between p-3 md:p-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center">
                  <MapPin size={16} className="text-[var(--background)]" />
                </div>
                <div>
                  <h3 className="text-[14px] md:text-[16px] font-bold text-[var(--foreground)]">Doctors Near You</h3>
                  <p className="text-[10px] md:text-[12px] text-[var(--text-muted)]">{filteredDoctors.length} found</p>
                </div>
              </div>
              <button
                onClick={() => setShowMapFullscreen(!showMapFullscreen)}
                className="px-3 py-1.5 md:px-4 py-2 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] text-[11px] md:text-[13px] font-medium flex items-center gap-1"
              >
                <Navigation size={12} /> {showMapFullscreen ? "Exit" : "Fullscreen"}
              </button>
            </div>

            {/* Map */}
            <div className={`relative ${showMapFullscreen ? "h-[70vh]" : "h-48 md:h-64"}`}>
              <div className="absolute inset-0 bg-[var(--background)]">
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
                  <line x1="0" y1="200" x2="800" y2="200" stroke="var(--border-color)" strokeWidth="3" />
                  <line x1="400" y1="0" x2="400" y2="400" stroke="var(--border-color)" strokeWidth="3" />
                  <line x1="100" y1="100" x2="700" y2="100" stroke="var(--border-color)" strokeWidth="2" />
                  <line x1="100" y1="300" x2="700" y2="300" stroke="var(--border-color)" strokeWidth="2" />
                </svg>
              </div>

              {/* Doctor Markers */}
              {filteredDoctors.slice(0, 4).map((doctor, i) => {
                const positions = [
                  { left: "20%", top: "25%" },
                  { left: "50%", top: "30%" },
                  { left: "70%", top: "65%" },
                  { left: "30%", top: "70%" },
                ];
                return (
                  <div key={doctor.id} className="absolute" style={{ left: positions[i].left, top: positions[i].top }}>
                    <div className="relative group">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] text-xs md:text-sm font-bold shadow-[0_4px_12px_rgba(13,115,119,0.5)] animate-pulse">
                        {i + 1}
                      </div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[var(--background-alt)] px-2 py-1 rounded-lg text-[10px] md:text-xs text-[var(--foreground)] whitespace-nowrap border border-[var(--border-color)] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
                        {doctor.name}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* User Location */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-[var(--primary-accent)] animate-ping" />
                  <div className="w-4 h-4 rounded-full bg-[var(--primary-accent)] absolute top-0 left-0" />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-[var(--primary-accent)] font-medium hidden md:block">You</div>
                </div>
              </div>
            </div>
          </div>

          {/* Doctors List */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-[14px] md:text-[16px] font-bold text-[var(--foreground)]">Available Doctors</h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={32} className="animate-spin text-[var(--primary-accent)]" />
              </div>
            ) : filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, i) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold text-lg md:text-xl shadow-[0_4px_12px_rgba(13,115,119,0.3)] flex-shrink-0">
                      {doctor.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-[15px] md:text-[16px] font-bold text-[var(--foreground)]">{doctor.name}</h4>
                          <p className="text-[12px] md:text-[13px] text-[var(--text-muted)]">{doctor.specialty} • {doctor.experience}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 text-[var(--gold)]">
                            <Star size={14} fill="currentColor" />
                            <span className="font-bold text-[14px]">{doctor.rating}</span>
                          </div>
                          <div className="text-[11px] text-[var(--text-muted)]">{doctor.distance}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] md:text-[12px] text-[var(--text-muted)]">
                        <span className="flex items-center gap-1"><Building2 size={12} /> {doctor.hospital}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {doctor.location}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => openBookingModal(doctor)}
                          className="flex-1 h-9 md:h-10 rounded-lg bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] text-[12px] md:text-[13px] font-semibold"
                        >
                          Book Appointment
                        </button>
                        <button className="h-9 md:h-10 px-3 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] flex items-center justify-center">
                          <Phone size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium ${doctor.available ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}`}>
                      {doctor.available ? "Available Today" : "Not Available"}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-[var(--background-alt)] rounded-2xl p-8 border border-[var(--border-color)] text-center">
                <MapPin size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
                <p className="text-[var(--text-muted)]">No doctors found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedDoctor && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !bookingSuccess && setShowBookingModal(false)}
          >
            <motion.div
              className="bg-[var(--background-alt)] rounded-2xl p-5 md:p-6 border border-[var(--border-color)] max-w-md w-full shadow-[var(--shadow-elevated)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {bookingSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Appointment Booked!</h3>
                  <p className="text-[var(--text-muted)]">Your appointment with {selectedDoctor.name} has been confirmed.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[var(--foreground)]">Book Appointment</h3>
                    <button onClick={() => setShowBookingModal(false)} className="p-2 rounded-lg hover:bg-[var(--background)]">
                      <X size={18} className="text-[var(--text-muted)]" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)] mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold">
                      {selectedDoctor.image}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)]">{selectedDoctor.name}</h4>
                      <p className="text-[12px] text-[var(--text-muted)]">{selectedDoctor.specialty} • {selectedDoctor.hospital}</p>
                    </div>
                  </div>

                  {bookingError && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 mb-4">
                      <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
                      <p className="text-[13px] text-red-500">{bookingError}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[12px] text-[var(--text-muted)] mb-2 block">Date *</label>
                        <input
                          type="date"
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full h-11 px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[12px] text-[var(--text-muted)] mb-2 block">Time *</label>
                        <select
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                          className="w-full h-11 px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm"
                        >
                          <option value="">Select time</option>
                          <option value="09:00 AM">09:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="03:00 PM">03:00 PM</option>
                          <option value="04:00 PM">04:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-[12px] text-[var(--text-muted)] mb-2 block">Reason for Visit</label>
                      <textarea
                        value={bookingForm.reason}
                        onChange={(e) => setBookingForm({ ...bookingForm, reason: e.target.value })}
                        className="w-full h-20 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm resize-none"
                        placeholder="Describe your symptoms..."
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 h-11 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBookAppointment}
                      className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] font-semibold"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}