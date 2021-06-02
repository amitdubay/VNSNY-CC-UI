import { DatePipe } from '@angular/common';
import { GlobalConstants } from 'src/app/common/global-contants';
import { FormatAppointmentDateTimePipe } from './format-appointment-date-time.pipe';

describe('FormatAppointmentDateTimePipe', () => {
  let datePipe: DatePipe;
  let formatAppointmentDateTimePipe;
  beforeEach(() => {
    datePipe = new DatePipe('en-US');
    formatAppointmentDateTimePipe = new FormatAppointmentDateTimePipe(datePipe);
  });

  it('create an instance', () => {
    const pipe = new FormatAppointmentDateTimePipe(datePipe);
    expect(pipe).toBeTruthy();
  });

  it('should return only date', () => {
    const now = new Date();
    const fromDate = new Date(now.setDate(now.getDate() + 2));
    const toDate = new Date();
    const onlyDate = true;

    const result = formatAppointmentDateTimePipe.transform(
      fromDate,
      toDate,
      onlyDate
    );
    const expectedResult = datePipe.transform(
      fromDate,
      GlobalConstants.dateFormat
    );
    expect(result).toContain(expectedResult);
  });

  it('should return empty string', () => {
    const fromDate = new Date();
    const toDate = new Date();
    const onlyDate = true;

    const result = formatAppointmentDateTimePipe.transform(
      fromDate,
      toDate,
      onlyDate
    );

    expect(result).toEqual('');
  });

  it('should return time part  ', () => {
    const fromDate = new Date();
    const toDate = new Date();
    const onlyDate = false;

    const fromTime = datePipe.transform(
      fromDate,
      `${GlobalConstants.timeFormat}`
    );

    const toTime = datePipe.transform(toDate, `${GlobalConstants.timeFormat}`);
    const result = formatAppointmentDateTimePipe.transform(
      fromDate,
      toDate,
      onlyDate
    );
    expect(result).toContain(fromTime);
    expect(result).toContain(toTime);
  });
});
