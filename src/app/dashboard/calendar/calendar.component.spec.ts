import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonMethods } from 'src/app/common/common-methods';
import { GlobalConstants } from 'src/app/common/global-contants';

import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getDatesWithOrdinal - For 7 Days with two days', () => {
    spyOn(component, 'getDatesWithOrdinal').and.callThrough();
    component.selectedDatesFor7Days.push(new Date());
    component.selectedDatesFor7Days.push(CommonMethods.addDays(new Date(), 1));
    let data = component.getDatesWithOrdinal();
    expect(data.split(',').length).toEqual(2);
  });

  it('setDateText - for today', () => {
    spyOn(component, 'setDateText').and.callThrough();
    component.setDateText(1);
    const data =
      GlobalConstants.today +
      GlobalConstants.symbolColon +
      ' ' +
      CommonMethods.getDateinMonthDayYear(new Date());
    expect(component.dateText).toEqual(data);
  });

  // to do
  it('handleOk - get data when Ok button is clicked for today', () => {
    spyOn(component, 'handleOk').and.callThrough();
    component.handleOk({
      startDate: new Date(),
      endDate: new Date(),
      selectedDates: component.selectedDatesFor7Days,
    });

    expect(2).toEqual(2);
  });

  it('Today selected', () => {
    spyOn(component, 'setSelectedDates').and.callThrough();
    component.setSelectedDates(1);
    expect(component.selectedDates.length).toEqual(1);
  });
  it('7 days selected', () => {
    spyOn(component, 'setSelectedDates').and.callThrough();
    component.setSelectedDates(7);
    expect(component.selectedDates.length).toEqual(8);
  });
  it('30 days selected', () => {
    spyOn(component, 'setSelectedDates').and.callThrough();
    component.setSelectedDates(30);
    expect(component.selectedDates.length).toEqual(31);
  });
  it('60 days selected', () => {
    spyOn(component, 'setSelectedDates').and.callThrough();
    component.setSelectedDates(60);
    expect(component.selectedDates.length).toEqual(61);
  });
});
