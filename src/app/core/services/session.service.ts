import { Injectable } from '@angular/core';
import { User } from '../models/user.to';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  get user(): User {
    return JSON.parse(sessionStorage.getItem('user')!);
  }

  set user(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('userName', user.name);
    sessionStorage.setItem('lastName', user.lastname);
    sessionStorage.setItem('email', user.email);
    sessionStorage.setItem('userId', user.id);
  }

  get userName(): string {
    return sessionStorage.getItem('userName')!;
  }

  get lastName(): string {
    return sessionStorage.getItem('lastName')!;
  }

  get email(): string {
    return sessionStorage.getItem('email')!;
  }

  get userId(): string {
    return sessionStorage.getItem('userId')!;
  }

  public isLogged(): boolean {
    const user = sessionStorage.getItem('user');
    return (user !== null);
  }

  public clearSession() {
    sessionStorage.clear();
  }


}
