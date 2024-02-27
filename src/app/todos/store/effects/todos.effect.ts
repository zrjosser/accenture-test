import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as _ from 'lodash';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { TodosActions } from '../actions';

import { of } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';
import { Task } from 'src/app/core/models/task.to';

@Injectable()
export class TodosEffects {

    tasks: Task[];

    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private sessionService: SessionService,
        private router: Router
    ) {
        this.tasks = [];
    }

    getTodos$ = createEffect(
        () => this.actions$.pipe(
            ofType(TodosActions.getTodos),
            mergeMap(
                (action) => this.dataService.getTasks(this.sessionService.user)
                    .pipe(
                        map(res => {
                            const dataArray = Array.isArray(res) ? res : [res];
                            return TodosActions.getTodosSuccess({ response: dataArray });
                        }),
                        catchError((error) => of(TodosActions.getTodosError({ payload: 'Error al consultar servicio' })))
                    )
            )
        )
    );

    updateTodos$ = createEffect(
        () => this.actions$.pipe(
            ofType(TodosActions.updateTask),
            mergeMap(
                (action) => this.dataService.updateTask(action.payload.task)
                    .pipe(
                        map(res => {
                            const dataArray = Array.isArray(res) ? res : [res];
                            return TodosActions.updateTaskSucess({ response: { task: dataArray } });
                        }),
                        catchError((error) => of(TodosActions.updateTaskError({ payload: 'Error al consultar servicio' })))
                    )
            )
        )
    );

    deleteTodos$ = createEffect(
        () => this.actions$.pipe(
            ofType(TodosActions.deleteTask),
            mergeMap(
                (action) => this.dataService.deleteTask(action.payload.task)
                    .pipe(
                        map(res => {
                            return TodosActions.deleteTaskSucess();
                        }),
                        catchError((error) => of(TodosActions.deleteTaskError({ payload: 'Error al consultar servicio' })))
                    )
            )
        )
    );

    addTodos$ = createEffect(
        () => this.actions$.pipe(
            ofType(TodosActions.addTask),
            mergeMap(
                (action) => this.dataService.createTask(action.payload.task)
                    .pipe(
                        map(res => {
                            const task = res;
                            return TodosActions.addTaskSucess({ response: { task: task } });
                        }),
                        catchError((error) => of(TodosActions.addTaskError({ payload: 'Error al consultar servicio' })))
                    )
            )
        )
    );

}
