import { environment } from './../../environments/environment';

export class AppSettings {
  // Idle Timeout
  // Set this to 0(zero) to disable idle timeout
  public static userIdleTimeout = 900;
  // Time to show popup before idle timeout
  public static userIdlePopupTime = 120;

  // Frequency to make API call to get updated Data Last Refreshed value(in minutes)
  public static dataLastRefreshFetchFrequency = 15;
  public static dataLastRefreshColors = [
    { fromMinute: 1, toMinute: 15, color: 'green' },
    { fromMinute: 16, toMinute: 30, color: 'yellow' },
    { fromMinute: 31, toMinute: 1000000, color: 'red' },
  ];

  // Calendar control Days button
  public static today = 1;
  public static sevenDays = 7;
  public static thirtyDays = 30;
  public static sixtyDays = 60;

  // api URL
  public static apiURL = environment.production;
  // 'https://mlv91te97f.execute-api.us-east-1.amazonaws.com/{0}';
  //'https://mlv91te97f.execute-api.us-east-1.amazonaws.com/{0}';
  //https://fhkrcmh9dh.execute-api.us-east-2.amazonaws.com/{0} - qa
  public static apiEndPointGetClinicians = 'getClinicians';
  public static apiEndPointGetAllFilters = 'getAllFilters';
  public static apiEndPointGetAppointmentDetails = 'getClinicianAppointment';
  public static apiEndPointGetSchedules = 'getClinicianSchedule';
  public static apiEndPointGetPatientSchedules = 'getPatientSchedule';
  public static apiEndPointgetPatientAppoinments = 'getPatientAppoinment';
}
