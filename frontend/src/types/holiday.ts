

export interface HolidayRequest {
    date: Date,
    name: string,
}

export interface HolidayResponse extends HolidayRequest {
    holidayId: number
}