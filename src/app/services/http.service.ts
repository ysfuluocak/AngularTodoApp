import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoAdd } from '../models/todo-add';
import { TodoUpdate } from '../models/todo-update';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpService: HttpClient) {}

  getList<T>(path: string):Observable<T[]> 
  {
    return this.httpService.get<T[]>(path);
  }

  get<T>(path: string): Observable<T> 
  {
    return this.httpService.get<T>(path);
  }

  add<T>(path: string, addItem: TodoAdd) :Observable<HttpResponse<T>> 
  {
    return this.httpService.post<T>(path, addItem,{observe:"response"});
  }

  update<T>(path: string, updateItem: TodoUpdate) :Observable<HttpResponse<T>> 
  {
    return this.httpService.put<T>(path, updateItem,{observe:"response"});
  }

  delete<T>(path:string) :Observable<HttpResponse<T>>
  {
    return this.httpService.delete<T>(path,{observe:"response"});
  }

  
}
