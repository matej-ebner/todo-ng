import { Component, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { TodoDTO } from "src/app/interfaces/todo-dto.interface";
import { TodoApiService } from "src/app/services/todo-api.service";
import { TodoDataService } from "src/app/services/todo-data.service";

@Component({
  selector: "td-todo-detail",
  templateUrl: "./todo-detail.component.html",
  styleUrls: ["./todo-detail.component.scss"],
})
export class TodosDetailComponent implements OnDestroy {
  @Input() todo: TodoDTO;

  confirmTodoDeletion: boolean = false;

  deleteTodoSubscription: Subscription;

  constructor(
    private todoApiService: TodoApiService,
    private todoDataService: TodoDataService
  ) {}

  deleteModalAction(deletionConfirmed: boolean) {
    if (deletionConfirmed) {
      this.deleteTodo();
    } else {
      this.confirmTodoDeletion = false;
    }
  }

  private deleteTodo() {
    this.deleteTodoSubscription = this.todoApiService
      .deleteTodoRequest(this.todo)
      .subscribe((response: TodoDTO[]) => {
        this.todoDataService.todosList = this.todoDataService.filterTodos(
          response
        );
        this.confirmTodoDeletion = false;
      });
  }

  ngOnDestroy(): void {
    if (this.deleteTodoSubscription) {
      this.deleteTodoSubscription.unsubscribe();
    }
  }
}
