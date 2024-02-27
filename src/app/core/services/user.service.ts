import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.to';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient, private sessService: SessionService) {
  }

  getUsers(): Observable<User[]> {
    const endpoint = environment.apiServer.serverUrl + environment.apiServer.users;
    return this.http.get<User[]>(endpoint);
  }


}
