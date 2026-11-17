import type { Role } from "./auth";



export type LeaveStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export type ReviewStatus = Extract<LeaveStatus, "APPROVED" | "REJECTED">;

export type ReviewRole = Extract<Role, "HR" | "MANAGER">

export interface LeaveTypeRequest {
    name: string,
    defaultDaysPerYear: number,
    isPaid: boolean
}


export interface LeaveType extends LeaveTypeRequest {
    leaveTypeId: number,
    createdAt: Date
}

export interface LeaveRequest {
    leaveTypeId: number;
    startDate: string,
    endDate: string,
    reason: string
}

export interface LeaveReview{
    leaveRequestId:number;
    status:ReviewStatus;
    comment:string
}

export interface LeaveStats {
    totalLeaves: number;
    usedLeaves: number;
    leaveRequests: number;
    pending: number;
    approved: number;
    rejected: number;
    cancelled: number
}



export interface LeaveHistoryType {
    requestId: number;
    startDate: string;
    endDate: string;
    numberOfDays: number;
    reason: string;
    status: LeaveStatus;
    appliedAt: string;
    reviewerName: string | null;
    reviewerRole: ReviewRole | null;
    reviewComment: string | null;
    reviewedAt: string | null
}