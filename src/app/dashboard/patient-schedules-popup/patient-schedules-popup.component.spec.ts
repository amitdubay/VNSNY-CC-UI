import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SortDirection } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableHarness } from '@angular/material/table/testing';
import { CommonMethods } from 'src/app/common/common-methods';
import { GlobalConstants } from 'src/app/common/global-contants';
import {
  acuityCodesMock,
  appointmentsMock,
  appointmentStatusLegendMock,
  executiveSummaryMock,
  patientMock,
} from 'src/app/models/mockData.model';
import { SharedModule } from 'src/app/shared/shared.module';

import { PatientSchedulesPopupComponent } from './patient-schedules-popup.component';

const data = {
  acuityCodes: acuityCodesMock,
  appointmentStatusLegends: appointmentStatusLegendMock,
  executiveSummary: executiveSummaryMock,
  patient: patientMock,
  appointments: appointmentsMock,
};

describe('PatientSchedulesPopupComponent', () => {
  let component: PatientSchedulesPopupComponent;
  let fixture: ComponentFixture<PatientSchedulesPopupComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule, MatTableModule],
      declarations: [PatientSchedulesPopupComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: data,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSchedulesPopupComponent);
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

  it('should have first header as appointmentSequence', async () => {
    const table = await loader.getHarness(MatTableHarness);
    const headerRows = await table.getHeaderRows();
    const cells = await headerRows[0].getCells();
    const patientNameCell = await cells[0].getColumnName();
    expect(patientNameCell).toEqual(GlobalConstants.appointmentSequence);
  });

  it('should call sort on the array', () => {
    spyOn(Array.prototype, 'sort');
    component.appointments = appointmentsMock;
    const sort = {
      active: GlobalConstants.appointmentTime,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(Array.prototype.sort).toHaveBeenCalled();
  });

  it('should call onSortData and sort by clinicianName', () => {
    spyOn(CommonMethods, 'compareString');
    component.appointments = appointmentsMock;
    const sort = {
      active: GlobalConstants.clinicianName,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(CommonMethods.compareString).toHaveBeenCalled();
  });

  it('should call onSortData and sort by appointmentServiceCode', () => {
    spyOn(CommonMethods, 'compareString');
    component.appointments = appointmentsMock;
    const sort = {
      active: GlobalConstants.appointmentServiceCode,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(CommonMethods.compareString).toHaveBeenCalled();
  });

  it('should call onSortData and default case should be executed', () => {
    component.appointments = appointmentsMock;
    const sort = {
      active: '',
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(component.appointments.length).toEqual(2);
  });

  it('should call onSortData event on clinician Name sort click', () => {
    spyOn(Array.prototype, 'sort');
    component.appointments = appointmentsMock;
    const sort = {
      active: GlobalConstants.clinicianName,
      direction: GlobalConstants.ascending as SortDirection,
    };
    component.onSortData(sort);
    expect(Array.prototype.sort).toHaveBeenCalled();
  });
});
