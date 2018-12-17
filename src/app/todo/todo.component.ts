import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoService } from './todo.service';
import { ToDo } from './todo';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoSvc: TodoService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  todoList: ToDo[];
  todoItem: string;
  dataSource: MatTableDataSource<any>;
  // displayedColumns: ['item', 'completed'];
  // dataSource: any;

  displayedColumns: string[] = ['checkbox', 'item', 'completed'];
  // dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.getTodos();
  }

  createTodo() {
    let todo = new ToDo();
    todo.item = this.todoItem;
    this.todoSvc.createTodo(todo)
      .subscribe(x => {
        this.todoItem = '';
        this.changeDataSourceData(todo);
      })
  }

  private changeDataSourceData(todo: ToDo) {
    this.dataSource.data;
    let data = this.dataSource.data;
    data.push(todo);
    this.dataSource = new MatTableDataSource(data);
  }

  getTodos() {
    this.todoSvc.getTodoItems()
      .subscribe(x => {
        this.todoList = x;
        this.dataSource = new MatTableDataSource(x);
      });
  }

  updateTodo(todo: ToDo) {
    todo.completed = !(todo.completed);
    this.todoSvc.updateTodoItem(todo)
    .subscribe(x => {

    });
  }

  getChecked(element) {
    return element.completed;
  }
}