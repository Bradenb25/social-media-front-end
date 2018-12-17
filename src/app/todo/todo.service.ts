import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private createTodoUrl: string;
  private getTodoUrl: string;
  private updateTodoUrl: string;

  constructor(private _http: HttpClient) {
    this.createTodoUrl = `/todo`;
    this.getTodoUrl = `/todo`;
    this.updateTodoUrl = `/todo`;
  }

  createTodo(todo: ToDo) {
    return this._http.post(this.createTodoUrl, todo);
  }

  getTodoItems() {
    return this._http.get<ToDo[]>(this.getTodoUrl);
  }

  updateTodoItem(todo: ToDo) {
    return this._http.put(this.updateTodoUrl, todo);
  }

}
