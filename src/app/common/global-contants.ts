export class GlobalConstants {
  public static apiURL = '';
  public static all = 'ALL';
  public static allRegion = 'All Regions';
  public static allBranch = 'All Branches';
  public static allTeam = 'All Teams';
  public static siteTitle = 'VNSNY Command Center';
  public static clinician = 'clinician';
  public static discipline = 'Discipline';
  public static region = 'Region';
  public static branch = 'Branch';
  public static team = 'team';
  public static month = 'month';
  public static HomeVisit = 'HomeVisit';

  // error type identifier - this is used in the error dialog pop up to identify to show the custom error which is sent from UI
  public static errorType999 = 999;

  // numbers
  public static zero = 0;
  public static one = 1;
  public static sixty = 60;
  public static twentyFour = 24;
  public static thousand = 1000;

  // css Names
  public static cssbtnactive = 'btn-active';
  public static selectedDayCSS = 'selected-date';
  public static clinicianPopupWrapper = 'clinician-schedules-popup';
  public static patientPopupWrapper = 'patient-schedules-popup';

  public static selected7DayCSS = 'selected-date-7';
  public static matCalendarBodyDisabled = 'mat-calendar-body-disabled';

  // error message
  public static errCommonError = 'Error occurred.';
  public static errChooseAtleastOneItem =
    'You must choose at least one item from {0}';
  public static errRegionNotSelected = 'Please select atleast one region.';
  public static errBranchNotSelected = 'Please select atleast one branch.';
  public static errTeamNotSelected = 'Please select atleast one team.';
  public static errMinimumThreeCharacters =
    'Please enter minimum three characters.';
  public static msgNoDataFound = 'No data found for the selected filter';

  // Sort direction
  public static ascending = 'asc';
  public static descending = 'desc';

  // Date and Time formats dateFormat='Monday, 24/5/2021' timeFormat='5:20 AM'
  public static dateFormat = 'EEEE, d/M/yyyy';
  public static timeFormat = 'hh:mm aaa';

  // Last sync in minutes cases, {0-120}, {121-1440} qnd {>1440}
  public static lastSyncCaseOne = 120;
  public static lastSyncCaseOneText = 'Mins ago';
  public static lastSyncCaseTwo = 1440;
  public static lastSyncCaseTwoText = 'Hours ago';
  public static lastSyncCaseThreeText = 'Day(s) ago';

  // Column names
  public static acuityCodes = 'acuityCodes';
  public static appointment = 'appointment';
  public static appointmentEnd = 'appointmentEnd';
  public static appointmentSequence = 'appointmentSequence';
  public static appointmentServiceCode = 'appointmentServiceCode';
  public static appointmentStart = 'appointmentStart';
  public static appointmentTime = 'appointmentTime';
  public static clinicianName = 'clinicianName';
  public static patientName = 'patientName';
  public static serviceAddress = 'serviceAddress';

  // icon
  public static imagesURL = '../../assets/images/{0}.svg';
  public static mapIconEnabled = 'map-icon';
  public static mapIconDisabled = 'map-disable';
  public static inPersonIcon = 'in-person-icon';
  public static telIcon = 'tel-icon';

  // parameters
  public static paramZero = '{0}';

  // Literal
  public static today = 'Today';
  public static days = 'Days';

  // symbol
  public static symbolColon = ':';
  public static symbolComma = ',';
  public static symbolBackSlash = '/';

  // array
  public static monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
}
