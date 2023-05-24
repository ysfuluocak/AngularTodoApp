import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  dataLoaded: boolean = false;
  constructor(private todoService: TodoService ) {}

  ngOnInit(): void {
    this.getTodos();
    this.dataLoaded = false;
  }

  getTodos() {
    this.todoService.getTodos().subscribe((response) => {
      this.todos = response;
      console.log(response);
      this.dataLoaded = true;
    });
  }
  getTodo(id: number) {
    this.todoService.getTodo(id).subscribe((response) => {
      console.log(response);
    });
  }
  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe((response) => {
      if (response) {
        this.getTodos();
      } else {
        alert('Silinemedi!');
      }
    });
  }
  isCompletedTodo(id: number) {
    this.todoService.isCompleted(id).subscribe((response) => {
      if (response) {
        this.getTodos();
      } else {
        alert('Tamamlanamadı!');
      }
    });
  }
}
