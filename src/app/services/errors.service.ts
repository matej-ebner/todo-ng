import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ErrorsService {
  errorCode: number;

  constructor(private router: Router) {}

  handleError(error) {
    switch (error.status) {
      case 404:
        this.errorCode = 404;
        break;
      case 0:
        this.errorCode = 500;
        break;
    }

    setTimeout(() => {
      this.router.navigate(["/"]);
    }, 2000);
  }
}
