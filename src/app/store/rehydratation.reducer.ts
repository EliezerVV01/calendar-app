import { ActionReducer, INIT, MetaReducer } from "@ngrx/store";
import { AppState } from ".";

export const hydrationMetaReducer = (
    reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
    return (state, action) => {
        if (action.type === INIT) {
            const storageValue = localStorage.getItem("calendar-app-state");
            if (storageValue) {
                try {
                   return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("calendar-app-state");
                }
            }
        }
        const nextState = reducer(state, action);
        localStorage.setItem("calendar-app-state", JSON.stringify(nextState));
        return nextState;
    }
}

