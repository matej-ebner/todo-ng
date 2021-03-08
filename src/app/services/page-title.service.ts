import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class PageTitleService {

  constructor(private titleService: Title) {}

  setTitleAddOnString(addedString: any): void {
    this.titleService.setTitle('TODO - ' + addedString);
  }


}
