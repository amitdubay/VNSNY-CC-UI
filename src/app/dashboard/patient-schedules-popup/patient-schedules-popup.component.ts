import {
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonMethods } from 'src/app/common/common-methods';
import { GlobalConstants } from 'src/app/common/global-contants';
import { AcuityCode } from 'src/app/models/acuity-code.interface';
import { AppointmentStatusLegend } from 'src/app/models/appointment-status-legend.interface';
import { Appointment } from 'src/app/models/appointment.interface';
import { ExecutiveSummary } from 'src/app/models/executive-summary.interface';
import { Patient } from 'src/app/models/patient.interface';

@Component({
  selector: 'app-patient-schedules-popup',
  templateUrl: './patient-schedules-popup.component.html',
  styleUrls: ['./patient-schedules-popup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PatientSchedulesPopupComponent implements OnInit {
  @Input() acuityCodes: AcuityCode[];
  @Input() appointmentStatusLegends: AppointmentStatusLegend[];
  @Input() executiveSummary: ExecutiveSummary[];
  @Input() patient: Patient;
  @Input() appointments: Appointment[];

  dataSource: MatTableDataSource<any>;
  defaultSort = {
    active: GlobalConstants.appointmentTime,
    direction: GlobalConstants.ascending as SortDirection,
  };
  @ViewChild(MatSort) sort: MatSort;

  displayedColumnsHeader1: string[] = [
    GlobalConstants.appointmentSequence,
    GlobalConstants.serviceAddress,
    GlobalConstants.appointmentServiceCode,
    GlobalConstants.team,
    GlobalConstants.clinicianName,
    GlobalConstants.appointmentTime,
    GlobalConstants.appointment,
  ];
  displayedColumnsHeader2: string[] = [
    GlobalConstants.appointmentStart,
    GlobalConstants.appointmentEnd,
  ];
  displayedColumnsRows: string[] = [
    GlobalConstants.appointmentSequence,
    GlobalConstants.serviceAddress,
    GlobalConstants.appointmentServiceCode,
    GlobalConstants.team,
    GlobalConstants.clinicianName,
    GlobalConstants.appointmentTime,
    GlobalConstants.appointmentStart,
    GlobalConstants.appointmentEnd,
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.acuityCodes = data.acuityCodes;
    this.appointmentStatusLegends = data.appointmentStatusLegends;
    this.executiveSummary = data.executiveSummary;
    this.patient = data.patient;
    this.appointments = data.appointments;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.appointments);
    this.dataSource.sort = this.sort;
    this.onSortData(this.defaultSort);
  }

  // sort data based on the sort column and direction
  public onSortData(sort: Sort): void {
    this.dataSource.data = CommonMethods.appointmentSort(
      this.appointments,
      sort.active,
      sort.direction
    );
  }

  getAppointmentServiceCodeIcon(appointmentVisitTypeCode: string): string {
    return CommonMethods.getAppointmentServiceCodeIcon(
      appointmentVisitTypeCode
    );
  }
}
