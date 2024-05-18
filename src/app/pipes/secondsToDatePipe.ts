// src/app/date-hu-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToDatePipe'
})
export class SecondsToDatePipe implements PipeTransform {

  constructor() {}

  transform(seconds: number, format: string = 'yyyy. MMMM d.'): Date {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(seconds);

    return t;
  }
}
