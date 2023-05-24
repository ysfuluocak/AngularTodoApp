import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoAdd } from 'src/app/models/todo-add';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
  form: FormGroup;
  addedTodoItem: TodoAdd = { content: '' };
  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      content: formBuilder.control('', Validators.required),
    });
  }

  ngOnInit(): void {}

  addTodo() {
    this.todoService.addTodo(this.addedTodoItem).subscribe((response) => {
      if (response) this.router.navigateByUrl('/todos');
    });
  }

  onSubmit() {
    if (this.form?.valid) {
      this.addedTodoItem = { content: this.form.get('content')?.value };
      this.addTodo();
    }
  }
}
