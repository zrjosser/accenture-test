import { createAction, props } from '@ngrx/store';
import { LoginTypes } from '../../shared/enums';
import { User } from 'src/app/core/models/user.to';
import { LoginReq } from 'src/app/core/models/login-req.to';

export const getLogin = createAction(
    LoginTypes.LOGIN,
    props<{ request: LoginReq }>()
);

export const getLoginSuccess = createAction(
    LoginTypes.LOGIN_SUCCESS,
    props<{ response: User | null }>()
);

export const getLoginError = createAction(
    LoginTypes.LOGIN_ERROR,
    props<{ payload: any }>()
);

export const cleanState = createAction(
    LoginTypes.CLEAN_STATE
);
