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
import { AppointmentStatusLegend } from 'src/app/models/appointment-status-legend.interface';
import { Appointment } from 'src/app/models/appointment.interface';
import { Clinician } from 'src/app/models/clinician.interface';
import { ExecutiveSummary } from 'src/app/models/executive-summary.interface';

@Component({
  selector: 'app-clinician-schedules-popup',
  templateUrl: './clinician-schedules-popup.component.html',
  styleUrls: ['./clinician-schedules-popup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ClinicianSchedulesPopupComponent implements OnInit {
  @Input() appointments: Appointment[];
  @Input() appointmentStatusLegends: AppointmentStatusLegend[];
  @Input() clinician: Clinician;
  @Input() executiveSummary: ExecutiveSummary[];

  dataSource: MatTableDataSource<any>;
  defaultSort = {
    active: GlobalConstants.appointmentTime,
    direction: GlobalConstants.ascending as SortDirection,
  };

  @ViewChild(MatSort) sort: MatSort;

  displayedColumnsHeader1: string[] = [
    GlobalConstants.patientName,
    GlobalConstants.acuityCodes,
    GlobalConstants.appointmentServiceCode,
    GlobalConstants.appointmentTime,
    GlobalConstants.appointment,
  ];
  displayedColumnsHeader2: string[] = [
    GlobalConstants.appointmentStart,
    GlobalConstants.appointmentEnd,
  ];
  displayedColumnsRows: string[] = [
    GlobalConstants.patientName,
    GlobalConstants.acuityCodes,
    GlobalConstants.appointmentServiceCode,
    GlobalConstants.appointmentTime,
    GlobalConstants.appointmentStart,
    GlobalConstants.appointmentEnd,
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.clinician = data.clinician;
    this.appointmentStatusLegends = data.appointmentStatusLegends;
    this.executiveSummary = data.executiveSummary;
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
