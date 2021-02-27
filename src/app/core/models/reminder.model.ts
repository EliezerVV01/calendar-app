import { AbstractControl, FormGroup } from "@angular/forms";

export interface Reminder {
    description: string,
    city: string,
    time: string,
    color: string,
    date: Date,
}

export type ReminderControls = { [key in keyof Reminder]: AbstractControl }

export type ReminderGroupForm = FormGroup & { value: Reminder, controls: ReminderControls }