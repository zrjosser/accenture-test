import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { LoginReq } from 'src/app/core/models/login-req.to';
import { LoginStore } from '../store/store';
import { LoginActions } from '../store/actions';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'lodash';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  destroyed$ = new Subject<boolean>();
  serviceError: any;
  errorText: any;

  constructor(
    private store: Store<LoginStore.AppState>,
    private updates$: Actions
  ) {
    updates$.pipe(
      ofType(LoginActions.getLoginError),
      takeUntil(this.destroyed$)
    )
      .subscribe((data) => {
        this.serviceError = true;
        this.errorText = data.payload;
      });
  }


  onSubmit() {
    const payload: LoginReq = {
      email: this.f.email.value || null,
      password: this.f.password.value || null
    }
    this.serviceError = false;
    this.store.dispatch(LoginActions.getLogin({ request: payload }));
  }

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  get f() { return this.loginForm.controls; }


  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
