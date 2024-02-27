import { Component, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodosStore } from '../store/store';
import { Store } from '@ngrx/store';
import { TodosActions } from '../store/actions';
import { Task } from 'src/app/core/models/task.to';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-modal-todo',
  templateUrl: './modal-todo.component.html',
  styleUrls: ['./modal-todo.component.css']
})
export class ModalTodoComponent {
  onSubmit() {
    throw new Error('Method not implemented.');
  }

  @Input() type: string;

  private modalService = inject(NgbModal);
  closeResult: string;

  @ViewChild('content')
  public templateRef!: TemplateRef<any>;

  todoForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(
    private store: Store<TodosStore.AppState>,
    private sessionService: SessionService
  ) {
    this.type = 'ADD';
    this.closeResult = '';
  }

  open(content: TemplateRef<any>, type: string, task: Task) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        debugger;
        const newTask: Task = {
          userId: this.sessionService.userId,
          description: this.todoForm.controls.description.value || '',
          title: this.todoForm.controls.title.value || '',
          completed: false,
          id: ''
        }
        if (type === 'ADD') {
          this.store.dispatch(TodosActions.addTask({ payload: { task: newTask } }));
        } else {
          this.store.dispatch(TodosActions.updateTask({ payload: { task: task } }));
        }

      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
