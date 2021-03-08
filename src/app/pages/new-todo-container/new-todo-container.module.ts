import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TodoFormModule } from "src/app/components/todo-form/todo-form.module";
import { SharedModule } from "src/app/shared-modules/shared/shared.module";

import { NewTodoContainerComponent } from "./new-todo-container.component";

import { NewTodoContainerService } from "./new-todo-container.service";

const routes: Routes = [{ path: "", component: NewTodoContainerComponent }];

@NgModule({
  declarations: [NewTodoContainerComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TodoFormModule
  ],
  providers: [NewTodoContainerService],
})
export class NewTodoContainerModule {}
