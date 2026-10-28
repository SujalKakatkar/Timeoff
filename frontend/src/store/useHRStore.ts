import { api, getErrorMessage } from "@/api/axios";
import type { User } from "@/types/auth";
import type { DepartmentRequest } from "@/types/Department";
import type { HolidayRequest } from "@/types/holiday";
import type { LeaveType, LeaveTypeRequest } from "@/types/leave";
import { create } from "zustand";


interface HRState {
    user: User | null,
    employees: User[],
    managers: User[],
    leaveTypes: LeaveType[],
    leaveRequests: [],
    onLeaveToday: number,
    getEmployeeList: () => Promise<{ error: null | string }>,
    getOnLeaveToday: () => Promise<{ error: null | string }>,
    getManagers: () => Promise<{ error: null | string }>,
    getEmployee: () => Promise<{ error: null | string }>,
    newLeaveType: (payload: LeaveTypeRequest) => Promise<{ error: null | string }>
    newHoliday: (payload: HolidayRequest) => Promise<{ error: null | string }>,
    newDepartment: (payload: DepartmentRequest) => Promise<{ error: null | string }>
    promoteToManger: (id: number) => Promise<{ error: null | string }>,
    assignToManager: (id: number, managerId: number) => Promise<{ error: null | string }>,
    disableEmployee: (id: number) => Promise<{ error: null | string }>,
    addLeaveBalance: (id: number, year: number) => Promise<{ error: null | string }>
    //todo:think about reports how do you store them in the state
}

export const useHRStore = create<HRState>((set) => ({
    user: null,
    employees: [],
    managers: [],
    onLeaveToday: 0,
    leaveRequests: [],
    leaveTypes: [],

    getEmployeeList: async () => {
        try {
            const { data } = await api.get("/hr/all")
            set({ employees: data })

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    getManagers: async () => {
        try {
            const { data } = await api.get("/hr/managers")
            set({ managers: data })
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
            await api.post("/leaveType", payload)

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    newHoliday: async (payload) => {
        try {
            await api.post("/holidays", payload)

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    newDepartment: async (payload) => {
        try {
            await api.post("/department", payload)
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    promoteToManger: async (empId) => {
        try {
            await api.put("/hr/promote", null, { params: { empId } })
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    assignToManager: async (empId, managerId) => {
        try {
            await api.patch("/hr/assign", null, {
                params: {
                    empId,
                    managerId
                }
            })
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    disableEmployee: async (userId) => {
        try {
            await api.patch("/hr/disable", null, {
                params: {
                    userId
                }
            })
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    addLeaveBalance: async (id, year) => {
        try {
            await api.post("/leavebalance", null, {
                params: {
                    userId: id,
                    year
                }
            })

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
}))