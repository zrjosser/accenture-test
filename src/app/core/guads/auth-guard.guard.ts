import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../services/session.service';


@Injectable({
  providedIn: 'root'
})
class AuthGuardGuard {

  constructor(
    private router: Router,
    private sessionService: SessionService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLogged = this.sessionService.isLogged();
    if (isLogged) {
      return isLogged;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardGuard).canActivate(next, state);
}

