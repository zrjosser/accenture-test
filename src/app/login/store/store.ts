import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as reducers from './reducers';

export namespace LoginStore {
  export interface AppState {
    login: reducers.LoginState;
  }
  export const loginFeatureSelector = createFeatureSelector<reducers.LoginState>('login');

  export const loginSelectors = {
    login: createSelector(loginFeatureSelector, (state: reducers.LoginState) => state.response),
  };

  export const appReducers: ActionReducerMap<AppState> = {
    login: reducers.loginReducer
  };
}
