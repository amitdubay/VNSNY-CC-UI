import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-contants';
@Pipe({
  name: 'formatAppointmentDateTime',
})
export class FormatAppointmentDateTimePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(fromDate: Date, toDate: Date, onlyDate?: boolean): string {
    let returnValue = '';
    const today: Date = new Date();
    if (onlyDate === true) {
      if (today.toDateString() !== new Date(fromDate).toDateString()) {
        returnValue = this.datePipe.transform(
          fromDate,
          `${GlobalConstants.dateFormat}`
        );
      }
    } else {
      const fromTime = this.datePipe.transform(
        fromDate,
        GlobalConstants.timeFormat
      );
      const toTime = this.datePipe.transform(
        toDate,
        GlobalConstants.timeFormat
      );
      returnValue = `${fromTime} to ${toTime}`;
    }

    return returnValue;
  }
}
