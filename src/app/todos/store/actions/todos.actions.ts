import { createAction, props } from '@ngrx/store';
import { TodosTypes } from '../../shared/enums';
import { User } from 'src/app/core/models/user.to';
import { Task } from 'src/app/core/models/task.to';

export const getTodos = createAction(
    TodosTypes.TODOS_LIST,
    props<{ request: User }>()
);

export const getTodosSuccess = createAction(
    TodosTypes.TODOS_LIST_SUCCESS,
    props<{ response: Task[] }>()
);

export const getTodosError = createAction(
    TodosTypes.TODOS_LIST_ERROR,
    props<{ payload: any }>()
);

export const showModal = createAction(
    TodosTypes.SHOW_MODAL,
    props<{ payload: { task: Task, type: string } }>()
);

export const closeModal = createAction(
    TodosTypes.SHOW_MODAL,
    props<{ payload: string }>()
);

export const updateTask = createAction(
    TodosTypes.UPDATE_TASK,
    props<{ payload: { task: Task } }>()
);

export const updateTaskSucess = createAction(
    TodosTypes.UPDATE_TASK_SUCCESS,
    props<{ response: { task: Task[] } }>()
);

export const updateTaskError = createAction(
    TodosTypes.UPDATE_TASK_ERROR,
    props<{ payload: any }>()
);

export const deleteTask = createAction(
    TodosTypes.DELETE_TASK,
    props<{ payload: { task: Task } }>()
);

export const deleteTaskSucess = createAction(
    TodosTypes.DELETE_TASK_SUCCESS
);

export const deleteTaskError = createAction(
    TodosTypes.DELETE_TASK_ERROR,
    props<{ payload: any }>()
);

export const cleanState = createAction(
    TodosTypes.CLEAN_STATE
);

export const addTask = createAction(
    TodosTypes.ADD_TASK,
    props<{ payload: { task: Task } }>()
);

export const addTaskSucess = createAction(
    TodosTypes.ADD_TASK_SUCCESS,
    props<{ response: { task: Task } }>()
);

export const addTaskError = createAction(
    TodosTypes.ADD_TASK_ERROR,
    props<{ payload: any }>()
);
