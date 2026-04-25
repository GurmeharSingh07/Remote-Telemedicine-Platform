export type DashboardRole = "patient" | "doctor" | "admin";
export type SignupUserType = "patient" | "doctor" | "hospital_admin";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role?: DashboardRole;
    createdAt?: string;
}

export interface AuthSession {
    token: string;
    user: AuthUser;
    role: DashboardRole;
}

interface ApiResponse<T> {
    success: boolean;
    status?: number;
    message?: string;
    data: T;
}

interface AuthPayload {
    user: AuthUser;
    token: string;
}

interface RoleLookup {
    [email: string]: DashboardRole;
}

const DEFAULT_BACKEND_BASE_URLS = ["http://localhost:5001", "http://localhost:5000"];
const configuredBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
const BACKEND_BASE_URLS = (configuredBackendUrl ? [configuredBackendUrl] : DEFAULT_BACKEND_BASE_URLS).map((url) =>
    url.replace(/\/$/, "")
);
const PRIMARY_BACKEND_BASE_URL = BACKEND_BASE_URLS[0];
const AUTH_SESSION_KEY = "healnet_auth_session";
const ROLE_LOOKUP_KEY = "healnet_role_lookup";

export const USER_TYPE_TO_ROLE: Record<SignupUserType, DashboardRole> = {
    patient: "patient",
    doctor: "doctor",
    hospital_admin: "admin",
};

export const ROLE_DASHBOARD_PATH: Record<DashboardRole, string> = {
    patient: "/dashboard/patient",
    doctor: "/dashboard/doctor",
    admin: "/dashboard/admin",
};

export function getDashboardPath(role: DashboardRole): string {
    return ROLE_DASHBOARD_PATH[role];
}

function readRoleLookup(): RoleLookup {
    if (typeof window === "undefined") {
        return {};
    }

    const stored = window.localStorage.getItem(ROLE_LOOKUP_KEY);
    if (!stored) {
        return {};
    }

    try {
        return JSON.parse(stored) as RoleLookup;
    } catch {
        window.localStorage.removeItem(ROLE_LOOKUP_KEY);
        return {};
    }
}

function writeRoleLookup(lookup: RoleLookup): void {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(ROLE_LOOKUP_KEY, JSON.stringify(lookup));
}

export function rememberUserRole(email: string, role: DashboardRole): void {
    if (!email) {
        return;
    }

    const lookup = readRoleLookup();
    lookup[email.toLowerCase().trim()] = role;
    writeRoleLookup(lookup);
}

export function resolveUserRole(email: string): DashboardRole {
    if (!email) {
        return "patient";
    }

    const lookup = readRoleLookup();
    return lookup[email.toLowerCase().trim()] ?? "patient";
}

function normalizeRole(role?: string): DashboardRole {
    if (role === "doctor" || role === "admin") {
        return role;
    }

    return "patient";
}

export function saveAuthSession(session: AuthSession): void {
    if (typeof window === "undefined") {
        return;
    }

    rememberUserRole(session.user.email, session.role);
    window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function createSessionFromAuthPayload(payload: AuthPayload, fallbackRole?: DashboardRole): AuthSession {
    const resolvedRole = normalizeRole(payload.user.role ?? fallbackRole);

    return {
        token: payload.token,
        role: resolvedRole,
        user: {
            ...payload.user,
            role: resolvedRole,
        },
    };
}

export function getAuthSession(): AuthSession | null {
    if (typeof window === "undefined") {
        return null;
    }

    const stored = window.localStorage.getItem(AUTH_SESSION_KEY);
    if (!stored) {
        return null;
    }

    try {
        const parsed = JSON.parse(stored) as Partial<AuthSession>;

        if (!parsed?.token || !parsed?.user || !parsed.user.email) {
            window.localStorage.removeItem(AUTH_SESSION_KEY);
            return null;
        }

        return {
            token: parsed.token,
            user: parsed.user,
            role: normalizeRole(parsed.role ?? parsed.user.role ?? resolveUserRole(parsed.user.email)),
        };
    } catch {
        window.localStorage.removeItem(AUTH_SESSION_KEY);
        return null;
    }
}

export function clearAuthSession(): void {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.removeItem(AUTH_SESSION_KEY);
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
    const headers = new Headers(init.headers);

    if (!headers.has("Content-Type") && init.body) {
        headers.set("Content-Type", "application/json");
    }

    for (const baseUrl of BACKEND_BASE_URLS) {
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

            throw new Error(`Unable to reach the backend auth server. Tried: ${attemptedTargets}. ${setupHint}`);
        }
    }

    throw new Error("Unable to process authentication request.");
}

export async function loginUser(credentials: {
    email: string;
    password: string;
}): Promise<ApiResponse<AuthPayload>> {
    return request<ApiResponse<AuthPayload>>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}

export async function registerUser(payload: {
    name: string;
    email: string;
    password: string;
    role?: DashboardRole;
}): Promise<ApiResponse<AuthPayload>> {
    return request<ApiResponse<AuthPayload>>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export async function fetchProfile(token: string): Promise<ApiResponse<AuthUser>> {
    return request<ApiResponse<AuthUser>>("/api/auth/profile", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function validateStoredSession(session: AuthSession): Promise<AuthSession> {
    const profileResponse = await fetchProfile(session.token);

    if (!profileResponse.data) {
        throw new Error("Unable to validate session.");
    }

    const resolvedRole = normalizeRole(profileResponse.data.role ?? session.role);

    return {
        token: session.token,
        role: resolvedRole,
        user: {
            ...session.user,
            ...profileResponse.data,
            role: resolvedRole,
        },
    };
}
