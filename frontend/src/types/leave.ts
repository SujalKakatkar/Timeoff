

export interface LeaveTypeRequest {
    name: string,
    defaultDaysPerYear: number,
    isPaid: boolean
}

export interface LeaveTypeResponse extends LeaveTypeRequest {
    leaveTypeId: number,
    createdAt: Date
}