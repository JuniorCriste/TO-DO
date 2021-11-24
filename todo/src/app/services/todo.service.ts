import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  private todos: Todo[] = [];

  constructor() { }

  public getTodo() : Todo[] {
    return this.todos;
  }

  public addTodo() {
  
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