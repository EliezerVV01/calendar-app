import { Reminder } from "./reminder.model";

export type CalendarMonth = CalendarWeek[];

export type CalendarWeek = Array<CalendarDay>;

export type CalendarDay = {
    isWeekend: boolean,
    date: Date,
    reminders: Reminder[],
    isPartOfMonth?: boolean,
}
