import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared-modules/shared/shared.module";
import { ModalModule } from "../modal/modal.module";
import { TodosDetailComponent } from "./todo-detail.component";

@NgModule({
  declarations: [TodosDetailComponent],
  imports: [SharedModule, ModalModule],
  exports: [TodosDetailComponent],
})
export class TodosDetailModule {}
