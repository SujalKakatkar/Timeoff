
import { useAuthStore } from '@/store/UseAuthStore';
import type { AccessTokenResponse } from '@/types/auth';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'

const BASE_URL = import.meta.env.VITE_API_URI

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

const refreshInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials:true,
    timeout: 15000,
})


export function getErrorMessage(err: unknown): string {
    if (axios.isAxiosError(err)) {
        return err.response?.data?.message ?? "Cannot reach server";
    }
    return "Something went wrong";
}



api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && !config.headers.has("Authorization")) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const NO_REFRESH = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"];

function isAuthUrl(config: RetryConfig): boolean {
    const path = (config.url ?? "").replace(config.baseURL ?? "", "");
    return NO_REFRESH.some((p) => path.startsWith(p));
}

let refreshPromise: Promise<string> | null = null;

function refreshAccessToken(): Promise<string> {
    refreshPromise ??= refreshInstance
        .post<AccessTokenResponse>(`/auth/refresh`)
        .then((res) => {
            if (useAuthStore.getState().status !== "authenticated") {
                throw new Error("Session ended during refresh");
            }
            useAuthStore.getState().setAccessToken(res.data.accessToken);
            return res.data.accessToken;
        })
        .finally(() => {
            refreshPromise = null;
        });
    return refreshPromise;
}

api.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
        const original = error.config as RetryConfig | undefined;

        if (
            !original ||
            error.response?.status !== 401 ||
            original._retry ||
            isAuthUrl(original) ||
            useAuthStore.getState().status !== "authenticated"
        ) {
            return Promise.reject(error);
        }
        original._retry = true;

        try {
            const sent = String(original.headers.get("Authorization") ?? "");
            const current = useAuthStore.getState().accessToken;
            const token =
                current && sent !== `Bearer ${current}` ? current : await refreshAccessToken();

            original.headers.set("Authorization", `Bearer ${token}`);
            return api(original); // not awaited on purpose: a retry error must not clear auth
        } catch (e) {
            
            if (axios.isAxiosError(e) && e.response?.status === 401) {
                useAuthStore.getState().clearAuth();
            }
            return Promise.reject(error);
        }
    }
);


