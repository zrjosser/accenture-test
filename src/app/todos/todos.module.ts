import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosStore } from './store/store';
import { TodosListComponent } from './todos-list/todos-list.component';
import { NavComponent } from './nav/nav.component';
import { ModalTodoComponent } from './modal-todo/modal-todo.component';
import { EffectsArray } from './store/effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TodosListComponent,
    NavComponent,
    ModalTodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('todos', TodosStore.appReducers),
    EffectsModule.forFeature(EffectsArray),
  ]
})
export class TodosModule { }
