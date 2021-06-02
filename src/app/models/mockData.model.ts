import { AcuityCode } from './acuity-code.interface';
import { AppointmentStatusLegend } from './appointment-status-legend.interface';
import { Appointment } from './appointment.interface';
import { Clinician } from './clinician.interface';
import { ExecutiveSummary } from './executive-summary.interface';
import { Patient } from './patient.interface';

export const clinicianMock: Clinician = {
  clinicianId: 100,
  firstName: 'Kelly',
  lastName: 'Morgan',
  jobCode: 'LPN',
  lastSyncTime: '15 mins',
  phoneNumber: '646-258-1288',
};

export const patientMock: Patient = {
  patientId: 123,
  firstName: 'Philips',
  lastName: 'Clark',
  MRN: 'MRN25',
  DOB: new Date(2001, 2, 2),
  phoneNumber: '785-875-8755',
  address: {
    address1: '27th Street A Main 2',
    city: 'Bronx',
    state: 'NY',
    zip: '10032',
  },
};

export const acuityCodesMock: AcuityCode[] = [
  {
    acuityCode: '1 - Same day',
  },
  {
    acuityCode: '2 - Next day',
  },
  {
    acuityCode: '3 - 2 day',
  },
];

export const appointmentStatusLegendMock: AppointmentStatusLegend[] = [
  {
    borderColor: '',
    backgroundColor: '#AFBD22',
    legendLabel: 'On Schedule - Actual',
    isLegend: true,
  },
  {
    borderColor: '2px solid #AFBD22',
    backgroundColor: 'transparent',
    legendLabel: 'On Schedule - Estimated',
    isLegend: true,
  },
  {
    borderColor: '2px solid #FCB924',
    backgroundColor: 'transparent',
    legendLabel: 'Overdue - Estimated',
    isLegend: true,
  },
  {
    borderColor: '2px solid #ADADAD',
    backgroundColor: 'transparent',
    legendLabel: 'Planned',
    isLegend: true,
  },
  {
    borderColor: '2px solid #ADADAD',
    backgroundColor: 'transparent',
    legendLabel: 'Planned',
    isLegend: true,
  },
];

export const executiveSummaryMock: ExecutiveSummary[] = [
  {
    executiveSummaryLabel: 'Scheduled Today',
    executiveSummaryValue: '3',
    executiveSummaryGreyedOut: false,
  },
  {
    executiveSummaryLabel: 'Completed Today',
    executiveSummaryValue: '2',
    executiveSummaryGreyedOut: false,
  },
  {
    executiveSummaryLabel: 'Delayed Today',
    executiveSummaryValue: '1',
    executiveSummaryGreyedOut: false,
  },
  {
    executiveSummaryLabel: 'Missed Today',
    executiveSummaryValue: '0',
    executiveSummaryGreyedOut: false,
  },
  {
    executiveSummaryLabel: 'Upcoming Appointment(s)',
    executiveSummaryValue: '1',
    executiveSummaryGreyedOut: true,
  },
];

export const appointmentsMock: Appointment[] = [
  {
    appointmentSequence: '4',
    address: {
      address1: '27th Street A Main 2',
      city: 'Bronx',
      state: 'NY',
      zip: '85768',
    },
    appointmentServiceCodes: [
      {
        appointmentVisitTypeCode: 'HomeVisit',
        appointmentServiceCode: 'RN00',
        appointmentProductivityPts: 1.0,
      },
    ],
    teamName: 'AR25',
    clinician: {
      clinicianId: 2,
      firstName: 'Kim',
      lastName: ' Cortel',
      jobCode: 'LPN',
      lastSyncTime: '10 Mins',
    },
    appointmentWdoStartTime: new Date('2021-06-11T01:00:30Z'),
    appointmentWdoEndTime: new Date('2021-06-11T01:10:30Z'),
    appointmentActStartTime: new Date('2021-06-11T01:00:30Z'),
    appointmentActEndTime: new Date('2021-06-11T01:10:30Z'),
    appointmentStartStatusLegend: {
      borderColor: '',
      backgroundColor: '#AFBD22',
      legendLabel: 'On Schedule - Actual',
      isLegend: true,
    },
    appointmentEndStatusLegend: {
      borderColor: '',
      backgroundColor: '#AFBD22',
      legendLabel: 'On Schedule - Actual',
      isLegend: true,
    },
  },
  {
    appointmentSequence: '1',
    address: {
      address1: '25th Main Street',
      city: 'Bronx',
      state: 'NY',
      zip: '85768',
    },
    appointmentServiceCodes: [
      {
        appointmentVisitTypeCode: 'HomeVisit',
        appointmentServiceCode: 'RN01',
        appointmentProductivityPts: 1.2,
      },
      {
        appointmentVisitTypeCode: 'HomeVisit',
        appointmentServiceCode: 'RN-COVID19',
        appointmentProductivityPts: 0.0,
      },
    ],
    teamName: 'MA025',
    clinician: {
      clinicianId: 2,
      firstName: 'John',
      lastName: 'Darek',
      jobCode: 'ARR',
      lastSyncTime: '25 Mins',
    },
    appointmentWdoStartTime: new Date('2021-06-11T01:00:30Z'),
    appointmentWdoEndTime: new Date('2021-06-11T01:30:30Z'),
    appointmentActStartTime: new Date('2021-06-11T01:00:30Z'),
    appointmentActEndTime: new Date('2021-06-11T01:30:30Z'),
    appointmentStartStatusLegend: {
      borderColor: '',
      backgroundColor: '#AFBD22',
      legendLabel: 'On Schedule - Actual',
      isLegend: true,
    },
    appointmentEndStatusLegend: {
      borderColor: '',
      backgroundColor: '#AFBD22',
      legendLabel: 'On Schedule - Actual',
      isLegend: true,
    },
  },
];
