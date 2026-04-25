export interface DoctorDashboardDoctor {
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    location: string;
    rating: number;
    available: boolean;
    image: string;
    experience?: string;
    distance?: string;
    phone?: string;
    schedule?: DoctorDashboardSchedule;
}

export interface DoctorDashboardAppointment {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    specialty: string;
    hospital: string;
    date: string;
    time: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    reason?: string;
    createdAt?: string;
}

export interface DoctorDashboardReferral {
    id: string;
    fromDoctor: string;
    toDoctor: string;
    patientName: string;
    reason: string;
    status: "pending" | "accepted" | "rejected";
    date: string;
    createdAt?: string;
}

export interface DoctorDashboardPatient {
    id: string;
    name: string;
    email: string;
    condition: string;
    lastVisit: string;
    hospital: string;
    avatar: string;
    appointmentCount: number;
}

export interface DoctorDashboardTest {
    id: string;
    patientId: string;
    patientName: string;
    test: string;
    date: string;
    status: string;
    hospital: string;
    icon: string;
}

export interface DoctorDashboardPrescription {
    id: string;
    patientId: string;
    patientName: string;
    doctor: string;
    date: string;
    medicines: string[];
    validUntil: string;
}

export interface DoctorDashboardChat {
    id: string;
    patientId: string;
    patientName: string;
    lastMessage: string;
    lastInteraction: string;
    unreadCount: number;
}

export interface DoctorDashboardSchedule {
    workingDays: string[];
    startTime: string;
    endTime: string;
    slotDurationMinutes: number;
    updatedAt?: string | null;
}

export interface DoctorDashboardPayload {
    doctor: DoctorDashboardDoctor;
    appointments: DoctorDashboardAppointment[];
    patients: DoctorDashboardPatient[];
    referrals: DoctorDashboardReferral[];
    tests: DoctorDashboardTest[];
    prescriptions: DoctorDashboardPrescription[];
    chats: DoctorDashboardChat[];
    doctors: DoctorDashboardDoctor[];
    schedule: DoctorDashboardSchedule;
}

interface ApiResponse<T> {
    success: boolean;
    status?: number;
    message?: string;
    data: T;
}

const DEFAULT_BACKEND_BASE_URLS = ["http://localhost:5001", "http://localhost:5000"];
const configuredBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
const BACKEND_BASE_URLS = (configuredBackendUrl ? [configuredBackendUrl] : DEFAULT_BACKEND_BASE_URLS).map((url) =>
    url.replace(/\/$/, "")
);
const PRIMARY_BACKEND_BASE_URL = BACKEND_BASE_URLS[0];

function createAuthHeaders(token: string, existingHeaders?: HeadersInit): Headers {
    const headers = new Headers(existingHeaders);
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
    for (const baseUrl of BACKEND_BASE_URLS) {
        const headers = new Headers(init.headers);

        if (!headers.has("Content-Type") && init.body) {
            headers.set("Content-Type", "application/json");
        }

        try {
            const response = await fetch(`${baseUrl}${path}`, {
                ...init,
                headers,
                cache: "no-store",
            });

            const payload = await response.json().catch(() => null);

            if (!response.ok || payload?.success === false) {
                throw new Error(payload?.message || `Request failed with status ${response.status}`);
            }

            if (!payload) {
                throw new Error("Empty response received from backend.");
            }

            return payload as T;
        } catch (error) {
            const isNetworkError = error instanceof TypeError;
            const isLastAttempt = baseUrl === BACKEND_BASE_URLS[BACKEND_BASE_URLS.length - 1];

            if (!isNetworkError || !isLastAttempt) {
                if (!isNetworkError) {
                    throw error;
                }

                continue;
            }

            const attemptedTargets = BACKEND_BASE_URLS.join(", ");
            const setupHint = configuredBackendUrl
                ? `Please verify NEXT_PUBLIC_BACKEND_URL (${PRIMARY_BACKEND_BASE_URL}) and ensure the backend is running.`
                : `Please set NEXT_PUBLIC_BACKEND_URL in .env.local (for example ${PRIMARY_BACKEND_BASE_URL}) and restart the frontend.`;

            throw new Error(`Unable to reach the backend doctor dashboard server. Tried: ${attemptedTargets}. ${setupHint}`);
        }
    }

    throw new Error("Unable to process doctor dashboard request.");
}

export async function fetchDoctorDashboard(token: string): Promise<DoctorDashboardPayload> {
    const payload = await request<ApiResponse<DoctorDashboardPayload>>("/api/doctor/dashboard", {
        method: "GET",
        headers: createAuthHeaders(token),
    });

    return payload.data;
}

export async function updateDoctorAppointmentStatus(
    token: string,
    appointmentId: string,
    status: DoctorDashboardAppointment["status"]
): Promise<DoctorDashboardAppointment> {
    const payload = await request<ApiResponse<{ appointment: DoctorDashboardAppointment }>>(
        `/api/doctor/appointments/${appointmentId}/status`,
        {
            method: "PATCH",
            headers: createAuthHeaders(token),
            body: JSON.stringify({ status }),
        }
    );

    return payload.data.appointment;
}

export async function createDoctorReferral(
    token: string,
    input: {
        toDoctor: string;
        patientName: string;
        reason: string;
    }
): Promise<DoctorDashboardReferral> {
    const payload = await request<ApiResponse<{ referral: DoctorDashboardReferral }>>("/api/doctor/referrals", {
        method: "POST",
        headers: createAuthHeaders(token),
        body: JSON.stringify(input),
    });

    return payload.data.referral;
}

export async function updateDoctorReferralStatus(
    token: string,
    referralId: string,
    status: DoctorDashboardReferral["status"]
): Promise<DoctorDashboardReferral> {
    const payload = await request<ApiResponse<{ referral: DoctorDashboardReferral }>>(
        `/api/doctor/referrals/${referralId}/status`,
        {
            method: "PATCH",
            headers: createAuthHeaders(token),
            body: JSON.stringify({ status }),
        }
    );

    return payload.data.referral;
}

export async function updateDoctorSchedule(
    token: string,
    input: {
        workingDays: string[];
        startTime: string;
        endTime: string;
        slotDurationMinutes?: number;
    }
): Promise<DoctorDashboardSchedule> {
    const payload = await request<ApiResponse<{ schedule: DoctorDashboardSchedule }>>('/api/doctor/schedule', {
        method: 'PATCH',
        headers: createAuthHeaders(token),
        body: JSON.stringify(input)
    });

    return payload.data.schedule;
}