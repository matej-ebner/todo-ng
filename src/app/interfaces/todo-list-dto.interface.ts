import { TodoDTO } from "./todo-dto.interface";

export interface TodoListDTO {
  todo: TodoDTO[];
  inProgress: TodoDTO[];
  done: TodoDTO[];
}
