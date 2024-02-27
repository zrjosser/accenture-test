import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as _ from 'lodash';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { LoginActions } from '../actions';

import { of } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.to';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffects {

    user: User;

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private sessionService: SessionService,
        private router: Router
    ) {
        this.user = {
            email: '',
            id: '',
            name: '',
            lastname: '',
            password: ''
        };
    }

    getLogin$ = createEffect(
        () => this.actions$.pipe(
            ofType(LoginActions.getLogin),
            mergeMap(
                (action) => this.userService.getUsers()
                    .pipe(
                        map((res) => {
                            const user = res.find((user) => {
                                return user.email === action.request.email && user.password === action.request.password
                            });
                            if (user) {
                                this.user = user;
                                return LoginActions.getLoginSuccess({ response: user })
                            } else {
                                return LoginActions.getLoginError({ payload: 'Usuario no existe' });
                            }
                        }),
                        catchError((error) => of(LoginActions.getLoginError({ payload: 'Error al consultar servicio' })))
                    )
            ),
            tap(() => {
                if (this.user.id !== '') {
                    this.sessionService.user = this.user;
                    this.router.navigate(['/todos']);
                }
            })
        )
    );

}
