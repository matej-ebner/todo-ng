import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared-modules/shared/shared.module";
import { TodosDetailModule } from "../todo-detail/todo-detail.module";
import { TodosTableComponent } from "./todos-table.component";

@NgModule({
  declarations: [TodosTableComponent],
  imports: [SharedModule, TodosDetailModule],
  exports: [TodosTableComponent],
})
export class TodosTableModule {}
