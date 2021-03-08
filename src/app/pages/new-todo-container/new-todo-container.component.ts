import { Component } from "@angular/core";

import { PageTitleService } from "src/app/services/page-title.service";

@Component({
  selector: "td-new-todo-container",
  templateUrl: "./new-todo-container.component.html",
  styleUrls: ["./new-todo-container.component.scss"],
})
export class NewTodoContainerComponent {
  constructor(private pageTitleService: PageTitleService) {
    this.pageTitleService.setTitleAddOnString("new");
  }
}
