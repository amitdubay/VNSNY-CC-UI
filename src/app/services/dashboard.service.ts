import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../common/app-settings';
import { RequestData } from '../models/request-data.interface';
import { Clinician } from '../models/clinician.interface';
import { CommonMethods } from '../common/common-methods';
import { ExecutiveSummary } from '../models/executive-summary.interface';
import { Appointment } from '../models/appointment.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  executiveSummaryMock: ExecutiveSummary[] = [
    {
      executiveSummaryLabel: 'Total Appointments',
      executiveSummaryValue: '3128',
      executiveSummaryGreyedOut: false,
    },
    {
      executiveSummaryLabel: 'Total Clinicians Scheduled',
      executiveSummaryValue: '1520',
      executiveSummaryGreyedOut: false,
    },
    {
      executiveSummaryLabel: 'Appointments Accepted',
      executiveSummaryValue: '923',
      executiveSummaryGreyedOut: false,
    },
    {
      executiveSummaryLabel: 'Appointments Completed',
      executiveSummaryValue: '142',
      executiveSummaryGreyedOut: false,
    },
    {
      executiveSummaryLabel: 'Appointments Delayed',
      executiveSummaryValue: '32',
      executiveSummaryGreyedOut: false,
    },
    {
      executiveSummaryLabel: 'Appointments Missed',
      executiveSummaryValue: '11',
      executiveSummaryGreyedOut: false,
    },
    {
      executiveSummaryLabel: 'Productivity Points %age',
      executiveSummaryValue: '103%',
      executiveSummaryGreyedOut: false,
    },
  ];

  appointmentStatusLegendMock = [
    {
      borderColor: '',
      backgroundColor: '#AFBD22',
      legendLabel: 'On Schedule - Actual',
    },
    {
      borderColor: '2px solid  #AFBD22',
      backgroundColor: 'transparent',
      legendLabel: 'On Schedule - Estimated',
    },
    {
      borderColor: '2px solid  #FCB924',
      backgroundColor: 'transparent',
      legendLabel: 'Overdue - Estimated',
    },
    {
      borderColor: '',
      backgroundColor: '#FF4F4F',
      legendLabel: ' Delayed - Actual',
    },
    {
      borderColor: '2px solid #ccc',
      backgroundColor: 'transparent',
      legendLabel: 'Planned',
    },
  ];

  appointmentMock = [
    {
      clinician: {
        clinicianId: 1,
        firstName: 'Kelly',
        lastName: 'Morgan',
        jobCode: 'LPN',
        lastSyncTime: '15 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 1,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        lastName: 'Matthew',
        address: {
          address: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.0,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: 'Delayed',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Passed',
    },
    {
      clinician: {
        clinicianId: 2,
        firstName: 'Paula',
        lastName: ' Allen',
        jobCode: 'LPN',
        lastSyncTime: '10 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 2,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Phillips',
        lastName: 'Clark',
        address: {
          address1: '150 W',
          city: '17th St',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.0,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T09:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T09:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Passed',
    },
    {
      clinician: {
        clinicianId: 3,
        firstName: 'Paula',
        lastName: ' Allen',
        jobCode: 'LPN',
        lastSyncTime: '10 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 2,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Phillips',
        lastName: 'Clark',
        address: {
          address1: 'Long Island',
          city: 'City',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.1,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T11:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Unassigned',
    },
    {
      clinician: {
        clinicianId: 4,
        firstName: 'Paula',
        lastName: ' Allen',
        jobCode: 'LPN',
        lastSyncTime: '5 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 2,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Isabella',
        lastName: 'Lopez',
        address: {
          address1: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.1,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T11:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T11:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #FCB924',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Unassigned',
    },
    {
      clinician: {
        clinicianId: 5,
        firstName: 'Kelly',
        lastName: 'Morgan',
        jobCode: 'LPN',
        lastSyncTime: '12 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 1,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Steven',
        lastName: 'Silva',
        address: {
          address1: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: 'HomeVisit',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.25,
        },
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN-COVID19',
          appointmentProductivityPts: 0.0,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T08:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T09:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Rescheduled',
    },
    {
      clinician: {
        clinicianId: 6,
        firstName: 'Kelly',
        lastName: 'Morgan',
        jobCode: 'LPN',
        lastSyncTime: '5 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 1,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        lastName: 'Matthew',
        address: {
          address1: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.2,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T13:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T13:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: 'Delayed',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Rescheduled',
    },
    {
      clinician: {
        clinicianId: 7,
        firstName: 'Kelly',
        lastName: 'Morgan',
        jobCode: 'LPN',
        lastSyncTime: '13 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 1,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        lastName: 'Matthew',
        address: {
          address1: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 2.0,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: 'Delayed',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Checked Out',
    },
    {
      clinician: {
        clinicianId: 8,
        firstName: 'Kelly',
        lastName: 'Morgan',
        jobCode: 'LPN',
        lastSyncTime: '14 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 1,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        lastName: 'Matthew',
        address: {
          address1: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.34,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T01:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T01:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: 'Delayed',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #FCB924',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Checked Out',
    },
    {
      clinician: {
        clinicianId: 9,
        firstName: 'Kelly',
        lastName: 'Morgan',
        jobCode: 'LPN',
        lastSyncTime: '15 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 1,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        lastName: 'Matthew',
        address: {
          address1: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.56,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Passed',
    },
    {
      clinician: {
        clinicianId: 10,
        firstName: 'Kelly',
        lastName: 'Morgan',
        jobCode: 'LPN',
        lastSyncTime: '15 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 1,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        lastName: 'Matthew',
        address: {
          address1: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.67,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Unassigned',
    },
    {
      clinician: {
        clinicianId: 11,
        firstName: 'Kelly',
        lastName: 'Morgan',
        jobCode: 'LPN',
        lastSyncTime: '20 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 1,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        lastName: 'Matthew',
        address: {
          address1: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.8,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Checked Out',
    },
    {
      clinician: {
        clinicianId: 12,
        firstName: 'Kelly',
        lastName: 'Morgan',
        jobCode: 'LPN',
        lastSyncTime: '12 Mins',
        phoneNumer: '',
        address: null,
        homeBranch: '',
        LOBId: 1,
      },
      teamName: 'M01A',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        lastName: 'Matthew',
        address: {
          address1: '117',
          city: 'Broadway',
          state: 'NY',
          zip: '1001',
        },
      },
      acuityCodes: [
        {
          acuityCode: '1 - Same day',
        },
        {
          acuityCode: '2 - Next day',
        },
        {
          acuityCode: '3 - 2 day',
        },
      ],
      appointmentServiceCodes: [
        {
          appointmentVisitTypeCode: '1',
          appointmentServiceCode: 'RN00',
          appointmentProductivityPts: 1.9,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActStartTime: new Date('2021-05-11T10:20:30Z'),
      appointmentActEndTime: new Date('2021-05-11T10:20:30Z'),
      appointmentStartStatus: '',
      appointmentEndStatus: '',
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: '#AFBD22',
      },
      appointmentEndStatusLegend: {
        borderColor: '2px solid  #AFBD22',
        backgroundColor: 'transparent',
      },
      appointmentStatus: 'Checked Out',
    },
  ];

  clinicianSchedulesMock = {
    appointments: this.appointmentMock,
    executiveSummary: this.executiveSummaryMock,
    appointmentStatusLegends: this.appointmentStatusLegendMock,
  };

  getDashboardFilters(): Observable<string> {
    return JSON.parse(
      `{
          "lobCodes":[{"lobId":1,"description":"HOME HEALTH"},{"lobId":2,"description":"HOSPICE"},{"lobId":3,"description":"PRIVATE DUTY"},{"lobId":25000,"description":"NURSE FAMILY PARTNERSHIP"}],
          "disciplineCodes":[{"desciplineCode":"PT","description":"PHYSICAL THERAPIST"},{"desciplineCode":"OT","description":"OCCUPATIONAL THERAPIST"},{"desciplineCode":"SN","description":"SKILLED NURSE"},{"desciplineCode":"ST","description":"SPEECH THERAPIST"},{"desciplineCode":"MSW","description":"MEDICAL SOCIAL WORKER"},{"desciplineCode":"HHA","description":"HOME HEALTH AIDE"},{"desciplineCode":"PHY","description":"PHYSICIAN SERVICES"},{"desciplineCode":"RD","description":"REGISTERED DIETICIAN"},{"desciplineCode":"BRV","description":"BEREAVEMENT COORDINATOR"},{"desciplineCode":"SCC","description":"SPIRITUAL CARE COUNSELOR"},{"desciplineCode":"VOL","description":"VOLUNTEER"},{"desciplineCode":"ADMN","description":"ADMINISTRATIVE"},{"desciplineCode":"MA","description":"MASSAGE THERAPIST"},{"desciplineCode":"MU","description":"MUSIC THERAPIST"},{"desciplineCode":"RE","description":"REIKI THERAPIST"},{"desciplineCode":"VM","description":"VOLUNTEER MANAGER"},{"desciplineCode":"LPN","description":"LICENSED PRACTICAL NURSE"},{"desciplineCode":"AT","description":"ART THERAPY"},{"desciplineCode":"BC","description":"BEREAVEMENT COUNSELOR"},{"desciplineCode":"ART","description":"ART THERAPIST"},{"desciplineCode":"TH","description":"TELEHEALTH"},{"desciplineCode":"TI","description":"TELEHEALTH INSTALL"}],
          "regions":[{"regionId":1,"regionName":"Region1"},{"regionId":2,"regionName":"Region2"},{"regionId":3,"regionName":"Region3"}],
          "branches":[{"branchId":1,"branchName":"Branch11","regionId":1},{"branchId":2,"branchName":"Branch12","regionId":1},{"branchId":3,"branchName":"Branch13","regionId":1},{"branchId":4,"branchName":"Branch21","regionId":2},{"branchId":5,"branchName":"Branch22","regionId":2},{"branchId":6,"branchName":"Branch23","regionId":2},{"branchId":7,"branchName":"Branch31","regionId":3},{"branchId":8,"branchName":"Branch32","regionId":3},{"branchId":9,"branchName":"Branch33","regionId":3}],
          "teams":[{"teamId":1,"teamName":"Team11","branchId":1},{"teamId":2,"teamName":"Team12","branchId":1},{"teamId":3,"teamName":"Team13","branchId":1},{"teamId":4,"teamName":"Team21","branchId":2},{"teamId":5,"teamName":"Team22","branchId":2},{"teamId":6,"teamName":"Team23","branchId":2},{"teamId":7,"teamName":"Team31","branchId":3},{"teamId":8,"teamName":"Team32","branchId":3},{"teamId":9,"teamName":"Team33","branchId":3}]}`
    );
  }
  getAppointments(): Observable<any> {
    return of(this.clinicianSchedulesMock);
  }
  getPatients = (requestData: RequestData) => {
    const url = CommonMethods.getAPIURL(
      AppSettings.apiEndPointGetAppointmentDetails
    );
    return this.http.get<any>(url);
  };
  getClinicians(requestData: RequestData): Observable<Clinician[]> {
    const url = CommonMethods.getAPIURL(AppSettings.apiEndPointGetClinicians);
    return this.http.get<any>(url);
  }

  // this method is used to get the master filter details like lob, discipline, region, branch and team
  getAllFilters(): Observable<any> {
    const url = CommonMethods.getAPIURL(AppSettings.apiEndPointGetAllFilters);
    return this.http.get<any>(url);
  }

  getAppointmentDetails1(requestData: RequestData): Observable<any> {
    const url = CommonMethods.getAPIURL(
      AppSettings.apiEndPointGetAppointmentDetails
    );
    return this.http.get<any>(url);
  }

  // this method is used to get the dashboard details - Clinicinas, appointments, executive summary, status legends
  getDashboardDetails(requestData: RequestData): Observable<any> {
    const url = CommonMethods.getAPIURL(
      AppSettings.apiEndPointGetAppointmentDetails
    );
    return this.http.post<any>(url, requestData, httpOptions);
  }

  // this method is used to get the dashboard details for patients- patients, appointments, executive summary, status legends
  getPatientAppoinments(requestData: RequestData): Observable<any> {
    const url = CommonMethods.getAPIURL(
      AppSettings.apiEndPointgetPatientAppoinments
    );
    return this.http.post<any>(url, requestData, httpOptions);
  }

  // Get schedules for a clinician
  getClinicianSchedules(requestData: RequestData): Observable<any> {
    const url = CommonMethods.getAPIURL(AppSettings.apiEndPointGetSchedules);
    return this.http.post<any>(url, requestData, httpOptions);
  }

  // Get schedules for a patient
  getPatientSchedules(requestData: RequestData): Observable<any> {
    const url = CommonMethods.getAPIURL(
      AppSettings.apiEndPointGetPatientSchedules
    );
    return this.http.post<any>(url, requestData, httpOptions);
  }
}
