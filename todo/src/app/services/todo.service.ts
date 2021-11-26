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
  
  public delTodo(index: number) {
    this.todos.splice(index, 1);  
  }
  
  public updateTodo(index: number, value: string, date: string) {
     let todo : Todo = this.todos[index];
     todo.value = value;
     date = date.replace("-", "/");
     todo.date = new Date(date);
     this.todos.splice(index, 1, todo);

  }
  


}



interface Todo {
  value: string;
  date: Date;
  done?: boolean;
}