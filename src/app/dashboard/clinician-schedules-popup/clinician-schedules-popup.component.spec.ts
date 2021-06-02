import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { GlobalConstants } from 'src/app/common/global-contants';
import { Appointment } from 'src/app/models/appointment.interface';
import { Clinician } from 'src/app/models/clinician.interface';
import { SharedModule } from 'src/app/shared/shared.module';

import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableHarness } from '@angular/material/table/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { ClinicianSchedulesPopupComponent } from './clinician-schedules-popup.component';
import { CommonMethods } from 'src/app/common/common-methods';
import {
  appointmentsMock,
  appointmentStatusLegendMock,
  clinicianMock,
  executiveSummaryMock,
} from 'src/app/models/mockData.model';

const data = {
  clinician: clinicianMock,
  appointmentStatusLegends: appointmentStatusLegendMock,
  executiveSummary: executiveSummaryMock,
  appointments: appointmentsMock,
};

const clinicianSchedulesMock = {
  appointments: appointmentsMock,
  executiveSummary: executiveSummaryMock,
  appointmentStatusLegends: appointmentStatusLegendMock,
};

describe('ClinicianSchedulesPopupComponent', () => {
  let component: ClinicianSchedulesPopupComponent;
  let fixture: ComponentFixture<ClinicianSchedulesPopupComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, MatTableModule],
      declarations: [ClinicianSchedulesPopupComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: data,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicianSchedulesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for a table', async () => {
    const tables = await loader.getAllHarnesses(MatTableHarness);
    expect(tables.length).toBe(1);
  });

  it('should get the different kinds of rows in the table', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    const rows = await table.getRows();
    expect(headerRows.length).toBe(2);
    expect(rows.length).toBe(2);
  });

  it('should have first header as patientName', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    const cells = await headerRows[0].getCells();
    const patientNameCell = await cells[0].getColumnName();
    expect(patientNameCell).toEqual(GlobalConstants.patientName);
  });

  it('should have first header as patientName', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    const cells = await headerRows[0].getCells();
    const patientNameCell = await cells[0].getColumnName();
    expect(patientNameCell).toEqual(GlobalConstants.patientName);
  });

  it('should call sort on the array', () => {
    spyOn(Array.prototype, 'sort');
    component.appointments = clinicianSchedulesMock.appointments;
    const sort = {
      active: GlobalConstants.appointmentTime,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(Array.prototype.sort).toHaveBeenCalled();
  });

  it('should call onSortData and sort by patientName', () => {
    spyOn(CommonMethods, 'compareString');
    component.appointments = clinicianSchedulesMock.appointments;
    const sort = {
      active: GlobalConstants.patientName,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(CommonMethods.compareString).toHaveBeenCalled();
  });

  it('should call onSortData and sort by appointmentServiceCode', () => {
    spyOn(CommonMethods, 'compareString');
    component.appointments = clinicianSchedulesMock.appointments;
    const sort = {
      active: GlobalConstants.appointmentServiceCode,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(CommonMethods.compareString).toHaveBeenCalled();
  });

  it('should call onSortData and default case should be executed', () => {
    component.appointments = clinicianSchedulesMock.appointments;
    const sort = {
      active: '',
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(component.appointments.length).toEqual(2);
  });

  it('should call onSortData event on PatientName sort click', () => {
    spyOn(Array.prototype, 'sort');
    component.appointments = clinicianSchedulesMock.appointments;
    const sort = {
      active: GlobalConstants.appointmentTime,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(Array.prototype.sort).toHaveBeenCalled();
  });
});
