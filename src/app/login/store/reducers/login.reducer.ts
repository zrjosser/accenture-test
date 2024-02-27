import { Action, createReducer, on } from '@ngrx/store';
import { LoginActions } from '../actions';
import { LoginTypes } from '../../shared/enums';
import { User } from 'src/app/core/models/user.to';


export interface LoginState {
    response: User | null;
    error: any;
}

export const LoginInitialState: LoginState = {
    response: null,
    error: null
};

const _loginReducer = createReducer(
    LoginInitialState,

    on(LoginActions.getLogin, (state, { }) => ({
        ...state,
        error: null
    })),

    on(LoginActions.getLoginSuccess, (state, { response }) => ({
        ...state,
        response,
        error: null
    })),

    on(LoginActions.getLoginError, (state, { payload }) => ({
        ...state,
        response: null,
        error: {
            statusCode: payload.statusCode,
            message: payload.message
        }
    })),

    on(LoginActions.cleanState, (state) => ({
        ...state,
        response: null,
        error: null
    }))
);

export function loginReducer(state: LoginState | undefined, action: Action) {
    if (action.type === LoginTypes.LOGIN) {
        state = undefined;
    }
    return _loginReducer(state, action);
}
