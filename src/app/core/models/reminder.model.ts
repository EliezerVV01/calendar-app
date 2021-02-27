import { AbstractControl, FormGroup } from "@angular/forms";
import { City } from "./city.model";

export interface ReminderBase {
    description: string,
    city: City,
    time: string,
    color: string,
}

export type Reminder = ReminderBase & {date: string, weather?: string};

export type ReminderForm  = ReminderBase & { date: Date };

export type ReminderControls = { [key in keyof ReminderForm]: AbstractControl }

export type ReminderGroupForm = FormGroup & { value: ReminderForm, controls: ReminderControls }