import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';


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
    this.setToStorage();
  
  }
  
  public delTodo(index: number) {
    this.todos.splice(index, 1);  
    this.setToStorage();
  }
  
  public updateTodo(index: number, value: string, date: string) {
     let todo : Todo = this.todos[index];
     todo.value = value;
     date = date.replace("-", "/");
     todo.date = new Date(date);
     this.todos.splice(index, 1, todo);
     this.setToStorage();

  }
  






public async setToStorage() {
  await Storage.set({
    key: 'tarefas',
    value: JSON.stringify(this.todos)
  });
}



public async getFromStorage() {
  const resp = await Storage.get({ key: 'tarefas'});
  let tempTarefas : any[] = JSON.parse(resp.value);

  if (!tempTarefas != null) {
    for (let t of tempTarefas) {
      if (t.date != null) {
        t.date = t.date.substring(0,10); 
        t.date = t.date.replace(/-/g, "/");
      } else {
        t.date = "";
      }
      let todo : Todo = {value: t.value, date: new Date(t.date), done: t.done};
      this.todos.push(todo);

    }
    
  }
}




}

interface Todo {
  value: string;
  date: Date;
  done?: boolean;
}
