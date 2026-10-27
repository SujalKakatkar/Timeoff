import { getErrorMessage } from "@/api/axios";
import type { User } from "@/types/auth";
import type { HolidayRequest } from "@/types/holiday";
import type { LeaveTypeRequest } from "@/types/leave";
import { create } from "zustand";

//todo: think about the holiday table data should it be common for all the dashboard or separate for each

//todo: on more about leave types because hr can modify or create a new leave type 

interface HRState {
    user: User | null,
    employees: User[],
    managers: User[],
    leaveTypes: [],
    leaveRequests: [],
    onLeaveToday: number,
    getEmployeeList: () => Promise<{ error: null | string }>,
    getOnLeaveToday: () => Promise<{ error: null | string }>,
    getManagers: () => Promise<{ error: null | string }>,
    getEmployee: () => Promise<{ error: null | string }>,
    newLeaveType: (payload: LeaveTypeRequest) => Promise<{ error: null | string }>
    newHoliday: (payload: HolidayRequest) => Promise<{ error: null | string }>
    promoteToManger: (id: number) => Promise<{ error: null | string }>,
    assignToManager: (id: number, managerId: number) => Promise<{ error: null | string }>,
    disableEmployee: (id: number) => Promise<{ error: null | string }>,
    //todo:think about reports how do you store them in the state
}

export const useHRStore = create<HRState>((set, get) => ({
    user: null,
    employees: [],
    managers: [],
    onLeaveToday: 0,
    leaveRequests: [],
    leaveTypes: [],

    getEmployeeList: async () => {
        try {
            // await api.post("/auth/register");
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    getManagers: async () => {
        try {
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    getOnLeaveToday: async () => {
        try {
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    getEmployee: async () => {
        try {
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    newLeaveType: async (payload) => {
        try {
            console.log(payload);

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    newHoliday: async (payload) => {
        try {
            console.log(payload);

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    promoteToManger: async (id) => {
        try {

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    assignToManager: async (id, managerId) => {
        try {

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    disableEmployee: async (id) => {
        try {

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    }
}))