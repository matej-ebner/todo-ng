import { Component } from "@angular/core";
import { ErrorsService } from "./services/errors.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {

  constructor(public errorsService: ErrorsService) {}
}
