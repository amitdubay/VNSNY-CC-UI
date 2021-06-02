import {
  Component,
  AfterViewInit,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Appointment } from 'src/app/models/appointment.interface';
import { GlobalConstants } from 'src/app/common/global-contants';
import { CommonMethods } from 'src/app/common/common-methods';
import { MatMenuTrigger } from '@angular/material/menu';
import { Patient } from 'src/app/models/patient.interface';

@Component({
  selector: 'app-patient-appointment-listview',
  templateUrl: './patient-appointment-listview.component.html',
  styleUrls: ['./patient-appointment-listview.component.css'],
})
export class PatientAppointmentListviewComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('menuTrigger') trigger: MatMenuTrigger;
  @Output() showPatientPopupEvent = new EventEmitter<Patient>();
  @Input() appointments: Appointment[];
  @Input() appointmentLegends: any[];
  Patient: Patient;
  isApplyDisabled = true;
  patientAppointments = [];
  displayedColumns: string[] = [
    'patientName',
    'appointmentTime',
    'acuityCodes',
    'appointmentServiceCode',
    'team',
    'clinicianName',
    'appointmentStart',
    'appointmentEnd',
  ];
  dataSource = new MatTableDataSource<Appointment>(this.patientAppointments);
  appointmentFilters: string[] = [
    'ALL',
    'Passed',
    'Checked Out',
    'Resheduled',
    'Unassigned',
  ];
  appointmentFilterSelected: string[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}
  ngOnInit() {
    this.patientAppointments = this.appointments;
    this.getAppointmentFilters();
    this.handleSelectOptionClick(GlobalConstants.all, true);
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Appointment>(
      this.patientAppointments
    );
    console.log(this.patientAppointments);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAppointmentFilters = () => {
    this.appointmentFilters = this.patientAppointments.map(
      (item: { appointmentStatus: any }) => item.appointmentStatus
    );

    this.appointmentFilters = [...new Set(this.appointmentFilters)];
    this.appointmentFilters.splice(0, 0, GlobalConstants.all);
  };

  handleSelectOptionClick = (text, selected) => {
    if (text === GlobalConstants.all) {
      if (selected) {
        this.appointmentFilterSelected = this.appointmentFilters;
      } else {
        this.appointmentFilterSelected = [];
      }
    } else {
      this.appointmentFilterSelected = this.appointmentFilterSelected.filter(
        (x) => x !== GlobalConstants.all
      );
    }
    this.isApplyDisabled = !(this.appointmentFilterSelected.length > 0);
  };
  getAppointmentServiceCodeIcon = (
    appointmentVisitTypeCode: string
  ): string => {
    return CommonMethods.getAppointmentServiceCodeIcon(
      appointmentVisitTypeCode
    );
  };
  filterApply = () => {
    let filterData: any = [];
    const indexAll = this.appointmentFilterSelected.indexOf(
      GlobalConstants.all
    );
    if (indexAll > -1 || this.appointmentFilterSelected.length === 0) {
      filterData = this.patientAppointments;
    } else {
      this.appointmentFilterSelected.forEach((element) => {
        filterData = filterData.concat(
          this.patientAppointments.filter(
            (a) => a.appointmentStatus === element
          )
        );
      });
    }
    this.dataSource = new MatTableDataSource<Appointment>(filterData);
    this.trigger.closeMenu();
  };

  openPatientSchedulesPopup(element: Patient): void {
    this.showPatientPopupEvent.emit(element);
  }

  clear = () => {
    this.appointmentFilterSelected = [];
    this.isApplyDisabled = !(this.appointmentFilterSelected.length > 0);
  };

  public onSortData(sort: Sort): void {
    this.dataSource.data = CommonMethods.appointmentSort(
      this.appointments,
      sort.active,
      sort.direction
    );
  }
}
