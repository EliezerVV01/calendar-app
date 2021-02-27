import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { Reminder, ReminderBase } from "../core/models/reminder.model";
import { hydrationMetaReducer } from "./rehydratation.reducer";
import { remindersReducer } from "./reminders.store";

export interface AppState {
    reminders: ReadonlyArray<Reminder>;
}

export const metaReducers: MetaReducer<any>[] = [hydrationMetaReducer];

export const reducers: ActionReducerMap<AppState> = {
  reminders: remindersReducer,
}