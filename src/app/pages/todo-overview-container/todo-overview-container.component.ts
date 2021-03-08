import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Dictionary } from "src/app/enums/dictionary.enum";

import { TodoDTO } from "src/app/interfaces/todo-dto.interface";
import { TodoListDTO } from "src/app/interfaces/todo-list-dto.interface";

import { PageTitleService } from "src/app/services/page-title.service";
import { TodoApiService } from "src/app/services/todo-api.service";
import { TodoDataService } from "src/app/services/todo-data.service";

@Component({
  selector: "td-todo-overview-container",
  templateUrl: "./todo-overview-container.component.html",
  styleUrls: ["./todo-overview-container.component.scss"],
})
export class TodoOverviewContainerComponent implements OnInit {
  dictionary = Dictionary;

  todosListObservable$: Observable<TodoListDTO>;

  constructor(
    private pageTitleService: PageTitleService,
    private todoApiService: TodoApiService,
    private todoDataService: TodoDataService
  ) {
    this.pageTitleService.setTitleAddOnString("Overview");
  }

  ngOnInit(): void {
    this.todosListObservable$ = this.todoApiService.getTodosRequest().pipe(
      map((response: TodoDTO[]) => {
        const todosSorted = this.todoDataService.filterTodos(response);
        this.todoDataService.todosList = todosSorted;
        return todosSorted;
      })
    );
  }
}
