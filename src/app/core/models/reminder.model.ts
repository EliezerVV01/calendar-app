import { AbstractControl, FormGroup } from "@angular/forms";

export interface ReminderBase {
    description: string,
    city: string,
    time: string,
    color: string,
}

export type Reminder = ReminderBase & {date: string};

export type ReminderForm  = ReminderBase & { date: Date };

export type ReminderControls = { [key in keyof ReminderForm]: AbstractControl }

export type ReminderGroupForm = FormGroup & { value: ReminderForm, controls: ReminderControls }