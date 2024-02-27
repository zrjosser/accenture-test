import { Action, createReducer, on } from '@ngrx/store';
import { TodosActions } from '../actions';
import { TodosTypes } from '../../shared/enums';
import { Task } from 'src/app/core/models/task.to';


export interface TodosState {
    response: Task[];
    error: any;
}

export const TodosInitialState: TodosState = {
    response: [],
    error: null
};

const _todosReducer = createReducer(
    TodosInitialState,

    on(TodosActions.getTodos, (state, { }) => ({
        ...state,
        error: null
    })),

    on(TodosActions.getTodosSuccess, (state, { response }) => ({
        ...state,
        response,
        error: null
    })),

    on(TodosActions.getTodosError, (state, { payload }) => ({
        ...state,
        response: [],
        error: {
            statusCode: payload.statusCode,
            message: payload.message
        }
    })),

    on(TodosActions.cleanState, (state) => ({
        ...state,
        response: [],
        error: null
    }))
);

export function todosReducer(state: TodosState | undefined, action: Action) {
    if (action.type === TodosTypes.TODOS_LIST) {
        state = undefined;
    }
    return _todosReducer(state, action);
}
