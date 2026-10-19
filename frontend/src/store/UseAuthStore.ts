// src/store/authStore.ts
import { create } from "zustand";
import { api, getErrorMessage } from "../api/axios";
import type {
    User,
    LoginResponse,
    AccessTokenResponse,
} from "../types/auth";
import type { RegisterPayloadType } from "@/schemas/signup-schema";
import type { LoginSchemaType } from "@/schemas/login-schema";
import type { ProfilePayloadType } from "@/schemas/profile-schema";

type Status = "loading" | "authenticated" | "anonymous";

interface AuthState {
    accessToken: string | null;
    user: User | null;
    status: Status;

    register: (data: RegisterPayloadType) => Promise<{ error: string | null }>;
    login: (payload: LoginSchemaType) => Promise<{ error: string | null }>;
    updateProfile: (payload: ProfilePayloadType) => Promise<{ error: string | null }>
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

    login: async (payload) => {
        try {
            const { data } = await api.post<LoginResponse>("/auth/login", payload);
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
    updateProfile: async (payload) => {
        try {
            
            await api.patch("/auth/profile", payload)
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
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