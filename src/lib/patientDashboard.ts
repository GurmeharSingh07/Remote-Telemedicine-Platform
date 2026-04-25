export interface PatientDoctor {
    id: string;
    name: string;
    specialty: string;
    hospital: string;
    location: string;
    rating: number;
    experience: string;
    distance: string;
    available: boolean;
    image: string;
    phone?: string;
}

export interface PatientAppointment {
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

export interface PatientMedicalRecord {
    id: string;
    title: string;
    date: string;
    hospital: string;
    type: string;
    icon: string;
}

export interface PatientTestResult {
    id: string;
    test: string;
    date: string;
    status: string;
    hospital: string;
    icon: string;
}

export interface PatientPrescription {
    id: string;
    doctor: string;
    date: string;
    medicines: string[];
    validUntil: string;
}

export interface PatientDashboardPayload {
    patient: {
        id: string;
        name: string;
        email: string;
    };
    appointments: PatientAppointment[];
    medicalRecords: PatientMedicalRecord[];
    testResults: PatientTestResult[];
    prescriptions: PatientPrescription[];
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

            throw new Error(`Unable to reach the backend patient dashboard server. Tried: ${attemptedTargets}. ${setupHint}`);
        }
    }

    throw new Error("Unable to process patient dashboard request.");
}

export async function fetchPatientDashboard(token: string): Promise<PatientDashboardPayload> {
    const payload = await request<ApiResponse<PatientDashboardPayload>>("/api/patient/dashboard", {
        method: "GET",
        headers: createAuthHeaders(token),
    });

    return payload.data;
}

export async function fetchPatientDoctors(token: string, specialty?: string): Promise<PatientDoctor[]> {
    const specialtyQuery = specialty && specialty !== "all" ? `?specialty=${encodeURIComponent(specialty)}` : "";
    const payload = await request<ApiResponse<{ doctors: PatientDoctor[] }>>(`/api/patient/doctors${specialtyQuery}`, {
        method: "GET",
        headers: createAuthHeaders(token),
    });

    return payload.data.doctors;
}

export async function bookPatientAppointment(
    token: string,
    input: {
        doctorId: string;
        date: string;
        time: string;
        reason?: string;
    }
): Promise<PatientAppointment> {
    const payload = await request<ApiResponse<{ appointment: PatientAppointment }>>("/api/patient/appointments", {
        method: "POST",
        headers: createAuthHeaders(token),
        body: JSON.stringify(input),
    });

    return payload.data.appointment;
}

export async function cancelPatientAppointment(token: string, appointmentId: string): Promise<PatientAppointment> {
    const payload = await request<ApiResponse<{ appointment: PatientAppointment }>>(`/api/patient/appointments/${appointmentId}/cancel`, {
        method: "PATCH",
        headers: createAuthHeaders(token),
    });

    return payload.data.appointment;
}