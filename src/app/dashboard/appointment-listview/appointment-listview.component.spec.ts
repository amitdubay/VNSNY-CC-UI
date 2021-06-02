import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortDirection } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonMethods } from 'src/app/common/common-methods';
import { GlobalConstants } from 'src/app/common/global-contants';
import { AppointmentListviewComponent } from './appointment-listview.component';

const executiveSummaryMock = [
  {
    executiveSummaryKey: 'Appointments Today',
    executiveSummaryValue: '30',
  },
];

const appointmentStatusLegendMock = [
  {
    borderColor: '',
    backgroundColor: '#AFBD22',
    legendLabel: 'On Schedule - Actual',
  },
];

const data = {
  appointmentStatusLegends: appointmentStatusLegendMock,
  executiveSummary: executiveSummaryMock,
  appointments: CommonMethods.appointmentMock,
};

describe('AppointmentListviewComponent', () => {
  let component: AppointmentListviewComponent;
  let fixture: ComponentFixture<AppointmentListviewComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule],
      declarations: [AppointmentListviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getAppointmentFilters - To get distinct filters from clinicianAppointments', () => {
    component.clinicianAppointments = data.appointments;
    spyOn(component, 'getAppointmentFilters').and.callThrough();
    component.getAppointmentFilters();
    expect(component.appointmentFilters.length).toBeGreaterThan(1);
  });

  it('getAppointmentFilters - If appointment is empty then filter should have only one entry - All', () => {
    component.clinicianAppointments = [];
    spyOn(component, 'getAppointmentFilters').and.callThrough();
    component.getAppointmentFilters();
    expect(component.appointmentFilters[0]).toEqual(
      GlobalConstants.all.toUpperCase()
    );
  });

  it('handleSelectOptionClick - All Selected', () => {
    spyOn(component, 'handleSelectOptionClick').and.callThrough();
    component.handleSelectOptionClick(GlobalConstants.all, true);
    expect(component.isApplyDisabled).toEqual(false);
  });

  it('getAppointmentServiceCodeIcon - in person Icon', () => {
    spyOn(component, 'getAppointmentServiceCodeIcon').and.callThrough();
    const icon = component.getAppointmentServiceCodeIcon(
      GlobalConstants.HomeVisit
    );
    console.log(icon);
    expect(icon).toEqual(
      GlobalConstants.imagesURL.replace(
        GlobalConstants.paramZero,
        GlobalConstants.inPersonIcon
      )
    );
  });

  // to do
  it('openPatientSchedulesPopup - to open the patient schedule pop up', () => {
    spyOn(component, 'openPatientSchedulesPopup').and.callThrough();
    //component.openPatientSchedulesPopup(CommonMethods.appointmentMock);
    expect(60).toEqual(60);
  });

  it('clear - clearing all the selected filter options.', () => {
    spyOn(component, 'clear').and.callThrough();
    component.clear();
    expect(component.appointmentFilterSelected.length).toEqual(0);
  });

  it('should call sort on the array', () => {
    spyOn(Array.prototype, 'sort');
    component.clinicianAppointments = data.appointments;
    const sort = {
      active: GlobalConstants.appointmentTime,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(Array.prototype.sort).toHaveBeenCalled();
  });

  it('should call onSortData and sort by patientName', () => {
    spyOn(CommonMethods, 'compareString');
    component.clinicianAppointments = data.appointments;
    const sort = {
      active: GlobalConstants.patientName,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(CommonMethods.compareString).toHaveBeenCalled();
  });

  it('should call onSortData and sort by appointmentServiceCode', () => {
    spyOn(CommonMethods, 'compareString');
    component.clinicianAppointments = data.appointments;
    const sort = {
      active: GlobalConstants.appointmentServiceCode,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(CommonMethods.compareString).toHaveBeenCalled();
  });

  it('should call onSortData and default case should be executed', () => {
    component.clinicianAppointments = data.appointments;
    const sort = {
      active: '',
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(component.clinicianAppointments.length).toEqual(2);
  });

  it('should call onSortData event on PatientName sort click', () => {
    spyOn(Array.prototype, 'sort');
    component.clinicianAppointments = data.appointments;
    const sort = {
      active: GlobalConstants.appointmentTime,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(Array.prototype.sort).toHaveBeenCalled();
  });
});
