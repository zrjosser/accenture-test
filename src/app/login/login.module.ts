import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { LoginStore } from './store/store';
import { EffectsModule } from '@ngrx/effects';
import { EffectsArray } from './store/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbAlertModule,
    StoreModule.forFeature('login', LoginStore.appReducers),
    EffectsModule.forFeature(EffectsArray),
  ]
})
export class LoginModule { }
