import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  private todos: Todo[] = [];

  constructor() { }

  public getTodos() : Todo[] {
    return this.todos;
  }

  public addTodo(value: string, date: string) {
    date = date.replace("-", "/");
    let todo : Todo = {value: value, date: new Date(date), done: false};
    this.todos.push(todo);
    console.log(this.todos);
  
  }
  
  public delTodo() {
  
  }
  
  public updateTodo() {
  
  }
  


}



interface Todo {
  value: string;
  date: Date;
  done?: boolean;
}