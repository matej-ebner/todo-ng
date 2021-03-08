import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TodosTableModule } from "src/app/components/todos-table/todos-table.module";
import { SharedModule } from "src/app/shared-modules/shared/shared.module";

import { TodoOverviewContainerComponent } from "./todo-overview-container.component";

import { TodoOverviewContainerService } from "./todo-overview-container.service";

const routes: Routes = [{ path: "", component: TodoOverviewContainerComponent }];

@NgModule({
  declarations: [TodoOverviewContainerComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TodosTableModule
  ],
  providers: [TodoOverviewContainerService],
})
export class TodoOverviewContainerModule {}
