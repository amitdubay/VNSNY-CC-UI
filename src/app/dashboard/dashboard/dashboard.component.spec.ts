import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOption } from '@angular/material/core';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DashboardComponent } from './dashboard.component';
import { RequestData } from 'src/app/models/request-data.interface';
import { CommonMethods } from 'src/app/common/common-methods';
import { MaterialModule } from 'src/app/material.module';
import { ErrorDialogService } from 'src/app/shared/services/error-dialog.service';
import { PatientComponent } from '../patient/patient.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { IdleTimeoutComponent } from 'src/app/shared/components/idle-timeout/idle-timeout.component';
import { DataLastRefreshComponent } from 'src/app/shared/components/data-last-refresh/data-last-refresh.component';

// this is to get the request object when getting the data.
const getRequestObject = (): RequestData => {
  let requestObject: RequestData = {
    searchText: '',
    lobId: 0,
    disclipineId: [],
    regionId: [],
    branchId: [],
    teamId: [],
    startDate: new Date(),
    endDate: new Date(),
    selectedDates: [],
    clinicianId: 0,
    patientId: 0,
  };
  return requestObject;
};
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
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: DashboardService;
  let http: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule],
      declarations: [
        DashboardComponent,
        MatOption,
        PatientComponent,
        CalendarComponent,
        HeaderComponent,
        IdleTimeoutComponent,
        DataLastRefreshComponent,
      ],
      providers: [ErrorDialogService, DashboardService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dashboardService = new DashboardService(http);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // // to do
  // it('getAppointmentDetails - Appointment not empty', () => {
  //   spyOn(component, 'getAppointmentDetails').and.callThrough();
  //   component.getAppointmentDetails(getRequestObject());
  //   expect(0).toBeGreaterThan(0);
  // });
  // // to do
  // it('getAppointmentDetailsByClinicianId - Should get atleast one appointment for clinician', () => {
  //   spyOn(component, 'getAppointmentDetailsByClinicianId').and.callThrough();
  //   component.getAppointmentDetailsByClinicianId(0);
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getAppointmentDetailsByPatientId - Should get atleast one appointment for patient', () => {
  //   spyOn(component, 'getAppointmentDetailsByPatientId').and.callThrough();
  //   component.getAppointmentDetailsByPatientId(0);
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getPatientListViewDetails - Patient list should not be empty', () => {
  //   spyOn(component, 'getPatientListViewDetails').and.callThrough();
  //   component.getPatientListViewDetails(getRequestObject());
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getAllFilters - lob, discipline, region,branch and team should not be empty', () => {
  //   spyOn(component, 'getAllFilters').and.callThrough();
  //   component.getAllFilters();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('setBreadCrumb - breadcrumb is not empty', () => {
  //   spyOn(component, 'setBreadCrumb').and.callThrough();
  //   component.setBreadCrumb();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getSelectedTextRegion - Region string should not be empty', () => {
  //   spyOn(component, 'getSelectedTextRegion').and.callThrough();
  //   component.getSelectedTextRegion();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getSelectedTextBranch - Branch string should not be empty ', () => {
  //   spyOn(component, 'getSelectedTextBranch').and.callThrough();
  //   component.getSelectedTextBranch();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getSelectedTextTeam - Team string should not be empty', () => {
  //   spyOn(component, 'getSelectedTextTeam').and.callThrough();
  //   component.getSelectedTextTeam();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getClinicians - Clinicians list should not be empty', () => {
  //   spyOn(component, 'getClinicians').and.callThrough();
  //   component.getClinicians(getRequestObject());
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getPatients - Patients list should not be empty', () => {
  //   spyOn(component, 'getPatients').and.callThrough();
  //   component.getPatients(getRequestObject());
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('initialSettings - Setting disciplines and regions selected to all.', () => {
  //   spyOn(component, 'initialSettings').and.callThrough();
  //   component.initialSettings();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('showMapView - to load map view when map icon is clicked', () => {
  //   spyOn(component, 'showMapView').and.callThrough();
  //   component.showMapView();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('selectAllRegion - When all is selected then the string will all regions else none ', () => {
  //   spyOn(component, 'selectAllRegion').and.callThrough();
  //   component.selectAllRegion(0);
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('selectAllDiscipline - When all is selected then the string will all discipline else none', () => {
  //   spyOn(component, 'selectAllDiscipline').and.callThrough();
  //   component.selectAllDiscipline(0);
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('selectAllBranch - When all is selected then the string will all branch else none', () => {
  //   spyOn(component, 'selectAllBranch').and.callThrough();
  //   component.selectAllBranch(0);
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('selectAllTeam - When all is selected then the string will all team else none', () => {
  //   spyOn(component, 'selectAllTeam').and.callThrough();
  //   component.selectAllTeam(0);
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getDiscipline - Discciplines should not be empty', () => {
  //   spyOn(component, 'getDiscipline').and.callThrough();
  //   component.getDiscipline();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getRegion - Regions should not be empty', () => {
  //   spyOn(component, 'getRegion').and.callThrough();
  //   component.getRegion();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getBranch - Branches should not be empty', () => {
  //   spyOn(component, 'getBranch').and.callThrough();
  //   component.getBranch(0);
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getTeam - ', () => {
  //   spyOn(component, 'getTeam').and.callThrough();
  //   component.getTeam(0);
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('getData - Appointments should not be null', () => {
  //   spyOn(component, 'getData').and.callThrough();
  //   component.getData();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('toggleMapView - To enable or disable the map icon if today is not selected', () => {
  //   spyOn(component, 'toggleMapView').and.callThrough();
  //   component.toggleMapView(getRequestObject());
  //   expect(0).toBeGreaterThan(0);
  // });

  it('toggleMapView should set isMapDisabled true/false ', () => {
    let data = getRequestObject();
    spyOn(component, 'toggleMapView').and.callThrough();
    expect(component.isMapDisabled).toBe(false, 'Map icon is enabled at first');
    data.endDate = CommonMethods.addDays(data.endDate, 1);
    component.toggleMapView(data);
    expect(component.isMapDisabled).toBe(true, 'Map icon is disabled');
    data.endDate = new Date();
    component.toggleMapView(data);
    expect(component.isMapDisabled).toBe(false, 'Map icon is enabled');
  });

  // // to do
  // it('handleChangeDiscipline - Atleast one discipline should be selected if not display message', () => {
  //   spyOn(component, 'handleChangeDiscipline').and.callThrough();
  //   component.handleChangeDiscipline();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('handleChangeRegion - Loads regions', () => {
  //   spyOn(component, 'handleChangeRegion').and.callThrough();
  //   component.handleChangeRegion();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('handleChangeBranch - Loads Branches for region selected', () => {
  //   spyOn(component, 'handleChangeBranch').and.callThrough();
  //   component.handleChangeBranch();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('handleChangeTeam - Loads Teams for branch selected', () => {
  //   spyOn(component, 'handleChangeTeam').and.callThrough();
  //   component.handleChangeTeam();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('toggleClinicianPatient - To change Clinician to Patient and vice versa', () => {
  //   spyOn(component, 'toggleClinicianPatient').and.callThrough();
  //   component.toggleClinicianPatient('');
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('showDisciplineData - return value should not be null ', () => {
  //   spyOn(component, 'showDisciplineData').and.callThrough();
  //   component.showDisciplineData();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('showRegionData - return value should not be null', () => {
  //   spyOn(component, 'showRegionData').and.callThrough();
  //   component.showRegionData();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('showBranchData - return value should not be null', () => {
  //   spyOn(component, 'showBranchData').and.callThrough();
  //   component.showBranchData();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('showTeamData - return value should not be null', () => {
  //   spyOn(component, 'showTeamData').and.callThrough();
  //   component.showTeamData();
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('handleClickOptionRegion - If All selected then database count should be equal to the selected count', () => {
  //   spyOn(component, 'handleClickOptionRegion').and.callThrough();
  //   component.handleClickOptionRegion(true, 1);
  //   expect(0).toBeGreaterThan(0);
  // });
  // // to do
  // it('handleClickOptionDiscipline - If All selected then database count should be equal to the selected count', () => {
  //   spyOn(component, 'handleClickOptionDiscipline').and.callThrough();
  //   component.handleClickOptionDiscipline(true, '1');
  //   expect(0).toBeGreaterThan(0);
  // });
  // // to do
  // it('handleClickOptionBranch - If All selected then database count should be equal to the selected count', () => {
  //   spyOn(component, 'handleClickOptionBranch').and.callThrough();
  //   component.handleClickOptionBranch(true, 1);
  //   expect(0).toBeGreaterThan(0);
  // });
  // // to do
  // it('handleClickOptionTeam - If All selected then database count should be equal to the selected count', () => {
  //   spyOn(component, 'handleClickOptionTeam').and.callThrough();
  //   component.handleClickOptionTeam(true, 1);
  //   expect(0).toBeGreaterThan(0);
  // });

  // // to do
  // it('handleClickOptionTeam - If All selected then database count should be equal to the selected count', () => {
  //   spyOn(component, 'handleClickOptionTeam').and.callThrough();
  //   component.handleClickOptionTeam(true, 1);
  //   expect(0).toBeGreaterThan(0);
  // });

  // it('Lob codes has records', () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   expect(component.dashBoardFilters.lobCodes.length).toBeGreaterThan(1);
  // });
  // it('Discipline has records', () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   expect(component.dashBoardFilters.disciplineCodes.length).toBeGreaterThan(
  //     1
  //   );
  // });
  // it('Region has records', () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   expect(component.dashBoardFilters.regions.length).toBeGreaterThan(1);
  // });
  // it('Getting branches for selected region - 1', () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   component.regionSelected = [1];
  //   component.handleChangeRegion();
  //   expect(component.arrBranch.length).toBeGreaterThan(1);
  // });
  // it('Getting teams for the selected Branch - 1', () => {
  //   spyOn(component, 'ngOnInit').and.callThrough();
  //   component.branchSelected = [1];
  //   component.handleChangeBranch();
  //   expect(component.arrTeam.length).toBeGreaterThan(1);
  // });
  // it('Clear Button', () => {
  //   spyOn(component, 'clear').and.callThrough();
  //   component.clear();
  //   console.log(component.disciplineSelected);
  //   const testCases = [
  //     { key: component.branchSelected, value: [0] },
  //     { key: component.teamSelected, value: [0] },
  //     { key: component.searchText, value: '' },
  //     { key: component.isTeamDisabled, value: true },
  //     { key: component.isBranchDisabled, value: true },
  //     { key: component.lobSelected, value: 1 },
  //   ];

  //   // expect(1).toEqual(1);
  //   testCases.forEach((test) => {
  //     expect(test.key).toEqual(test.value);
  //   });
  // });

  // it('Get Clinician Data', () => {
  //   spyOn(dashboardService, 'getClinicians').and.callThrough();
  //   let data=dashboardService.getClinicians();
  //   expect(data.length).toBeGreaterThanOrEqual(1);
  // });
});
