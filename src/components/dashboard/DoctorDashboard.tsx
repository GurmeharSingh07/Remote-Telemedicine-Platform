"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getAuthSession } from "@/lib/auth";
import {
    createDoctorReferral,
    fetchDoctorDashboard,
    updateDoctorAppointmentStatus,
    updateDoctorReferralStatus,
    updateDoctorSchedule,
    type DoctorDashboardAppointment,
    type DoctorDashboardChat,
    type DoctorDashboardDoctor,
    type DoctorDashboardPatient,
    type DoctorDashboardPrescription,
    type DoctorDashboardReferral,
    type DoctorDashboardSchedule,
    type DoctorDashboardTest,
} from "@/lib/doctorDashboard";
import {
    AlertCircle,
    Calendar,
    CalendarCheck,
    CheckCircle2,
    Clock,
    Loader2,
    MapPin,
    MessageSquare,
    Plus,
    X,
    XCircle,
} from "lucide-react";

type Appointment = DoctorDashboardAppointment;
type Referral = DoctorDashboardReferral;
type Doctor = DoctorDashboardDoctor;
type Patient = DoctorDashboardPatient;
type TestResultItem = DoctorDashboardTest;
type Prescription = DoctorDashboardPrescription;
type Chat = DoctorDashboardChat;
type DoctorSchedule = DoctorDashboardSchedule;

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
        <div
            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-xl md:text-2xl mb-3 md:mb-4 shadow-[0_4px_12px_rgba(13,115,119,0.2)]`}
        >
            {icon}
        </div>
        <div className="text-xl md:text-[28px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">{value}</div>
        <div className="text-[12px] md:text-[13px] text-[var(--text-muted)] mt-1">{label}</div>
        {trend && <div className="text-[11px] text-green-500 mt-2">{trend}</div>}
    </motion.div>
);

const WORKING_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DEFAULT_SCHEDULE: DoctorSchedule = {
    workingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    startTime: "09:00",
    endTime: "17:00",
    slotDurationMinutes: 30,
    updatedAt: null,
};

interface DoctorDashboardProps {
    activeItem?: string;
    onActiveItemChange?: (item: string) => void;
}

const sortWorkingDays = (days: string[]): string[] => {
    const unique = Array.from(new Set(days.filter((day) => WORKING_DAYS.includes(day))));
    return WORKING_DAYS.filter((day) => unique.includes(day));
};

const normalizeSchedule = (schedule?: Partial<DoctorSchedule> | null): DoctorSchedule => {
    const workingDays = sortWorkingDays(schedule?.workingDays ?? DEFAULT_SCHEDULE.workingDays);

    return {
        workingDays: workingDays.length > 0 ? workingDays : [...DEFAULT_SCHEDULE.workingDays],
        startTime: schedule?.startTime || DEFAULT_SCHEDULE.startTime,
        endTime: schedule?.endTime || DEFAULT_SCHEDULE.endTime,
        slotDurationMinutes:
            Number(schedule?.slotDurationMinutes) > 0
                ? Number(schedule?.slotDurationMinutes)
                : DEFAULT_SCHEDULE.slotDurationMinutes,
        updatedAt: schedule?.updatedAt ?? null,
    };
};

const getInitials = (name: string): string =>
    name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

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
    const [patients, setPatients] = useState<Patient[]>([]);
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [tests, setTests] = useState<TestResultItem[]>([]);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [doctorName, setDoctorName] = useState("Doctor");
    const [schedule, setSchedule] = useState<DoctorSchedule>(DEFAULT_SCHEDULE);
    const [scheduleForm, setScheduleForm] = useState<DoctorSchedule>(DEFAULT_SCHEDULE);
    const [authToken, setAuthToken] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [dashboardError, setDashboardError] = useState("");
    const [actionSuccessMessage, setActionSuccessMessage] = useState("");
    const [updatingAppointmentId, setUpdatingAppointmentId] = useState<string | null>(null);
    const [updatingReferralId, setUpdatingReferralId] = useState<string | null>(null);
    const [submittingReferral, setSubmittingReferral] = useState(false);
    const [updatingSchedule, setUpdatingSchedule] = useState(false);
    const [showReferralModal, setShowReferralModal] = useState(false);
    const [referralForm, setReferralForm] = useState({ patientName: "", toDoctor: "", reason: "" });

    const loadDashboardData = useCallback(async (token: string, showLoadingState = true) => {
        if (showLoadingState) {
            setLoading(true);
        }

        try {
            const data = await fetchDoctorDashboard(token);
            const normalizedSchedule = normalizeSchedule(data.schedule ?? data.doctor.schedule);

            setDoctorName(data.doctor.name || "Doctor");
            setAppointments(data.appointments ?? []);
            setPatients(data.patients ?? []);
            setReferrals(data.referrals ?? []);
            setTests(data.tests ?? []);
            setPrescriptions(data.prescriptions ?? []);
            setChats(data.chats ?? []);
            setDoctors(data.doctors ?? []);
            setSchedule(normalizedSchedule);
            setScheduleForm(normalizedSchedule);
            setDashboardError("");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to load doctor dashboard data.";
            setDashboardError(message);
        } finally {
            if (showLoadingState) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        let isActive = true;

        const initializeDashboard = async () => {
            const session = getAuthSession();
            if (!session) {
                if (isActive) {
                    setDashboardError("Session expired. Please login again.");
                    setLoading(false);
                }
                return;
            }

            if (isActive) {
                setAuthToken(session.token);
                setDoctorName(session.user.name || "Doctor");
            }

            await loadDashboardData(session.token, true);
        };

        initializeDashboard();

        return () => {
            isActive = false;
        };
    }, [loadDashboardData]);

    const patientRecords = useMemo(() => {
        if (patients.length > 0) {
            return patients;
        }

        const map = new Map<string, Patient>();
        appointments.forEach((appointment) => {
            const key = appointment.patientId || appointment.id;
            if (map.has(key)) {
                return;
            }

            map.set(key, {
                id: key,
                name: appointment.patientName,
                email: "",
                condition: appointment.reason || appointment.specialty,
                lastVisit: appointment.date,
                hospital: appointment.hospital,
                avatar: getInitials(appointment.patientName),
                appointmentCount: 1,
            });
        });

        return Array.from(map.values());
    }, [appointments, patients]);

    const scheduleFormComparable = useMemo(
        () => ({ ...scheduleForm, workingDays: sortWorkingDays(scheduleForm.workingDays) }),
        [scheduleForm]
    );

    const scheduleComparable = useMemo(
        () => ({ ...schedule, workingDays: sortWorkingDays(schedule.workingDays) }),
        [schedule]
    );

    const scheduleChanged = useMemo(
        () => JSON.stringify(scheduleFormComparable) !== JSON.stringify(scheduleComparable),
        [scheduleComparable, scheduleFormComparable]
    );

    const handleUpdateAppointmentStatus = async (appointmentId: string, status: Appointment["status"]) => {
        if (!authToken) {
            setDashboardError("Session expired. Please login again.");
            return;
        }

        setUpdatingAppointmentId(appointmentId);
        try {
            const updatedAppointment = await updateDoctorAppointmentStatus(authToken, appointmentId, status);
            setAppointments((prev) => prev.map((appointment) => (appointment.id === appointmentId ? updatedAppointment : appointment)));
            setDashboardError("");
            setActionSuccessMessage(`Appointment ${status} successfully`);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update appointment.";
            setDashboardError(message);
        } finally {
            setUpdatingAppointmentId(null);
        }
    };

    const handleCreateReferral = async () => {
        if (!authToken) {
            setDashboardError("Session expired. Please login again.");
            return;
        }

        if (!referralForm.patientName.trim() || !referralForm.toDoctor.trim() || !referralForm.reason.trim()) {
            setDashboardError("Please fill all referral fields.");
            return;
        }

        setSubmittingReferral(true);
        try {
            await createDoctorReferral(authToken, {
                toDoctor: referralForm.toDoctor.trim(),
                patientName: referralForm.patientName.trim(),
                reason: referralForm.reason.trim(),
            });

            await loadDashboardData(authToken, false);
            setShowReferralModal(false);
            setReferralForm({ patientName: "", toDoctor: "", reason: "" });
            setDashboardError("");
            setActionSuccessMessage("Referral sent successfully");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to create referral.";
            setDashboardError(message);
        } finally {
            setSubmittingReferral(false);
        }
    };

    const handleUpdateReferralStatus = async (referralId: string, status: Referral["status"]) => {
        if (!authToken) {
            setDashboardError("Session expired. Please login again.");
            return;
        }

        setUpdatingReferralId(referralId);
        try {
            const updatedReferral = await updateDoctorReferralStatus(authToken, referralId, status);
            setReferrals((prev) => prev.map((referral) => (referral.id === referralId ? updatedReferral : referral)));
            setDashboardError("");
            setActionSuccessMessage(`Referral ${status} successfully`);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update referral status.";
            setDashboardError(message);
        } finally {
            setUpdatingReferralId(null);
        }
    };

    const toggleWorkingDay = (day: string) => {
        setActionSuccessMessage("");
        setScheduleForm((prev) => {
            const hasDay = prev.workingDays.includes(day);
            const nextDays = hasDay ? prev.workingDays.filter((item) => item !== day) : [...prev.workingDays, day];

            return {
                ...prev,
                workingDays: sortWorkingDays(nextDays),
            };
        });
    };

    const handleScheduleFieldChange = (field: "startTime" | "endTime" | "slotDurationMinutes", value: string) => {
        setActionSuccessMessage("");
        setScheduleForm((prev) => {
            if (field === "slotDurationMinutes") {
                const parsed = Number(value);
                return {
                    ...prev,
                    slotDurationMinutes: Number.isFinite(parsed) && parsed > 0 ? parsed : 30,
                };
            }

            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleUpdateSchedule = async () => {
        if (!authToken) {
            setDashboardError("Session expired. Please login again.");
            return;
        }

        if (scheduleForm.workingDays.length === 0) {
            setDashboardError("Please select at least one working day.");
            return;
        }

        setUpdatingSchedule(true);
        try {
            const updatedSchedule = await updateDoctorSchedule(authToken, {
                workingDays: sortWorkingDays(scheduleForm.workingDays),
                startTime: scheduleForm.startTime,
                endTime: scheduleForm.endTime,
                slotDurationMinutes: scheduleForm.slotDurationMinutes,
            });

            const normalized = normalizeSchedule(updatedSchedule);
            setSchedule(normalized);
            setScheduleForm(normalized);
            setDashboardError("");
            setActionSuccessMessage("Schedule updated successfully");
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update schedule.";
            setDashboardError(message);
        } finally {
            setUpdatingSchedule(false);
        }
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

    const pendingCount = appointments.filter((appointment) => appointment.status === "pending").length;
    const completedCount = appointments.filter((appointment) => appointment.status === "completed").length;
    const showAppointmentsSection = activeTab === "appointments" || activeTab === "dashboard";

    const normalizedDoctorName = doctorName.trim();
    const doctorDisplayName = normalizedDoctorName
        ? /^dr\.?\s/i.test(normalizedDoctorName)
            ? normalizedDoctorName
            : `Dr. ${normalizedDoctorName}`
        : "Doctor";

    return (
        <div className="space-y-4 md:space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[var(--primary-accent)]/10 to-[var(--secondary-accent)]/10 rounded-xl md:rounded-2xl p-4 md:p-6 border border-[var(--primary-accent)]/20"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
                    <div>
                        <h1 className="text-xl md:text-[24px] font-bold text-[var(--foreground)] font-[family-name:var(--font-heading)]">
                            Good morning, {doctorDisplayName}! 👋
                        </h1>
                        <p className="text-[var(--text-muted)] mt-1 text-sm md:text-base">You have {appointments.length} appointments scheduled.</p>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs md:text-sm">
                        <Clock size={16} />
                        <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                    </div>
                </div>
            </motion.div>

            {dashboardError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                    <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-[12px] md:text-sm text-red-500">{dashboardError}</p>
                </div>
            )}

            {actionSuccessMessage && (
                <div className="flex items-start gap-2 rounded-xl border border-green-500/30 bg-green-500/10 p-3">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-[12px] md:text-sm text-green-500">{actionSuccessMessage}</p>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <StatsCard
                    label="Appointments"
                    value={appointments.length}
                    icon={<Calendar size={20} />}
                    trend={pendingCount > 0 ? `${pendingCount} pending` : "All clear"}
                    color="from-[#A8EDDF] to-[#14A3A8]"
                />
                <StatsCard label="Patients" value={patientRecords.length} icon={<MapPin size={20} />} color="from-[#F2C4CE] to-[#C2626A]" />
                <StatsCard label="Referrals" value={referrals.length} icon={<AlertCircle size={20} />} color="from-[#C9A96E] to-[#B8954A]" />
                <StatsCard label="Completed" value={completedCount} icon={<CalendarCheck size={20} />} color="from-[#00E5FF] to-[#B535F6]" />
            </div>

            <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                <div className="flex gap-1 md:gap-2 min-w-max md:min-w-0 md:bg-[var(--background-alt)] md:p-1 md:rounded-xl md:overflow-visible">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5 text-[12px] md:text-[14px] font-medium whitespace-nowrap transition-all rounded-lg md:rounded-xl ${activeTab === tab.id
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

            {showAppointmentsSection && (
                <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)]">Today&apos;s Schedule</h3>
                        <span className="text-xs md:text-sm text-[var(--text-muted)]">{appointments.length} appointments</span>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 size={32} className="animate-spin text-[var(--primary-accent)]" />
                        </div>
                    ) : appointments.length === 0 ? (
                        <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-8 border border-[var(--border-color)] text-center">
                            <Calendar size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
                            <p className="text-[var(--text-muted)]">No appointments found.</p>
                        </div>
                    ) : (
                        appointments.map((appointment, index) => (
                            <motion.div
                                key={appointment.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold shadow-[0_4px_12px_rgba(13,115,119,0.3)] flex-shrink-0">
                                            {getInitials(appointment.patientName)}
                                        </div>
                                        <div>
                                            <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{appointment.patientName}</h4>
                                            <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">{appointment.specialty}</p>
                                            {appointment.reason && <p className="text-[11px] text-[var(--primary-accent)] mt-0.5">Reason: {appointment.reason}</p>}
                                            <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] md:text-[12px]">
                                                <span className="flex items-center gap-1 text-[var(--primary-accent)]">
                                                    <Calendar size={12} /> {appointment.date}
                                                </span>
                                                <span className="flex items-center gap-1 text-[var(--primary-accent)]">
                                                    <Clock size={12} /> {appointment.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 sm:flex-col sm:items-end ml-14 sm:ml-0">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium ${appointment.status === "confirmed"
                                                ? "bg-green-500/10 text-green-500"
                                                : appointment.status === "pending"
                                                    ? "bg-yellow-500/10 text-yellow-500"
                                                    : appointment.status === "completed"
                                                        ? "bg-blue-500/10 text-blue-500"
                                                        : "bg-red-500/10 text-red-500"
                                                }`}
                                        >
                                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                        </span>

                                        {appointment.status === "pending" && (
                                            <div className="flex gap-1.5 md:gap-2">
                                                <button
                                                    onClick={() => handleUpdateAppointmentStatus(appointment.id, "confirmed")}
                                                    disabled={updatingAppointmentId === appointment.id}
                                                    className="px-2.5 md:px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 text-[11px] md:text-xs font-medium hover:bg-green-500/20 disabled:opacity-60"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateAppointmentStatus(appointment.id, "cancelled")}
                                                    disabled={updatingAppointmentId === appointment.id}
                                                    className="px-2.5 md:px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-[11px] md:text-xs font-medium hover:bg-red-500/20 disabled:opacity-60"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}

                                        {appointment.status === "confirmed" && (
                                            <button
                                                onClick={() => handleUpdateAppointmentStatus(appointment.id, "completed")}
                                                disabled={updatingAppointmentId === appointment.id}
                                                className="px-2.5 md:px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-[11px] md:text-xs font-medium hover:bg-blue-500/20 disabled:opacity-60"
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

            {activeTab === "patients" && (
                <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)]">Patient Records</h3>
                        <span className="text-xs md:text-sm text-[var(--text-muted)]">{patientRecords.length} total</span>
                    </div>

                    {patientRecords.length === 0 ? (
                        <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-8 border border-[var(--border-color)] text-center">
                            <MapPin size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
                            <p className="text-[var(--text-muted)]">No patient records available.</p>
                        </div>
                    ) : (
                        patientRecords.map((patient, index) => (
                            <motion.div
                                key={patient.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] hover:border-[var(--primary-accent)]/30 transition-all"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-[var(--secondary-accent)] to-[var(--tertiary)] flex items-center justify-center text-[var(--background)] font-bold shadow-[0_4px_12px_rgba(91,75,138,0.3)] flex-shrink-0">
                                            {patient.avatar || getInitials(patient.name)}
                                        </div>
                                        <div>
                                            <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{patient.name}</h4>
                                            <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">{patient.condition}</p>
                                            <div className="flex items-center gap-1 mt-1 text-[11px] md:text-[12px] text-[var(--primary-accent)]">
                                                <MapPin size={12} />
                                                <span>
                                                    {patient.lastVisit} • {patient.hospital}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[11px] md:text-xs text-[var(--text-muted)]">
                                        {patient.appointmentCount} appointment{patient.appointmentCount === 1 ? "" : "s"}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            )}

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

                    {referrals.length === 0 ? (
                        <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-8 border border-[var(--border-color)] text-center">
                            <AlertCircle size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
                            <p className="text-[var(--text-muted)]">No incoming referrals.</p>
                        </div>
                    ) : (
                        referrals.map((referral) => (
                            <div key={referral.id} className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)]">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-[#F2C4CE] to-[#A8EDDF] flex items-center justify-center text-[#0a0a0a] font-bold flex-shrink-0">
                                            {getInitials(referral.patientName)}
                                        </div>
                                        <div>
                                            <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{referral.patientName}</h4>
                                            <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">From: {referral.fromDoctor}</p>
                                            <p className="text-[11px] md:text-[12px] text-[var(--primary-accent)] mt-0.5">Reason: {referral.reason}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 sm:flex-col sm:items-end ml-14 sm:ml-0">
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1 ${referral.status === "pending"
                                                ? "bg-yellow-500/10 text-yellow-500"
                                                : referral.status === "accepted"
                                                    ? "bg-green-500/10 text-green-500"
                                                    : "bg-red-500/10 text-red-500"
                                                }`}
                                        >
                                            {referral.status === "pending" && <AlertCircle size={10} />}
                                            {referral.status === "accepted" && <CheckCircle2 size={10} />}
                                            {referral.status === "rejected" && <XCircle size={10} />}
                                            {referral.status}
                                        </span>

                                        {referral.status === "pending" && (
                                            <div className="flex gap-1.5">
                                                <button
                                                    onClick={() => handleUpdateReferralStatus(referral.id, "accepted")}
                                                    disabled={updatingReferralId === referral.id}
                                                    className="px-2.5 py-1.5 rounded-lg bg-green-500/10 text-green-500 text-[11px] font-medium disabled:opacity-60"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateReferralStatus(referral.id, "rejected")}
                                                    disabled={updatingReferralId === referral.id}
                                                    className="px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-[11px] font-medium disabled:opacity-60"
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
            )}

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
                            onClick={(event) => event.stopPropagation()}
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
                                    <input
                                        type="text"
                                        value={referralForm.patientName}
                                        onChange={(event) => setReferralForm((prev) => ({ ...prev, patientName: event.target.value }))}
                                        className="w-full h-11 px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm"
                                        placeholder="Enter patient name"
                                    />
                                </div>

                                <div>
                                    <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 block">Refer to Doctor</label>
                                    <select
                                        value={referralForm.toDoctor}
                                        onChange={(event) => setReferralForm((prev) => ({ ...prev, toDoctor: event.target.value }))}
                                        className="w-full h-11 px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm"
                                    >
                                        <option value="">Select a doctor</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor.id} value={doctor.name}>
                                                {doctor.name} - {doctor.specialty}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 block">Reason for Referral</label>
                                    <textarea
                                        value={referralForm.reason}
                                        onChange={(event) => setReferralForm((prev) => ({ ...prev, reason: event.target.value }))}
                                        className="w-full h-20 md:h-24 px-4 py-3 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm resize-none"
                                        placeholder="Describe the reason..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowReferralModal(false)}
                                    className="flex-1 h-11 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] font-medium text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateReferral}
                                    disabled={submittingReferral}
                                    className="flex-1 h-11 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] font-semibold text-sm disabled:opacity-70"
                                >
                                    {submittingReferral ? "Sending..." : "Send"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {activeTab === "tests" && (
                <div className="space-y-3 md:space-y-4">
                    <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)]">Tests</h3>

                    {tests.length === 0 ? (
                        <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-8 border border-[var(--border-color)] text-center">
                            <Calendar size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
                            <p className="text-[var(--text-muted)]">No test records available.</p>
                        </div>
                    ) : (
                        tests.map((test) => (
                            <div
                                key={test.id}
                                className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                            >
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-r from-[#A8EDDF] to-[#14A3A8] flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
                                        {test.icon || "🧪"}
                                    </div>
                                    <div>
                                        <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{test.patientName}</h4>
                                        <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">Test: {test.test}</p>
                                        <div className="flex items-center gap-1 mt-1 text-[11px] md:text-[12px] text-[var(--primary-accent)]">
                                            <Calendar size={12} />
                                            <span>
                                                {test.date} • {test.hospital}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <span
                                    className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium ${test.status.toLowerCase().includes("ready") || test.status.toLowerCase().includes("complete")
                                        ? "bg-green-500/10 text-green-500"
                                        : "bg-yellow-500/10 text-yellow-500"
                                        }`}
                                >
                                    {test.status}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === "prescriptions" && (
                <div className="space-y-3 md:space-y-4">
                    <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)]">Prescriptions</h3>

                    {prescriptions.length === 0 ? (
                        <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-8 border border-[var(--border-color)] text-center">
                            <Calendar size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
                            <p className="text-[var(--text-muted)]">No prescriptions available.</p>
                        </div>
                    ) : (
                        prescriptions.map((prescription) => (
                            <div key={prescription.id} className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-5 border border-[var(--border-color)]">
                                <div className="flex items-center justify-between gap-3 mb-3">
                                    <div>
                                        <h4 className="text-[14px] md:text-[15px] font-semibold text-[var(--foreground)]">{prescription.patientName}</h4>
                                        <p className="text-[11px] md:text-[12px] text-[var(--text-muted)]">{prescription.date}</p>
                                    </div>
                                    <span className="text-[11px] md:text-xs text-[var(--text-muted)]">Valid till: {prescription.validUntil}</span>
                                </div>

                                <div className="space-y-1.5">
                                    {prescription.medicines.length > 0 ? (
                                        prescription.medicines.map((medicine) => (
                                            <div key={`${prescription.id}-${medicine}`} className="text-[12px] md:text-[13px] text-[var(--text-muted)]">
                                                • {medicine}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-[12px] text-[var(--text-muted)]">No medicine details provided.</p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {activeTab === "chat" && (
                <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[var(--border-color)]">
                    <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)] mb-4">Chat with Patients</h3>

                    {chats.length === 0 ? (
                        <div className="text-center py-8">
                            <MessageSquare size={28} className="mx-auto text-[var(--text-muted)] mb-2" />
                            <p className="text-[var(--text-muted)]">No chat threads yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-2 md:space-y-3">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-[var(--background)] border border-[var(--border-color)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] flex items-center justify-center text-[var(--background)] font-bold text-sm">
                                            {getInitials(chat.patientName)}
                                        </div>
                                        <div>
                                            <p className="text-[13px] md:text-[14px] text-[var(--foreground)] font-medium">{chat.patientName}</p>
                                            <p className="text-[11px] text-[var(--text-muted)]">{chat.lastMessage}</p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[11px] text-[var(--text-muted)]">{chat.lastInteraction}</p>
                                        {chat.unreadCount > 0 && (
                                            <span className="inline-flex mt-1 px-2 py-0.5 text-[10px] rounded-full bg-[var(--primary-accent)]/20 text-[var(--primary-accent)]">
                                                {chat.unreadCount} unread
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === "schedule" && (
                <div className="bg-[var(--background-alt)] rounded-xl md:rounded-2xl p-4 md:p-6 border border-[var(--border-color)]">
                    <h3 className="text-base md:text-[16px] font-bold text-[var(--foreground)] mb-4">My Schedule</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        <div>
                            <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-3 block">Working Days</label>
                            <div className="flex flex-wrap gap-2">
                                {WORKING_DAYS.map((day) => {
                                    const active = scheduleForm.workingDays.includes(day);
                                    return (
                                        <button
                                            key={day}
                                            onClick={() => toggleWorkingDay(day)}
                                            className={`px-3 md:px-4 py-2 rounded-lg text-[12px] md:text-sm font-medium border transition-colors ${active
                                                ? "bg-[var(--primary-accent)]/15 border-[var(--primary-accent)]/50 text-[var(--primary-accent)]"
                                                : "bg-transparent border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--primary-accent)]/30"
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-3 block">Working Hours</label>
                            <div className="flex items-center gap-2 md:gap-4 mb-3">
                                <input
                                    type="time"
                                    className="flex-1 h-11 px-3 md:px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm"
                                    value={scheduleForm.startTime}
                                    onChange={(event) => handleScheduleFieldChange("startTime", event.target.value)}
                                />
                                <span className="text-[var(--text-muted)] text-sm">to</span>
                                <input
                                    type="time"
                                    className="flex-1 h-11 px-3 md:px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm"
                                    value={scheduleForm.endTime}
                                    onChange={(event) => handleScheduleFieldChange("endTime", event.target.value)}
                                />
                            </div>

                            <label className="text-[12px] md:text-[13px] text-[var(--text-muted)] mb-2 block">Slot Duration (minutes)</label>
                            <input
                                type="number"
                                min={5}
                                max={180}
                                className="w-full h-11 px-3 md:px-4 bg-[var(--background)] border border-[var(--border-color)] rounded-xl text-[var(--foreground)] text-sm"
                                value={scheduleForm.slotDurationMinutes}
                                onChange={(event) => handleScheduleFieldChange("slotDurationMinutes", event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-3 text-[11px] text-[var(--text-muted)]">
                        Last updated: {schedule.updatedAt ? new Date(schedule.updatedAt).toLocaleString() : "Not updated yet"}
                    </div>

                    <button
                        onClick={handleUpdateSchedule}
                        disabled={updatingSchedule || !scheduleChanged}
                        className="mt-6 w-full sm:w-auto h-11 px-6 rounded-xl bg-gradient-to-r from-[var(--primary-accent)] to-[var(--secondary-accent)] text-[var(--background)] font-semibold text-sm disabled:opacity-60"
                    >
                        {updatingSchedule ? "Updating..." : "Update Schedule"}
                    </button>
                </div>
            )}
        </div>
    );
}
