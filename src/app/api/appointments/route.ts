import { NextResponse } from "next/server";

// In-memory store for appointments (in production, use a database)
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
  status: "pending" | "confirmed" | "completed" | "cancelled";
  reason?: string;
  createdAt: string;
}

// Mock existing appointments
const appointments: Appointment[] = [
  {
    id: 1,
    patientId: "patient-001",
    patientName: "Rahul Sharma",
    doctorId: 1,
    doctorName: "Dr. Priya Menon",
    specialty: "Cardiologist",
    hospital: "Apollo Chennai",
    date: "2026-04-21",
    time: "10:00 AM",
    status: "confirmed",
    reason: "Follow-up consultation",
    createdAt: "2026-04-15T10:00:00Z",
  },
  {
    id: 2,
    patientId: "patient-001",
    patientName: "Rahul Sharma",
    doctorId: 2,
    doctorName: "Dr. Rahul Sharma",
    specialty: "Neurologist",
    hospital: "Fortis Mumbai",
    date: "2026-04-23",
    time: "2:30 PM",
    status: "pending",
    reason: "New consultation - headaches",
    createdAt: "2026-04-18T14:30:00Z",
  },
  {
    id: 3,
    patientId: "patient-002",
    patientName: "Priya Menon",
    doctorId: 1,
    doctorName: "Dr. Priya Menon",
    specialty: "Cardiologist",
    hospital: "Apollo Chennai",
    date: "2026-04-20",
    time: "9:00 AM",
    status: "confirmed",
    reason: "Annual checkup",
    createdAt: "2026-04-10T09:00:00Z",
  },
];

// Get appointments - can filter by patientId, doctorId, or get all for a specific doctor
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get("patientId");
  const doctorId = searchParams.get("doctorId");
  const action = searchParams.get("action");

  // Get appointments for a specific doctor (for doctor dashboard)
  if (doctorId) {
    const doctorAppointments = appointments.filter(
      apt => apt.doctorId === parseInt(doctorId) && apt.status !== "cancelled"
    );
    return NextResponse.json({
      success: true,
      appointments: doctorAppointments,
      total: doctorAppointments.length,
    });
  }

  // Get appointments for a specific patient
  if (patientId) {
    const patientAppointments = appointments.filter(
      apt => apt.patientId === patientId
    );
    return NextResponse.json({
      success: true,
      appointments: patientAppointments,
      total: patientAppointments.length,
    });
  }

  // Get all appointments
  return NextResponse.json({
    success: true,
    appointments: appointments,
    total: appointments.length,
  });
}

// Create new appointment
export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;

  if (action === "bookAppointment") {
    const { patientId, patientName, doctorId, doctorName, specialty, hospital, date, time, reason } = body;

    // Check if the slot is already booked
    const existingAppointment = appointments.find(
      apt => apt.doctorId === doctorId && apt.date === date && apt.time === time && apt.status !== "cancelled"
    );

    if (existingAppointment) {
      return NextResponse.json({
        success: false,
        error: "This time slot is already booked. Please select a different time.",
      }, { status: 400 });
    }

    const newAppointment: Appointment = {
      id: appointments.length + 1,
      patientId,
      patientName,
      doctorId,
      doctorName,
      specialty,
      hospital,
      date,
      time,
      status: "pending",
      reason: reason || "",
      createdAt: new Date().toISOString(),
    };

    appointments.push(newAppointment);

    return NextResponse.json({
      success: true,
      appointment: newAppointment,
      message: "Appointment booked successfully!",
    });
  }

  // Update appointment status (confirm, cancel, complete)
  if (action === "updateStatus") {
    const { appointmentId, status } = body;
    const appointmentIndex = appointments.findIndex(apt => apt.id === appointmentId);

    if (appointmentIndex === -1) {
      return NextResponse.json({
        success: false,
        error: "Appointment not found",
      }, { status: 404 });
    }

    appointments[appointmentIndex].status = status;

    return NextResponse.json({
      success: true,
      appointment: appointments[appointmentIndex],
      message: `Appointment ${status} successfully`,
    });
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
}