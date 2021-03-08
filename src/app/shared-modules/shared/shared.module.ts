import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { IconsModule } from "src/app/icons/icons.module";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "src/app/pipes/date.pipe";

@NgModule({
  declarations: [DatePipe],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    IconsModule,
    DatePipe
  ],
})
export class SharedModule {}
