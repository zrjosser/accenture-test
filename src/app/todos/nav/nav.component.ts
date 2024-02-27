import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  userName: string;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {
    this.userName = this.sessionService.userName + " " + this.sessionService.lastName;
  }

  logout() {
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }

}
