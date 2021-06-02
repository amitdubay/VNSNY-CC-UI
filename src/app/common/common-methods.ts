import { Appointment } from '../models/appointment.interface';
import { AppSettings } from './app-settings';
import { GlobalConstants } from './global-contants';

export class CommonMethods {
  // This method is used to add passed days to the date parameter
  static addDays(date, days): Date {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  }

  // this method is used to get the number of days in a current month
  static daysInMonth(): number {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();
  }

  // this method will number of days extra which needs to be set to second calendar
  static remainingDaysInMonth(): number {
    let remainingDays = 0;
    remainingDays = this.daysInMonth() - new Date().getDate();
    return remainingDays;
  }

  static getDateWithOutHourMinute(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  // April 9, 2021
  static getDateinMonthDayYear(date: Date): string {
    return (
      GlobalConstants.monthNames[date.getMonth()] +
      ' ' +
      date.getDate() +
      GlobalConstants.symbolComma +
      ' ' +
      date.getFullYear()
    );
  }

  static compareString(a: string, b: string): number {
    return a.localeCompare(b);
  }

  static compareNumber(a: number, b: number): number {
    return a - b;
  }

  static compareAppointmentTime(a: Appointment, b: Appointment) {
    let result: number;
    if (a.appointmentWdoStartTime <= b.appointmentWdoStartTime) {
      if (a.appointmentWdoEndTime <= b.appointmentWdoEndTime) {
        result = -1;
      } else if (a.appointmentWdoEndTime >= b.appointmentWdoEndTime) {
        result = 1;
      }
    } else {
      if (a.appointmentWdoEndTime <= b.appointmentWdoEndTime) {
        result = -1;
      } else if (a.appointmentWdoEndTime >= b.appointmentWdoEndTime) {
        result = 1;
      }
    }
    return result;
  }

  static getAppointmentServiceCodeIcon(
    appointmentVisitTypeCode: string
  ): string {
    let icon = '';

    switch (appointmentVisitTypeCode) {
      case '1':
        icon = GlobalConstants.telIcon;
        break;
      case GlobalConstants.HomeVisit:
        icon = GlobalConstants.inPersonIcon;
        break;
      default:
        icon = GlobalConstants.inPersonIcon;
        break;
    }
    return GlobalConstants.imagesURL.replace(GlobalConstants.paramZero, icon);
  }

  // this method is used to return the date with english ordinarl (st, th, rd, nd)
  static getEnglishOrdinalSuffix(dt) {
    return (
      dt.getDate() +
      (dt.getDate() % 10 == 1 && dt.getDate() != 11
        ? 'st'
        : dt.getDate() % 10 == 2 && dt.getDate() != 12
        ? 'nd'
        : dt.getDate() % 10 == 3 && dt.getDate() != 13
        ? 'rd'
        : 'th')
    );
  }

  // this returns the api url by concatenating the passed end point
  static getAPIURL(endPoint: string) {
    return AppSettings.apiURL.replace(GlobalConstants.paramZero, endPoint);
  }

  // method with hardcoded data for testing
  static appointmentMock: Appointment[] = [
    {
      clinician: undefined,
      teamName: '',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        MRN: '',
        DOB: undefined,
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
          appointmentProductivityPts: 1.0,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T01:00:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T01:10:30Z'),
      appointmentActStartTime: new Date('2021-05-11T01:00:30Z'),
      appointmentActEndTime: new Date('2021-05-11T01:10:30Z'),
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: 'green',
        legendLabel: 'Delayed',
        isLegend: false,
      },
      appointmentEndStatusLegend: {
        borderColor: 'red',
        backgroundColor: 'yellow',
        legendLabel: 'Delayed',
        isLegend: true,
      },
    },
    {
      clinician: undefined,
      teamName: '',
      patient: {
        patientId: 200,
        firstName: 'Johan',
        lastName: 'Matthew',
        MRN: '',
        DOB: undefined,
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
          appointmentProductivityPts: 1.0,
        },
      ],
      appointmentWdoStartTime: new Date('2021-05-11T01:00:30Z'),
      appointmentWdoEndTime: new Date('2021-05-11T01:10:30Z'),
      appointmentActStartTime: new Date('2021-05-11T01:00:30Z'),
      appointmentActEndTime: new Date('2021-05-11T01:10:30Z'),
      appointmentStartStatusLegend: {
        borderColor: 'black',
        backgroundColor: 'green',
        legendLabel: 'Delayed',
        isLegend: false,
      },
      appointmentEndStatusLegend: {
        borderColor: 'red',
        backgroundColor: 'yellow',
        legendLabel: 'Delayed',
        isLegend: false,
      },
    },
  ];

  /**
   * appointmentSort
   * Takes Appointments array, sortColumn and SortDirection as inputs and returns sorted array
   * This method can be used to sort Appointments array
   */
  public static appointmentSort(
    appointments: Appointment[],
    sortColumn: string,
    sortDirection: string
  ): Appointment[] {
    const direction = sortDirection === GlobalConstants.ascending ? 1 : -1;
    return appointments.sort((a, b) => {
      let result;
      switch (sortColumn) {
        case GlobalConstants.clinicianName:
          result = CommonMethods.compareString(
            `${a.clinician?.lastName?.trim()}${a.clinician?.firstName?.trim()}`,
            `${b.clinician?.lastName?.trim()}${b.clinician?.firstName?.trim()}`
          );
          // if both values are same then we need to apply secondary sort on Appointment Time
          if (result === 0) {
            result = CommonMethods.compareAppointmentTime(a, b);
            return result;
          }
          return result * direction;

        case GlobalConstants.patientName:
          result = CommonMethods.compareString(
            `${a.patient?.lastName?.trim()}${a.patient?.firstName?.trim()}`,
            `${b.patient?.lastName?.trim()}${b.patient?.firstName?.trim()}`
          );
          // if both values are same then we need to apply secondary sort on Appointment Time
          if (result === 0) {
            return CommonMethods.compareAppointmentTime(a, b);
          }
          return result * direction;
        case GlobalConstants.appointmentServiceCode:
          result = CommonMethods.compareString(
            a.appointmentServiceCodes[
              GlobalConstants.zero
            ].appointmentServiceCode.trim(),
            b.appointmentServiceCodes[
              GlobalConstants.zero
            ].appointmentServiceCode.trim()
          );
          // if both values are same then we need to apply secondary sort on Appointment Time
          if (result === 0) {
            return CommonMethods.compareAppointmentTime(a, b);
          }
          return result * direction;
        case GlobalConstants.appointmentTime:
          return CommonMethods.compareAppointmentTime(a, b) * direction;
        default:
          return 0;
      }
    });
  }
}
