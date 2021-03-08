import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { TodoDTO } from "src/app/interfaces/todo-dto.interface";

import { PageTitleService } from "src/app/services/page-title.service";
import { TodoApiService } from "src/app/services/todo-api.service";

@Component({
  selector: "td-edit-todo-container",
  templateUrl: "./edit-todo-container.component.html",
  styleUrls: ["./edit-todo-container.component.scss"],
})
export class EditTodoContainerComponent implements OnInit, OnDestroy {
  getTodoSubscription: Subscription;
  todo: TodoDTO;

  constructor(
    private pageTitleService: PageTitleService,
    private route: ActivatedRoute,
    private todoApiService: TodoApiService
  ) {
    this.pageTitleService.setTitleAddOnString("edit");
  }
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.getTodo(id);
  }

  getTodo(id: number): void {
    this.getTodoSubscription = this.todoApiService
      .getTodoRequest(id)
      .subscribe((response: TodoDTO) => {
        this.todo = response;
      });
  }

  ngOnDestroy(): void {
    if (this.getTodoSubscription) {
      this.getTodoSubscription.unsubscribe();
    }
  }
}
