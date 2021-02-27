import { createAction, createReducer, on, props } from '@ngrx/store';
import { Reminder } from 'src/app/core/models/reminder.model';

export const addReminder = createAction(
    'Add reminders',
    props<Reminder>()
);


export const initialState: ReadonlyArray<Reminder> = [];

export const remindersReducer = createReducer(
    initialState,
    on(addReminder, (state, reminder: Reminder) => {
        return [...state, reminder]
    })
);