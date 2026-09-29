// fake-chart-data.ts

// For the Overview page's "Leave activity" chart — single series
export const dailyLeaveActivity: { date: string; onLeave: number }[] = generateDailyData(
    90,
    (i) => ({
        onLeave: Math.round(4 + 3 * Math.sin(i / 6) + (Math.random() * 3 - 1.5)),
    })
)

// For the Reports page's "Monthly leave activity" chart — three series
export const dailyLeaveRequests: {
    date: string
    requests: number
    approved: number
    rejected: number
}[] = generateDailyData(90, (i) => {
    const requests = Math.round(2 + 2 * Math.sin(i / 10) + Math.random() * 2)
    const rejected = Math.round(Math.random() * (requests > 2 ? 1 : 0))
    return {
        requests,
        approved: Math.max(requests - rejected, 0),
        rejected,
    }
})

function generateDailyData<T extends Record<string, number>>(
    days: number,
    makeValues: (dayIndex: number) => T
): (T & { date: string })[] {
    const today = new Date("2026-09-21") // matches "today" in this conversation
    return Array.from({ length: days }, (_, i) => {
        const d = new Date(today)
        d.setDate(d.getDate() - (days - 1 - i))
        const values = makeValues(i)
        // clamp all numeric fields to non-negative
        const clamped = Object.fromEntries(
            Object.entries(values).map(([k, v]) => [k, Math.max(0, v)])
        ) as T
        return { date: d.toISOString().slice(0, 10), ...clamped }
    })
}