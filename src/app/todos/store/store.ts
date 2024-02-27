import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as reducers from './reducers';

export namespace TodosStore {
  export interface AppState {
    todos: reducers.TodosState;
  }
  export const todosFeatureSelector = createFeatureSelector<reducers.TodosState>('todos');

  export const todosSelectors = {
    todos: createSelector(todosFeatureSelector, (state: reducers.TodosState) => state.response),
  };

  export const appReducers: ActionReducerMap<AppState> = {
    todos: reducers.todosReducer
  };
}
