// src/store/authStore.ts
import { create } from "zustand";
import { api, getErrorMessage } from "../api/axios";
import type {
    User,
    LoginResponse,
    AccessTokenResponse,
} from "../types/auth";
import type { SignupSchemaType } from "@/schemas/signup-schema";

type Status = "loading" | "authenticated" | "anonymous";

interface AuthState {
    accessToken: string | null;
    user: User | null;
    status: Status;

    register: (data: SignupSchemaType) => Promise<{ error: string | null }>;
    login: (email: string, password: string) => Promise<{ error: string | null }>;
    logout: () => Promise<void>;
    initAuth: () => Promise<void>;
    setAccessToken: (token: string) => void;
    clearAuth: () => void;
}

const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    status: "loading",

    register: async (data) => {
        try {
            await api.post("/auth/register", data);
            return { error: null };
        } catch (err) {
            return { error: getErrorMessage(err) };
        }
    },

    login: async (email, password) => {
        try {
            const { data } = await api.post<LoginResponse>("/auth/login", {
                email,
                password,
            });
            const { accessToken, ...userData } = data
            set({
                accessToken: accessToken,
                user: userData,
                status: "authenticated",
            });
            return { error: null };
        } catch (err) {
            return { error: getErrorMessage(err) };
        }
    },

    logout: async () => {
        try {
            await api.post("/auth/logout");
        } finally {
            set({ accessToken: null, user: null, status: "anonymous" });
        }
    },

    initAuth: async () => {
        try {
            const { data } = await api.post<AccessTokenResponse>("/auth/refresh");
            const token = data.accessToken;
            const me = await api.get<User>("/auth/me", { headers: authHeader(token) });

            if (get().status !== "loading") return;
            set({ accessToken: token, user: me.data, status: "authenticated" });
        } catch {
            if (get().status === "loading") {
                set({ accessToken: null, user: null, status: "anonymous" });
            }
        }
    },

    setAccessToken: (token) => set({ accessToken: token }),

    clearAuth: () => set({ accessToken: null, user: null, status: "anonymous" }),
}));