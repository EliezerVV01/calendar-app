import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { Reminder } from "../core/models/reminder.model";
import { hydrationMetaReducer } from "./rehydration";
import { remindersReducer } from "./reminders.store";

export interface AppState {
    reminders: ReadonlyArray<Reminder>;
}

export const metaReducers: MetaReducer<any>[] = [hydrationMetaReducer];

export const reducers: ActionReducerMap<AppState> = {
  reminders: remindersReducer,
}