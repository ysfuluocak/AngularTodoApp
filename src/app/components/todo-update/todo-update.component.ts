import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoUpdate } from 'src/app/models/todo-update';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css'],
})
export class TodoUpdateComponent implements OnInit {
  updatedTodoItem: Todo | undefined;
  form: FormGroup = new FormGroup({});

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: this.formBuilder.control('', Validators.required),
      id: this.formBuilder.control(0),
      created: this.formBuilder.control(new Date()),
      isCompleted: this.formBuilder.control(false),
    });

    let activeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.todoService.getTodo(activeId).subscribe((response) => {
      this.form?.get('content')?.setValue(response.content);
      this.form?.get('id')?.setValue(response.id);
      this.form?.get('created')?.setValue(response.created);
      this.form?.get('isCompleted')?.setValue(response.isCompleted);
    });
  }

  updatedTodo() {
    this.updatedTodoItem = {
      id: this.form?.get('id')?.value,
      content: this.form?.get('content')?.value,
      created: this.form?.get('created')?.value,
      isCompleted: this.form?.get('isCompleted')?.value,
    };
    this.todoService.updateTodo(this.updatedTodoItem).subscribe((response) => {
      if (response) {
        this.router.navigateByUrl('/todos');
      } else {
        alert('Güncellenemedi!');
      }
    });
  }
}
