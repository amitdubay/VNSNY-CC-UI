import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-contants';
import { Appointment } from 'src/app/models/appointment.interface';
import { Clinician } from 'src/app/models/clinician.interface';
import { ExecutiveSummary } from 'src/app/models/executive-summary.interface';
import { Patient } from 'src/app/models/patient.interface';
import { RequestData } from 'src/app/models/request-data.interface';
import { DashboardService } from 'src/app/services/dashboard.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { ErrorDialogService } from '../../shared/services/error-dialog.service';
import { ClinicianSchedulesPopupComponent } from '../clinician-schedules-popup/clinician-schedules-popup.component';
import { PatientSchedulesPopupComponent } from '../patient-schedules-popup/patient-schedules-popup.component';
import { CommonMethods } from 'src/app/common/common-methods';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(CalendarComponent) calendarComponent!: CalendarComponent;

  isMapDisabled = false;
  mapicon = '';
  appointments: Appointment[];
  appointmentLegends: [];
  arrLOB: any;
  arrDiscipline: any;
  arrRegion: any;
  arrBranch: any = [
    {
      branchId: GlobalConstants.zero.toString(),
      branchName: GlobalConstants.all,
    },
  ];
  arrTeam: any = [{ teamId: 0, teamName: GlobalConstants.all }];
  executiveSummary: ExecutiveSummary[];
  arrTotalCounts: any;
  disciplineSelected: string[] = [GlobalConstants.zero.toString()];
  regionSelected: string[] = [GlobalConstants.zero.toString()];
  branchSelected: string[] = [GlobalConstants.zero.toString()];
  teamSelected: number[] = [0];
  // these variables will be used to know whether the user has selected any items or not if not then show error.
  disciplineSelectedPrevious: string[] = [GlobalConstants.zero.toString()];
  regionSelectedPrevious: string[] = [GlobalConstants.zero.toString()];
  branchSelectedPrevious: string[] = [GlobalConstants.zero.toString()];
  teamSelectedPrevious: number[] = [0];
  lobSelected = 1;
  searchText = '';
  clinicianActive = '';
  isShowDiscipline = true;
  patientActive = '';
  minDate = new Date();
  isBranchDisabled = true;
  isTeamDisabled = true;
  dashboardService: DashboardService;
  dashBoardFilters: any = {};
  clinicians: any;
  patients: any;

  dataLastRefresh: any;

  // this is to know whethere the same clinician is selected or not. if yes then load all appointment details
  selectedClinicianId = 0;
  // this is to know whethere the same patient is selected or not. if yes then load all appointment details
  selectedPatientId = 0;
  isClinician = true;
  breadCrumb = '';
  constructor(
    dashboardService: DashboardService,
    private matDialog: MatDialog,
    private router: Router,
    private errorDialogService: ErrorDialogService
  ) {
    this.dashboardService = dashboardService;
    this.mapicon = GlobalConstants.imagesURL.replace(
      GlobalConstants.paramZero,
      GlobalConstants.mapIconEnabled
    );
  }

  ngOnInit(): void {
    this.getAllFilters();
    this.clinicianActive = GlobalConstants.cssbtnactive;
  }

  // this method gets the clinician appointment details
  getDashboardDetails = (request: RequestData) => {
    this.appointments = null;
    this.executiveSummary = null;
    if (this.isClinician) {
      this.dashboardService.getDashboardDetails(request).subscribe((result) => {
        this.appointmentLegends = result?.appointmentStatusLegends;
        this.appointments = result?.appointments;
        this.clinicians = result?.clinicians;
        this.executiveSummary = result?.executiveSummary;
        this.dataLastRefresh = new Date(result?.rectimestmp);
      });
    } else {
      this.dashboardService
        .getPatientAppoinments(request)
        .subscribe((result) => {
          this.appointmentLegends = result?.appointmentStatusLegends;
          this.appointments = result?.appointments;
          this.patients = result?.patients;
          this.executiveSummary = result?.executiveSummary;
        });
    }
  };

  // to validate minimum 3 characters in search textbox when enter button is clicked.
  onEnter() {
    if (this.searchText.length > 0 && this.searchText.length < 3) {
      this.errorDialogService.openDialog(
        GlobalConstants.errMinimumThreeCharacters,
        GlobalConstants.errorType999
      );
      this.searchText = '';
    } else if (this.searchText.length > 2) {
      const requestObject = this.getRequestObject();
      this.getDashboardDetails(requestObject);
    }
  }

  // this method gets all the patients list view data
  getPatientListViewDetails = (request: RequestData) => {
    this.dashboardService.getDashboardDetails(request).subscribe((result) => {
      this.appointments = result?.appointments;
      this.appointmentLegends = result?.appointmentStatusLegends;
    });
  };

  // this method is used to get all the master details along with dashboardData

  getAllFilters = () => {
    this.dashboardService.getAllFilters().subscribe((result) => {
      this.dashBoardFilters = result;
      this.arrLOB = result?.lobCodes;
      this.arrDiscipline = this.getDiscipline();
      this.arrRegion = this.getRegion();
      this.initialSettings();
      const requestObject = this.getRequestObject();
      this.getDashboardDetails(requestObject);
      this.breadCrumb =
        GlobalConstants.allRegion +
        GlobalConstants.symbolBackSlash +
        GlobalConstants.allBranch +
        GlobalConstants.symbolBackSlash +
        GlobalConstants.allTeam;
    });
  };

  // this is to set the breakcrumb details for Region/Branch/Team
  setBreadCrumb = () => {
    this.breadCrumb = this.getSelectedTextRegion();
    this.breadCrumb +=
      GlobalConstants.symbolBackSlash + this.getSelectedTextBranch();
    this.breadCrumb +=
      GlobalConstants.symbolBackSlash + this.getSelectedTextTeam();
  };

  // this method is used to get text for all the selected regions
  getSelectedTextRegion = (): string => {
    let selectedText: string[] = [];
    let filteredDataAll = this.regionSelected.filter(
      (r) => r === GlobalConstants.zero.toString()
    );
    if (filteredDataAll.length > 0) {
      selectedText.push(GlobalConstants.allRegion);
    } else {
      this.regionSelected.forEach((element) => {
        let filteredData = this.arrRegion.filter((r) => r.regionId === element);
        selectedText.push(filteredData[0].regionName);
      });
    }
    return selectedText?.join(GlobalConstants.symbolComma);
  };

  // this method is used to get text for all the selected branches
  getSelectedTextBranch = (): string => {
    let selectedText: string[] = [];
    let filteredDataAll = this.branchSelected.filter(
      (r) => r === GlobalConstants.zero.toString()
    );
    if (filteredDataAll.length > 0) {
      selectedText.push(GlobalConstants.allBranch);
    } else {
      this.branchSelected.forEach((element) => {
        let filteredData = this.arrBranch.filter((r) => r.branchId === element);
        selectedText.push(filteredData[0].branchName);
      });
    }
    return selectedText?.join(GlobalConstants.symbolComma);
  };

  // this method is used to get text for all the selected teams
  getSelectedTextTeam = (): string => {
    let selectedText: string[] = [];
    let filteredDataAll = this.teamSelected.filter((r) => r === 0);
    if (filteredDataAll.length > 0) {
      selectedText.push(GlobalConstants.allTeam);
    } else {
      this.teamSelected.forEach((element) => {
        let filteredData = this.arrTeam.filter((r) => r.teamId === element);
        selectedText.push(filteredData[0].teamName);
      });
    }
    return selectedText?.join(GlobalConstants.symbolComma);
  };

  // this is used to set the selected fileds for discipline and region
  initialSettings = () => {
    this.selectAllRegion(true);
    this.regionSelectedPrevious = this.regionSelected;
    this.selectAllDiscipline(true);
    this.disciplineSelectedPrevious = this.disciplineSelected;
  };

  showMapView = () => {
    console.log('MapView');
  };

  // When all is selected in the region dropdown then the property will have all the records else none
  selectAllRegion = (isAllSelected: boolean) => {
    if (isAllSelected) {
      this.regionSelected = this.arrRegion.map(
        (item: { regionId: any }) => item.regionId
      );
    } else {
      this.regionSelected = [];
    }
  };
  // When all is selected in the discipline dropdown then the property will have all the records else none
  selectAllDiscipline = (isAllSelected: boolean) => {
    if (isAllSelected) {
      this.disciplineSelected = this.arrDiscipline.map(
        (item: { desciplineCode: any }) => item.desciplineCode
      );
    } else {
      this.disciplineSelected = [];
    }
  };
  // When all is selected in the branch dropdown then the property will have all the records else none
  selectAllBranch = (isAllSelected: boolean) => {
    if (isAllSelected) {
      this.branchSelected = this.arrBranch.map(
        (item: { branchId: any }) => item.branchId
      );
    } else {
      this.branchSelected = [];
    }
  };
  // When all is selected in the team dropdown then the property will have all the records else none
  selectAllTeam = (isAllSelected: boolean) => {
    if (isAllSelected) {
      this.teamSelected = this.arrTeam.map(
        (item: { teamId: any }) => item.teamId
      );
    } else {
      this.teamSelected = [];
    }
  };

  // get all disciplines from the json object
  getDiscipline = () => {
    try {
      const data = this.dashBoardFilters.disciplineCodes;
      data.splice(0, 0, {
        desciplineCode: GlobalConstants.zero.toString(),
        description: GlobalConstants.all,
      });
      return data;
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };
  // get all region from the json object
  getRegion = () => {
    try {
      const data = this.dashBoardFilters.regions;
      data.splice(0, 0, {
        regionId: GlobalConstants.zero.toString(),
        regionName: GlobalConstants.all,
      });
      return data;
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };
  // get all branch from the json object
  getBranch = (regionId: string) => {
    const data = this.dashBoardFilters.branches;
    if (
      this.dashBoardFilters.branches.filter(
        (a: { branchName: string }) => a.branchName === GlobalConstants.all
      ) < 1
    ) {
      data.splice(0, 0, {
        branchId: GlobalConstants.zero.toString(),
        branchName: GlobalConstants.all,
        regionId: GlobalConstants.zero.toString(),
      });
    }
    return data.filter(
      (d: { regionId: string }) =>
        d.regionId === regionId ||
        d.regionId === GlobalConstants.zero.toString()
    );
  };
  // get all team from the json object
  getTeam = (branchId: string) => {
    try {
      const data = this.dashBoardFilters.teams;
      if (
        this.dashBoardFilters.teams.filter(
          (a: { teamName: string }) => a.teamName === GlobalConstants.all
        ) < 1
      ) {
        data.splice(0, 0, {
          teamId: 0,
          teamName: GlobalConstants.all,
          branchId: GlobalConstants.zero.toString(),
        });
      }
      return data.filter(
        (d: { branchId: string }) =>
          d.branchId === branchId ||
          d.branchId === GlobalConstants.zero.toString()
      );
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };

  // this is called when the apply button is clicked.
  getData = () => {
    const request = this.getRequestObject();
    this.setBreadCrumb();
    this.toggleMapView(request);
    this.getDashboardDetails(request);
  };

  // this is to enable/diable map view icon - if today button is clicked then enable else disable
  toggleMapView = (request: RequestData) => {
    this.isMapDisabled = true;
    this.mapicon = GlobalConstants.imagesURL.replace(
      GlobalConstants.paramZero,
      GlobalConstants.mapIconDisabled
    );
    const currentDate = CommonMethods.getDateWithOutHourMinute(new Date());
    const selectedDate = CommonMethods.getDateWithOutHourMinute(
      request.endDate
    );
    if (
      currentDate.getTime() === selectedDate.getTime() &&
      request.selectedDates?.length === 0
    ) {
      this.isMapDisabled = false;
      this.mapicon = GlobalConstants.imagesURL.replace(
        GlobalConstants.paramZero,
        GlobalConstants.mapIconEnabled
      );
    }
  };

  // this is to get the request object when getting the data.
  getRequestObject = (): RequestData => {
    let requestObject: RequestData = {
      searchText: this.searchText,
      lobId: this.lobSelected,
      disciplines: this.isClinician ? this.disciplineSelected : [],
      regions: this.regionSelected,
      branches: this.branchSelected,
      teams: this.teamSelected,
      startDate: this.calendarComponent.minDate1,
      endDate: this.calendarComponent.maxDate1,
      selectedDates: this.calendarComponent.selectedDatesActual,
      clinicianId: this.isClinician ? this.selectedClinicianId : 0,
      patientId: !this.isClinician ? this.selectedPatientId : 0,
    };

    // getting all the branches in an array which needs to be sent to calling api
    if (
      requestObject.branches.length === 1 &&
      requestObject.branches[0] === GlobalConstants.zero.toString()
    ) {
      requestObject.branches = [];
      requestObject.regions.forEach((element) => {
        const data = this.dashBoardFilters.branches.filter(
          (b) => b.regionId === element
        );
        const branchIds = data.map((item: { branchId: any }) => item.branchId);
        if (branchIds.length > 0) {
          branchIds.forEach((element) => {
            requestObject.branches.push(element);
          });
        }
      });
    }
    // getting all the teams for the selected region and branch which needs to be sent to calling api
    if (
      requestObject.teams.length === 1 &&
      requestObject.teams[0] === GlobalConstants.zero
    ) {
      requestObject.teams = [];
      requestObject.branches.forEach((element) => {
        const data = this.dashBoardFilters.teams.filter(
          (b) => b.branchId === element
        );
        const teamIds = data.map((item: { teamId: any }) => item.teamId);
        if (teamIds.length > 0) {
          teamIds.forEach((element) => {
            requestObject.teams.push(element);
          });
        }
      });
    }
    console.log(requestObject);
    return requestObject;
  };

  // to handle discipline change - for selecting atleast one if not display message
  handleChangeDiscipline = () => {
    if (this.disciplineSelected.length === 0) {
      this.errorDialogService.openDialog(
        GlobalConstants.errChooseAtleastOneItem.replace(
          GlobalConstants.paramZero,
          GlobalConstants.discipline
        ),
        GlobalConstants.errorType999
      );
      this.disciplineSelected = this.disciplineSelectedPrevious;
    } else {
      this.disciplineSelectedPrevious = this.disciplineSelected;
    }
  };
  // to handle region change - for the selected region branches will be loaded
  handleChangeRegion = () => {
    if (this.regionSelected.length === 1) {
      this.arrBranch = this.getBranch(this.regionSelected['0']);
      this.branchSelected = this.arrBranch.map(
        (item: { branchId: any }) => item.branchId
      );
      this.isBranchDisabled =
        this.regionSelected[0] === GlobalConstants.zero.toString();
    } else {
      this.arrBranch = this.getBranch(GlobalConstants.zero.toString());
      this.branchSelected = [GlobalConstants.zero.toString()];
      this.arrTeam = this.getTeam(GlobalConstants.zero.toString());
      this.teamSelected = [0];
      this.isBranchDisabled = true;
    }
    this.branchSelectedPrevious = this.branchSelected;
    if (this.regionSelected.length === 0) {
      this.errorDialogService.openDialog(
        GlobalConstants.errChooseAtleastOneItem.replace(
          GlobalConstants.paramZero,
          GlobalConstants.region
        ),
        GlobalConstants.errorType999
      );
      this.regionSelected = this.regionSelectedPrevious;
    } else {
      this.regionSelectedPrevious = this.regionSelected;
    }
    this.isTeamDisabled = true;
  };
  // to handle branch change - for the selected region teams will be loaded
  handleChangeBranch = () => {
    if (this.branchSelected.length === 1) {
      this.arrTeam = this.getTeam(this.branchSelected[0]);
      this.teamSelected = this.arrTeam.map(
        (item: { teamId: any }) => item.teamId
      );
      this.isTeamDisabled =
        this.branchSelected[0] === GlobalConstants.zero.toString();
    } else {
      this.arrTeam = this.getTeam(GlobalConstants.zero.toString());
      this.teamSelected = [0];
      this.isTeamDisabled = true;
    }
    this.teamSelectedPrevious = this.teamSelected;
    if (this.branchSelected.length === 0) {
      this.errorDialogService.openDialog(
        GlobalConstants.errChooseAtleastOneItem.replace(
          GlobalConstants.paramZero,
          GlobalConstants.branch
        ),
        GlobalConstants.errorType999
      );
      this.branchSelected = this.branchSelectedPrevious;
    } else {
      this.branchSelectedPrevious = this.branchSelected;
    }
  };
  // to handle team change - for selecting atleast one
  handleChangeTeam = () => {
    if (this.teamSelected.length === 0) {
      this.errorDialogService.openDialog(
        GlobalConstants.errChooseAtleastOneItem.replace(
          GlobalConstants.paramZero,
          GlobalConstants.team
        ),
        GlobalConstants.errorType999
      );
      this.teamSelected = this.teamSelectedPrevious;
    } else this.teamSelectedPrevious = this.teamSelected;
  };

  // this method is used to toggle from clinician to patient and vice versa
  toggleClinicianPatient = (id: string) => {
    const requestObject = this.getRequestObject();
    if (id === GlobalConstants.clinician) {
      this.clinicianActive = GlobalConstants.cssbtnactive;
      this.patientActive = '';
      this.isShowDiscipline = true;
      this.appointments = null;
      this.isClinician = true;
      this.getDashboardDetails(requestObject);
    } else {
      this.clinicianActive = '';
      this.clinicians = null;
      this.appointments = null;
      this.patientActive = GlobalConstants.cssbtnactive;
      this.isShowDiscipline = false;
      this.isClinician = false;
      this.getDashboardDetails(requestObject);
    }
  };

  // to clear all the filters and reset to initial settings
  clear = () => {
    try {
      this.disciplineSelected = [GlobalConstants.zero.toString()];
      this.regionSelected = [GlobalConstants.zero.toString()];
      this.branchSelected = [GlobalConstants.zero.toString()];
      this.teamSelected = [0];
      this.searchText = '';
      this.isTeamDisabled = true;
      this.isBranchDisabled = true;
      this.lobSelected = 1;
      this.initialSettings();
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };

  /// this method is used to display the selected text in the dropdown - called at HTML.
  showDisciplineData = () => {
    try {
      const data: string[] = [];
      if (this.disciplineSelected.filter((x) => x === '0').length > 0) {
        data.push(GlobalConstants.all);
      } else {
        this.disciplineSelected
          .filter((x) => x !== '0')
          ?.forEach((obj) => {
            const description = this.arrDiscipline.filter(
              (d: { desciplineCode: string }) => d.desciplineCode === obj
            );
            data.push(description[0].description);
          });
      }
      return data.toString();
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };

  /// this method is used to display the selected text in the dropdown - called at HTML.
  showRegionData = () => {
    try {
      const data: string[] = [];
      if (
        this.regionSelected.filter((x) => x === GlobalConstants.zero.toString())
          .length > 0
      ) {
        data.push(GlobalConstants.all);
      } else {
        this.regionSelected
          .filter((x) => x !== GlobalConstants.zero.toString())
          ?.forEach((obj) => {
            const description = this.arrRegion.filter(
              (d: { regionId: string }) => d.regionId === obj
            );
            data.push(description[0].regionName);
          });
      }
      return data.toString();
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };

  showBranchData = () => {
    try {
      const data: string[] = [];
      if (
        this.branchSelected.filter((x) => x === GlobalConstants.zero.toString())
          .length > 0
      ) {
        data.push(GlobalConstants.all);
      } else {
        this.branchSelected
          .filter((x) => x !== GlobalConstants.zero.toString())
          ?.forEach((obj) => {
            const description = this.arrBranch.filter(
              (d: { branchId: string }) => d.branchId === obj
            );
            data.push(description[0].branchName);
          });
      }
      return data.toString();
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };

  showTeamData = () => {
    try {
      const data: string[] = [];
      if (this.teamSelected.filter((x) => x === 0).length > 0) {
        data.push(GlobalConstants.all);
      } else {
        this.teamSelected
          .filter((x) => x !== 0)
          ?.forEach((obj) => {
            const description = this.arrTeam.filter(
              (d: { teamId: number }) => d.teamId === obj
            );
            data.push(description[0].teamName);
          });
      }
      return data.toString();
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };

  // this will handle the dropdown options click event if all selected then all the options will be selected
  handleClickOptionRegion = (selected: boolean, id: string) => {
    if (id === GlobalConstants.zero.toString()) {
      this.selectAllRegion(selected);
    } else {
      if (!selected) {
        this.regionSelected = this.regionSelected.filter(
          (x) => x !== GlobalConstants.zero.toString()
        );
      }
    }
  };
  // this will handle the dropdown options click event if all selected then all the options will be selected
  handleClickOptionDiscipline = (selected: boolean, id: string) => {
    if (id === GlobalConstants.zero.toString()) {
      this.selectAllDiscipline(selected);
    } else {
      if (!selected) {
        this.disciplineSelected = this.disciplineSelected.filter(
          (x) => x !== GlobalConstants.zero.toString()
        );
      }
    }
  };
  // this will handle the dropdown options click event if all selected then all the options will be selected
  handleClickOptionBranch = (selected: boolean, id: string) => {
    try {
      if (id === GlobalConstants.zero.toString()) {
        this.selectAllBranch(selected);
      } else {
        if (!selected) {
          this.branchSelected = this.branchSelected.filter(
            (x) => x !== GlobalConstants.zero.toString()
          );
        }
      }
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };
  // this will handle the dropdown options click event if all selected then all the options will be selected
  handleClickOptionTeam = (selected: boolean, id: number) => {
    try {
      if (id === 0) {
        this.selectAllTeam(selected);
      } else {
        if (!selected) {
          this.teamSelected = this.teamSelected.filter((x) => x !== 0);
        }
      }
    } catch {
      throw Error(GlobalConstants.errCommonError);
    }
  };

  // Open clinician popup and display information related to selected clinician
  public showClinicianPopup(item: Clinician): void {
    const requestObject = this.getRequestObject();
    const clinician: Clinician = {
      clinicianId: item.clinicianId,
      firstName: item.firstName,
      lastName: item.lastName,
      jobCode: item.jobCode,
      lastSyncTime: '15 mins',
      phoneNumber: '789-765-2387',
    };

    requestObject.clinicianId = item.clinicianId;

    this.dashboardService
      .getClinicianSchedules(requestObject)
      .subscribe((result) => {
        const dialogConfig: MatDialogConfig = {
          hasBackdrop: true,
          disableClose: true,
          data: {
            appointments: result.appointments,
            appointmentStatusLegends: result.appointmentStatusLegends,
            executiveSummary: result.executiveSummary,
            clinician: clinician,
          },
          closeOnNavigation: true,
          panelClass: GlobalConstants.clinicianPopupWrapper,
        };

        const dialogRef = this.matDialog.open(
          ClinicianSchedulesPopupComponent,
          dialogConfig
        );
        this.router.events.subscribe(() => {
          dialogRef.close();
        });
      });
  }

  // Open patient popup and display information related to selected patient
  public showPatientPopup(item: Appointment): void {
    const requestObject = this.getRequestObject();
    requestObject.patientId = item.patient.patientId;
    this.dashboardService
      .getPatientSchedules(requestObject)
      .subscribe((result) => {
        const dialogConfig: MatDialogConfig = {
          hasBackdrop: true,
          disableClose: true,
          data: {
            acuityCodes: item.acuityCodes,
            appointments: result.appointments,
            appointmentStatusLegends: result.appointmentStatusLegends,
            executiveSummary: result.executiveSummary,
            patient: result.patient,
          },
          closeOnNavigation: true,
          panelClass: GlobalConstants.patientPopupWrapper,
        };

        const dialogRef = this.matDialog.open(
          PatientSchedulesPopupComponent,
          dialogConfig
        );
        this.router.events.subscribe(() => {
          dialogRef.close();
        });
      });
  }

  // this method is invoked when the clinician at the left hand side is clicked to load the appointments
  getAppointmentsByClinicianId(clinicianId: number) {
    this.appointments = null;
    if (this.selectedClinicianId === clinicianId) {
      // get all appointments
      this.selectedClinicianId = 0;
    } else {
      this.selectedClinicianId = clinicianId;
    }
    const requestObject = this.getRequestObject();
    this.getDashboardDetails(requestObject);
  }

  // this method is invoked when the patient at the left hand side is clicked to load the appointments
  getAppointmentsByPatientId(patientId: number) {
    this.appointments = null;

    if (this.selectedPatientId === patientId) {
      // get all appointments
      this.selectedPatientId = 0;
    } else {
      this.selectedPatientId = patientId;
    }
    const requestObject = this.getRequestObject();
    this.getDashboardDetails(requestObject);
  }
}
