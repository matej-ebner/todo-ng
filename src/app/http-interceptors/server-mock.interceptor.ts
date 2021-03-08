import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { TodoDTO } from "../interfaces/todo-dto.interface";

const requestsUrls = [
  {
    url: environment.baseApiUrl + "get-todo",
    action: "getTodo",
  },
  {
    url: environment.baseApiUrl + "todos",
    action: "todos",
  },
  {
    url: environment.baseApiUrl + "new-todo",
    action: "newTodo",
  },
  {
    url: environment.baseApiUrl + "edit-todo",
    action: "editTodo",
  },
  {
    url: environment.baseApiUrl + "delete-todo",
    action: "deleteTodo",
  },
];

// Since there is no API for this application i created this "in app" API
// just so that the application can behave like real application

@Injectable()
export class ServerMockInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const url = requestsUrls.find((url) => request.url.includes(url.url));

    let response: any;

    for (const requestUrl of requestsUrls) {
      if (request.url.includes(requestUrl.url)) {
        switch (url.action) {
          case "getTodo":
            response = this.getTodo(request);
            break;
          case "todos":
            response = this.getTodos();
            break;
          case "editTodo":
          case "newTodo":
            response = this.saveTodo(request);
            break;
          case "deleteTodo":
            response = this.deleteTodo(request);
            break;
          default:
            response = false;
            break;
        }

        if (response instanceof Object) {
          if (response.status === 404) {
            this.router.navigate(["/not-found"]);
          } else {
            return of(new HttpResponse({ status: 200, body: response.body }));
          }
        } else {
          return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
              return throwError(error);
            })
          );
        }
      }
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  private getTodo(request: HttpRequest<any>) {
    const todosFromLocalStorage = this.getTodosFromLocalStorage();
    const todoIdParam = Number(request.urlWithParams.split("=")[1]);

    const todo = todosFromLocalStorage.find((todo) => todo.id == todoIdParam);

    if (todo) {
      return this.assembleResponseData(200, todo);
    } else {
      return this.assembleResponseData(404);
    }
  }

  private getTodos(todosArray?: TodoDTO[]) {
    let todos: TodoDTO[] = [];
    if (!todosArray) {
      const todosFromLocalStorage = this.getTodosFromLocalStorage();
      if (!todosFromLocalStorage) {
        todos = [];
        localStorage.setItem("test-todo-task-todos", JSON.stringify(todos));
      } else {
        todos = todosFromLocalStorage;
      }
    } else {
      todos = todosArray;
    }

    return this.assembleResponseData(200, todos);
  }

  private saveTodo(request: HttpRequest<any>) {
    const todosFromLocalStorage = this.getTodosFromLocalStorage()
      ? this.getTodosFromLocalStorage()
      : [];

    let todo: TodoDTO = {
      id: undefined,
      name: undefined,
      description: undefined,
      date: undefined,
      status: undefined,
    };

    todo = this.newEditTodoSetData(request, todo);

    if (todo.id) {
      let updateTodo = todosFromLocalStorage.find(
        (todoFromStorage) => todoFromStorage.id === todo.id
      );
      const indexOfTodo = todosFromLocalStorage.indexOf(updateTodo);
      updateTodo = this.newEditTodoSetData(request, updateTodo);
      todosFromLocalStorage[indexOfTodo] = updateTodo;
    } else {
      if (todosFromLocalStorage) {
        let maxId = 0;

        todosFromLocalStorage.map((todo) => {
          if (todo.id > maxId) maxId = todo.id;
        });
        todo.id = maxId + 1;
      } else {
        todo.id = 1;
      }

      todosFromLocalStorage.push(todo);
    }

    localStorage.setItem(
      "test-todo-task-todos",
      JSON.stringify(todosFromLocalStorage)
    );
    return this.getTodos();
  }

  private deleteTodo(request: HttpRequest<any>) {
    const todoIdParam = Number(request.urlWithParams.split("=")[1]);
    const todosFromLocalStorage = this.getTodosFromLocalStorage();
    let deletedTodo = todosFromLocalStorage.find(
      (todo) => todo.id == todoIdParam && todo.status !== "deleted"
    );

    deletedTodo.status = "deleted";

    const indexOfContact = todosFromLocalStorage.indexOf(deletedTodo);
    todosFromLocalStorage[indexOfContact] = deletedTodo;

    localStorage.setItem(
      "test-todo-task-todos",
      JSON.stringify(todosFromLocalStorage)
    );
    return this.assembleResponseData(200, todosFromLocalStorage);
  }

  private getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem("test-todo-task-todos"));
  }

  private newEditTodoSetData(
    request: HttpRequest<any>,
    todo: TodoDTO
  ): TodoDTO {
    todo.id = request.body["id"];
    todo.name = request.body["name"];
    todo.description = request.body["description"];
    todo.date = request.body["date"];
    todo.status = request.body["status"];

    return todo;
  }

  private assembleResponseData(status: number, body?: Array<any>) {
    return {
      status: status,
      body: body,
    };
  }
}
