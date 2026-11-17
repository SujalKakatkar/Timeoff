import { api, getErrorMessage } from "@/api/axios";
import type { LeaveHistoryType, LeaveRequest, LeaveReview, LeaveStats } from "@/types/leave";
import { create } from "zustand";


interface LeaveStore {
    leaveHistory: LeaveHistoryType[]
    leaveStats: LeaveStats | null
    getLeaveHistory: (employeeId: number) => Promise<{ error: string | null }>
    getLeaveStats: () => Promise<{ error: string | null }>
    newLeaveRequest: (leaveRequest: LeaveRequest) => Promise<{ error: string | null }>
    reviewRequest: (payload: LeaveReview) => Promise<{ error: string | null }>
}

export const useLeaveStore = create<LeaveStore>((set) => ({
    leaveHistory: [],
    leaveStats: null,
    getLeaveHistory: async (employeeId) => {
        try {
            const { data } = await api.get("/leave-request/employee", { params: { employeeId } })
            set({ leaveHistory: data })
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    getLeaveStats: async () => {
        try {
            const { data } = await api.get("/leave-request/stats")
            set({ leaveStats: data })

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    newLeaveRequest: async (leaveRequest) => {
        try {
            await api.post("/leave-request", leaveRequest)

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },

    reviewRequest: async (payload) => {
        try {
            await api.patch("/leave-request/review", payload)

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
}))