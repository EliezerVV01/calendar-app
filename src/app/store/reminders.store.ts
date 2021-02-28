import { createAction, createReducer, on, props } from '@ngrx/store';
import { Reminder } from 'src/app/core/models/reminder.model';

export const addReminder = createAction(
    'Add reminder',
    props<Reminder>()
);

export const removeReminder = createAction(
    'Remove Reminder',
    props<{ reminderId: number }>()
)

export const updateReminder = createAction(
    'Update reminder',
    props<Reminder>()
);

export const initialState: ReadonlyArray<Reminder> = [];

export const remindersReducer = createReducer(
    initialState,
    on(addReminder, (state, reminder: Reminder) => {
        return [...state, reminder]
    }),
    on(removeReminder, (state, { reminderId }) => {
        return state.filter(r => r.id !== reminderId);
    }),
    on(updateReminder, (state, reminder: Reminder) => {
        return state.map(re => re.id === reminder.id ? reminder : re)
    }),
);