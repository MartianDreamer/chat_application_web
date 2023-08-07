import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDate'
})
export class DatePipe implements PipeTransform {

  transform(value: string | undefined, ...args: string[]): string {
    if (!value) {
      return '';
    }
    const parsedDate = new Date(value);
    const today = new Date();
    if (today.toDateString() === parsedDate.toDateString()) {
      return parsedDate.toTimeString().substring(0,5);
    } else {
      return parsedDate.toDateString();
    }
  }

}
