import { Injectable } from '@angular/core';
import { Task } from '../models/task.to';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.to';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getTasks(user: User): Observable<Task[]> {
    const endpoint = environment.apiServer.serverUrl + environment.apiServer.tasks + '?userId=' + user.id;
    return this.http.get<Task[]>(endpoint);
  }

  updateTask(task: Task): Observable<Task[]> {
    const endpoint = environment.apiServer.serverUrl + environment.apiServer.tasks + '/' + task.id;
    const request: Task = {
      ...task
    }
    request.completed = !request.completed;
    return this.http.put<Task[]>(endpoint, request);
  }

  createTask(task: Task): Observable<Task> {
    const endpoint = environment.apiServer.serverUrl + environment.apiServer.tasks;
    const request: Task = {
      ...task
    }
    return this.http.post<Task>(endpoint, request);
  }

  deleteTask(task: Task): Observable<Task[]> {
    const endpoint = environment.apiServer.serverUrl + environment.apiServer.tasks + '/' + task.id;
    return this.http.delete<Task[]>(endpoint);
  }
}
