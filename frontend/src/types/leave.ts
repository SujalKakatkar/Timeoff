

export interface LeaveTypeRequest {
    name: string,
    defaultDaysPerYear: number,
    isPaid: boolean
}

export interface LeaveType extends LeaveTypeRequest {
    leaveTypeId: number,
    createdAt: Date
}