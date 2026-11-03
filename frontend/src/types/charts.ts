

export type LeaveActivityPoint = {
    date: string,
    onLeave: number,
}

export type ChartLeaveActivityResponse = {
    from: string,
    to: string,
    activity: LeaveActivityPoint[]
}