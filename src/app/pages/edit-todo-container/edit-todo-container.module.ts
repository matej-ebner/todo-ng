import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TodoFormModule } from "src/app/components/todo-form/todo-form.module";
import { SharedModule } from "src/app/shared-modules/shared/shared.module";

import { EditTodoContainerComponent } from "./edit-todo-container.component";

import { EditTodoContainerService } from "./edit-todo-container.service";

const routes: Routes = [{ path: "", component: EditTodoContainerComponent }];

@NgModule({
  declarations: [EditTodoContainerComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    TodoFormModule
  ],
  providers: [EditTodoContainerService],
})
export class EditTodoContainerModule {}
