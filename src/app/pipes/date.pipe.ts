import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "datePipe",
})
export class DatePipe implements PipeTransform {
  constructor() {}

  transform(date: string): string {
    const dateTimeArray = date.split("T");

    const dateArray = dateTimeArray[0].split("-");

    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];

    return day + "/" + month + "/" + year + " " + dateTimeArray[1];
  }
}
