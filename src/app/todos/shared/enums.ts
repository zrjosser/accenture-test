export enum TodosTypes {
  TODOS_LIST = '[Todos] call Todos service',
  TODOS_LIST_SUCCESS = '[Todos] call Todos service success',
  TODOS_LIST_ERROR = '[Todos] call Todos service error',
  CLEAN_STATE = '[Todos] call Todos service cleared',
  SHOW_MODAL = '[Todos] open add/edit modal',
  CLOSE_MODAL = '[Todos] close add/edit modal',
  UPDATE_TASK = '[Todos] call PUT Todos Services',
  UPDATE_TASK_SUCCESS = '[Todos] close add/edit modal',
  UPDATE_TASK_ERROR = '[Todos] close add/edit modal',
  DELETE_TASK = '[Todos] call DELETE Todos Services',
  DELETE_TASK_SUCCESS = '[Todos] cal DELETE todos Services success',
  DELETE_TASK_ERROR = '[Todos] cal DELETE todos Services error',
  ADD_TASK = "ADD_TASK",
  ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS",
  ADD_TASK_ERROR = "ADD_TASK_ERROR"
}
