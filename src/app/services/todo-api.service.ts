import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

import { TodoDTO } from "../interfaces/todo-dto.interface";

@Injectable({
  providedIn: "root",
})
export class TodoApiService {
  todos: TodoDTO[] = [];

  constructor(private http: HttpClient) {}

  saveTodoRequest(formData: Object): Observable<any> {
    return this.http.post(environment.baseApiUrl + "new-todo", formData);
  }

  deleteTodoRequest(todo: TodoDTO): Observable<any> {
    return this.http.delete(
      environment.baseApiUrl + "delete-todo?id=" + todo.id
    );
  }

  getTodoRequest(id: number): Observable<any> {
    return this.http.get(environment.baseApiUrl + "get-todo/?id=" + id);
  }

  getTodosRequest(): Observable<any> {
    return this.http.get(environment.baseApiUrl + "todos");
  }
}
