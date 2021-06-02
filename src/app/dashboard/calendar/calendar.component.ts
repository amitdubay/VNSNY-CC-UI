import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatCalendar,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import { AppSettings } from 'src/app/common/app-settings';
import { CommonMethods } from 'src/app/common/common-methods';
import { GlobalConstants } from 'src/app/common/global-contants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('appointment_date1', { static: false })
  appointmentdate1: MatCalendar<Date>;
  @Output() onOkClick = new EventEmitter<any>();

  isShowCalendar = false;
  isToday = true;
  is7 = false;
  is30 = false;
  is60 = false;
  currentDate = new Date();
  minDate1 = this.currentDate;
  maxDate1 = this.currentDate;
  currentMonth = this.currentDate.getMonth();
  selectedDates: Date[] = [];
  selectedDatesFor7Days: Date[] = [];
  // this is used to store the selected dates when the OK button is clicked.
  selectedDatesActual: Date[] = [];
  selectedDate = new Date();
  selectedDateObject = {
    startDate: new Date(),
    endDate: new Date(),
    selectedDates: [],
  };
  dateText = '';
  constructor() {
    this.selectedDates.push(
      CommonMethods.getDateWithOutHourMinute(this.currentDate)
    );
    this.setDateText(AppSettings.today);
  }

  ngOnInit(): void {}

  // this method is used to get the date with ordinal (st, rd th) to display in the textbox
  getDatesWithOrdinal = (): string => {
    let selectedDatesWithOrdinal = [];
    if (this.selectedDatesFor7Days.length > 0) {
      this.selectedDatesFor7Days.forEach((element) => {
        selectedDatesWithOrdinal.push(
          CommonMethods.getEnglishOrdinalSuffix(element)
        );
      });
    } else {
      this.selectedDates.forEach((element) => {
        selectedDatesWithOrdinal.push(
          CommonMethods.getEnglishOrdinalSuffix(element)
        );
      });
    }
    return selectedDatesWithOrdinal.join(', ');
  };
  // this sets the date text which is displayed in the calendar control text box.
  setDateText(daysSelected: number) {
    if (daysSelected === AppSettings.today) {
      this.dateText =
        GlobalConstants.today +
        GlobalConstants.symbolColon +
        ' ' +
        CommonMethods.getDateinMonthDayYear(this.currentDate);
    } else if (daysSelected === AppSettings.sevenDays) {
      this.dateText =
        AppSettings.sevenDays +
        ' ' +
        GlobalConstants.days +
        GlobalConstants.symbolColon +
        ' ' +
        GlobalConstants.monthNames[this.currentDate.getMonth()] +
        ' ' +
        this.getDatesWithOrdinal() +
        ' ' +
        this.currentDate.getFullYear();
    } else if (daysSelected === AppSettings.thirtyDays) {
      this.dateText = AppSettings.thirtyDays + ' ' + GlobalConstants.days;
    } else if (daysSelected === AppSettings.sixtyDays) {
      this.dateText = AppSettings.sixtyDays + ' ' + GlobalConstants.days;
    }
  }
  // this is used to handle the ok button click
  public handleOk(dateData): void {
    this.selectedDateObject = dateData;
    this.selectedDatesActual =
      this.selectedDatesFor7Days.length > 0 ? this.selectedDatesFor7Days : [];
    const selectedDayButton = this.isToday
      ? AppSettings.today
      : this.is7
      ? AppSettings.sevenDays
      : this.is30
      ? AppSettings.thirtyDays
      : AppSettings.sixtyDays;
    this.setDateText(selectedDayButton);
    this.onOkClick.next(dateData);
  }
  // this is used to show/hide the calendar control
  toggleCalendar = () => {
    this.isShowCalendar = !this.isShowCalendar;
  };
  // this is used to close the calendar and set the values on Ok click
  closeCalendar = () => {
    this.handleOk({
      startDate: this.minDate1,
      endDate: this.maxDate1,
      selectedDates: this.selectedDatesFor7Days,
    });
    this.isShowCalendar = false;
  };

  // this method is used to add the selected dates in the array - selectedDAte.  this helps in highlightingg the days in the calendar
  setSelectedDates = (numberofDays: number) => {
    this.selectedDatesFor7Days = [];
    this.selectedDates = [];
    if (numberofDays > 1) {
      numberofDays = numberofDays + 1;
    }
    for (let i = 0; i < numberofDays; i++) {
      const selDate = CommonMethods.addDays(this.currentDate, i);
      this.selectedDates.push(CommonMethods.getDateWithOutHourMinute(selDate));
    }
  };

  // this is used to set the flags to false.
  setAllFalse = () => {
    this.isToday = false;
    this.is30 = false;
    this.is60 = false;
    this.is7 = false;
  };

  // this is fired when the today button is clicked
  todayClick = () => {
    this.setAllFalse();
    this.isToday = true;
    this.setMaxDate(AppSettings.today);
    this.maxDate1 = this.currentDate;
    this.setSelectedDates(AppSettings.today);
    this.appointmentdate1._goToDateInView(this.minDate1, 'month');
  };

  // this is fired when the next seven days is clicked
  sevenDayClick = () => {
    this.setAllFalse();
    this.is7 = true;
    this.setMaxDate(AppSettings.sevenDays);
    this.setSelectedDates(AppSettings.sevenDays);
  };

  // this is fired when the 30 days is clicked
  thirtyDayClick = () => {
    this.setAllFalse();
    this.is30 = true;
    this.setMaxDate(AppSettings.thirtyDays);
    this.setSelectedDates(AppSettings.thirtyDays);
  };

  // this is fired when sixty days is clicked
  sixtyDayClick = () => {
    this.setAllFalse();
    this.is60 = true;
    this.setMaxDate(AppSettings.sixtyDays);
    this.setSelectedDates(AppSettings.sixtyDays);
  };

  // this is used to apply the css class to the calendar control for the selected dates.
  setDateClass = (calendarDate: Date, date: Date[]) => {
    let cssName = '';
    if (date.length > 0 && calendarDate.getDate() === date[0].getDate()) {
      cssName = GlobalConstants.selectedDayCSS;
      if (this.is7) {
        const dateFound = this.selectedDatesFor7Days.filter(
          (s) => s.getTime() === calendarDate.getTime()
        );
        if (dateFound.length > 0) {
          cssName = GlobalConstants.selected7DayCSS;
        }
      } else if (this.isToday) {
        // since the next date W.R.T to current is not getting displayed - to fix this issue
        cssName = GlobalConstants.selected7DayCSS;
      }
    }
    const nextDate = CommonMethods.getDateWithOutHourMinute(
      CommonMethods.addDays(this.currentDate, 1)
    );
    return cssName;
  };

  // this is used to apply the css class to the calendar control for the selected dates. this is fired from the html 
  dateClass = () => {
    return (calendarDate: Date): MatCalendarCellCssClasses => {
      const selDate = this.selectedDates.filter(
        (s) => s.getTime() == calendarDate.getTime()
      );
      return this.setDateClass(calendarDate, selDate);
    };
  };

  // this is used to set the max date based on the button click
  setMaxDate = (days) => {
    this.maxDate1 = CommonMethods.addDays(this.currentDate, days);
    this.selectedDate = null;
  };

  // this is fired when an individual date is selected on calendar control for 7 days
  getChangedValue(e) {
    if (
      this.selectedDatesFor7Days.filter((s) => s.getTime() === e.getTime())
        .length == 0
    ) {
      this.selectedDatesFor7Days.push(e);
    } else {
      let index = -1;
      for (let i = 0; i < this.selectedDatesFor7Days.length; i++) {
        if (this.selectedDatesFor7Days[i].getTime() === e.getTime()) {
          index = i;
        }
      }
      this.selectedDatesFor7Days.splice(index, 1);
    }
    this.appointmentdate1.updateTodaysDate();
  }
}
