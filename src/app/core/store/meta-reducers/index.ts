import { ClearState } from '../actions/index';
import { ActionReducer, MetaReducer } from '@ngrx/store';

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        if (action.type === ClearState().type) {
            state = undefined;
        }
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<any>[] = [clearState];
