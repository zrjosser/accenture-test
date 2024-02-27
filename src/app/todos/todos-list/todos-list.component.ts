import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TodosStore } from '../store/store';
import { TodosActions } from '../store/actions';
import { SessionService } from 'src/app/core/services/session.service';
import { Observable, Subject, startWith, takeUntil } from 'rxjs';
import { Task } from 'src/app/core/models/task.to';
import { ModalTodoComponent } from '../modal-todo/modal-todo.component';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit, OnDestroy {

  @ViewChild('content', { static: false })
  public modal!: ModalTodoComponent;
  newTask: Task;


  openModal(modalRef: ModalTodoComponent, type: string, task: Task) {
    modalRef.open(modalRef.templateRef, type, task);
  }

  destroyed$ = new Subject<boolean>();
  loading: boolean;
  sub: any;
  tasks: Task[];

  tasks$ = this.updates$.pipe(
    ofType(TodosActions.getTodosSuccess),
    takeUntil(this.destroyed$)
  )
    .subscribe((data) => {
      this.loading = false;
      this.tasks = data.response;
    });

  updateTasks$ = this.updates$.pipe(
    ofType(TodosActions.updateTaskSucess),
    takeUntil(this.destroyed$)
  )
    .subscribe((data) => {
      this.loading = false;
      this.selectedTask = {
        id: this.selectedTask.id,
        title: this.selectedTask.title,
        completed: !this.selectedTask.completed,
        userId: this.selectedTask.userId,
        description: this.selectedTask.description
      };

      const taskCopy = [...this.tasks];
      taskCopy[this.selectedIndex] = this.selectedTask;
      this.tasks = taskCopy;
    });

  deleteTasks$ = this.updates$.pipe(
    ofType(TodosActions.deleteTaskSucess),
    takeUntil(this.destroyed$)
  )
    .subscribe((data) => {
      this.loading = false;
      this.tasks = this.tasks.filter(x => parseInt(x.id, 10) !== parseInt(this.selectedTask.id, 10));
    });

  addTask$ = this.updates$.pipe(
    ofType(TodosActions.addTaskSucess),
    takeUntil(this.destroyed$)
  )
    .subscribe((data) => {
      const task = data.response.task;
      this.loading = false;
      const taskCopy = [...this.tasks];
      taskCopy.push(task);
      this.tasks = taskCopy;
    });



  selectedIndex: number;
  selectedTask: Task;

  constructor(
    private store: Store<TodosStore.AppState>,
    private updates$: Actions,
    private sessionService: SessionService
  ) {
    this.loading = false;
    this.selectedIndex = 0;
    this.selectedTask = {
      id: '',
      userId: '',
      title: '',
      description: '',
      completed: false
    };

    this.newTask = {
      id: '',
      userId: '',
      title: '',
      description: '',
      completed: false
    };
    this.tasks = [];

  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.loading = true;
    this.store.dispatch(TodosActions.getTodos({ request: this.sessionService.user }));
  }

  markDone(index: number) {
    this.selectedIndex = index;
    this.selectedTask = this.tasks[this.selectedIndex];
    this.store.dispatch(TodosActions.updateTask({ payload: { task: this.tasks[index] } }));
  }

  edit(index: number) {
    this.selectedIndex = index;
    this.store.dispatch(TodosActions.showModal({ payload: { task: this.tasks[this.selectedIndex], type: 'EDIT' } }));
  }

  addNew(index: number) {
    this.selectedIndex = index;
    this.store.dispatch(TodosActions.showModal({ payload: { task: this.tasks[this.selectedIndex], type: 'ADD' } }));
  }


  delete(index: number) {
    this.selectedIndex = index;
    this.selectedTask = this.tasks[index];
    this.store.dispatch(TodosActions.deleteTask({ payload: { task: this.tasks[this.selectedIndex] } }));
  }
}
