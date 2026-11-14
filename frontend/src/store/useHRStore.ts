import { api, getErrorMessage } from "@/api/axios";
import type { EmployeeTableRow } from "@/components/table-items/employee-table-items/employee-overview-table-schema";
import type { User, DepartmentRequest, ChartLeaveActivityResponse, LeaveActivityPoint, LeaveType, LeaveTypeRequest, HolidayRequest, HrStatsType, Employee } from "@/types/types";
import { create } from "zustand";


interface HRState {
    user: User | null,
    stats: HrStatsType | null,
    chartData: LeaveActivityPoint[],
    overviewTableData: EmployeeTableRow[],
    employees: Employee[],
    leaveTypes: LeaveType[],
    leaveRequests: [],
    onLeaveToday: number,
    getEmployeeList: () => Promise<{ error: null | string }>,
    getEmployee: (id: number) => Promise<{ error: null | string }>,
    getStats: () => Promise<{ error: null | string }>
    getEmployeeOverview: () => Promise<{ error: null | string }>
    getChartData: (days: number) => Promise<{ error: null | string }>
    newLeaveType: (payload: LeaveTypeRequest) => Promise<{ error: null | string }>
    newHoliday: (payload: HolidayRequest) => Promise<{ error: null | string }>,
    newDepartment: (payload: DepartmentRequest) => Promise<{ error: null | string }>
    addLeaveBalance: (id: number, year: number) => Promise<{ error: null | string }>
    //todo:think about reports how do you store them in the state
}

export const useHRStore = create<HRState>((set) => ({
    user: null,
    stats: null,
    chartData: [],
    overviewTableData: [],
    employees: [],
    managers: [],
    onLeaveToday: 0,
    leaveRequests: [],
    leaveTypes: [],

    getEmployeeList: async () => {
        try {
            const { data } = await api.get("/employee/all")
            console.log(data);

            set({ employees: data })

            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },

    getEmployee: async (id) => {
        try {
            const { data } = await api.get(`/employee`, { params: { userId: id } })
            set({ user: data })
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    getStats: async () => {
        try {
            const { data } = await api.get(`/employee/stats`)
            set({ stats: data })
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    getEmployeeOverview: async () => {
        try {
            const { data } = await api.get(`/employee/overview`)
            set({ overviewTableData: data })
            return { error: null }
        } catch (error) {
            return { error: getErrorMessage(error) }
        }
    },
    getChartData: async (days) => {
        try {
            const { data } = await api.get<ChartLeaveActivityResponse>(`/employee/leave-activity`, { params: { days } })
            set({ chartData: data.activity })
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