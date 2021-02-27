export type CalendarMonth = CalendarWeek[];

export type CalendarWeek = Array<Date>;


export interface SelectedDate {
    month: number,
    year: number,
}