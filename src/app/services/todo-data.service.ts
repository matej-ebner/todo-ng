import { Injectable } from "@angular/core";
import { Dictionary } from "../enums/dictionary.enum";
import { TodoDTO } from "../interfaces/todo-dto.interface";
import { TodoListDTO } from "../interfaces/todo-list-dto.interface";

@Injectable({
  providedIn: "root",
})
export class TodoDataService {
  dictionary = Dictionary;

  todosList: TodoListDTO;

  constructor() {}

  filterTodos(todos: TodoDTO[]): TodoListDTO {
    let todoStatus: TodoDTO[] = [];
    let inProgressStatus: TodoDTO[] = [];
    let doneStatus: TodoDTO[] = [];

    todos.forEach((todo: TodoDTO) => {
      switch (todo.status) {
        case this.dictionary.TODO_STATUS:
          todoStatus.push(todo);
          break;
        case this.dictionary.IN_PROGRESS_STATUS:
          inProgressStatus.push(todo);
          break;
        case this.dictionary.DONE_STATUS:
          doneStatus.push(todo);
          break;
      }
    });

    return {
      todo: this.orderTodos(todoStatus),
      inProgress: this.orderTodos(inProgressStatus),
      done: this.orderTodos(doneStatus),
    };
  }

  private orderTodos(todos: TodoDTO[]): TodoDTO[] {
    const sorted = todos.sort(function (a, b) {
      return new Date(a.date).valueOf() - new Date(b.date).valueOf();
    });

    return sorted;
  }
}
