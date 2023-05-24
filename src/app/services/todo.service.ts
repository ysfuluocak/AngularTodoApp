import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Todo } from '../models/todo';
import { Observable, map } from 'rxjs';
import { TodoAdd } from '../models/todo-add';
import { TodoUpdate } from '../models/todo-update';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  url: string = 'https://localhost:7001/api/Todos/';
  constructor(private todoService: HttpService) {}

  getTodos(): Observable<Todo[]> {
    return this.todoService.getList<Todo>(this.url);
  }

  getTodo(id: number): Observable<Todo> {
    let newPath = this.url + id;
    return this.todoService.get<Todo>(newPath);
  }

  addTodo(addItem: TodoAdd) {
    return this.todoService.add<Todo>(this.url, addItem);
  }

  updateTodo(updateItem: Todo) {
    let newPath: string = this.url + updateItem.id;
    return this.todoService
      .update<Response>(newPath, updateItem)
      .pipe(map((response) => response.status === 204));
  }

  deleteTodo(id: number) {
    let newPath: string = this.url + id;
    return this.todoService
      .delete<Response>(newPath)
      .pipe(map((response) => response.status === 204));
  }

  isCompleted(id: number) {
    let newPath: string = this.url+'isCompleted/' + id;
    let updateItem: TodoUpdate = { id, content: '' };
    return this.todoService
      .update<Response>(newPath, updateItem)
      .pipe(map((response) => response.status === 204));
  }
}
