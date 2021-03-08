import { Component, Input } from "@angular/core";

import { Dictionary } from "src/app/enums/dictionary.enum";
import { TodoDTO } from "src/app/interfaces/todo-dto.interface";

@Component({
  selector: "td-todos-table",
  templateUrl: "./todos-table.component.html",
  styleUrls: ["./todos-table.component.scss"],
})
export class TodosTableComponent {
  dictionary = Dictionary;

  @Input() todos: TodoDTO[];
  @Input() status: string;

  constructor() {}
}
