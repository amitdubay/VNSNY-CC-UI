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
import { Clinician } from 'src/app/models/clinician.interface';
import { Appointment } from 'src/app/models/appointment.interface';
import { GlobalConstants } from 'src/app/common/global-contants';
import { CommonMethods } from 'src/app/common/common-methods';
import { MatMenuTrigger } from '@angular/material/menu';
@Component({
  selector: 'app-appointment-listview',
  templateUrl: './appointment-listview.component.html',
  styleUrls: ['./appointment-listview.component.css'],
})
export class AppointmentListviewComponent implements AfterViewInit, OnInit {
  @ViewChild('menuTrigger') trigger: MatMenuTrigger;
  @Output() showClinicianPopupEvent = new EventEmitter<Clinician>();
  @Output() showPatientPopupEvent = new EventEmitter<Appointment>();
  @Input() appointments: Appointment[];
  @Input() appointmentLegends: any[];
  @Input() isClinician: boolean;
  noDataFound=GlobalConstants.msgNoDataFound;
  clinician: Clinician;
  isApplyDisabled = true;
  clinicianAppointments = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Appointment>(this.clinicianAppointments);
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
    if (this.isClinician) {
      this.displayedColumns = [
        GlobalConstants.clinicianName,
        GlobalConstants.team,
        GlobalConstants.patientName,
        GlobalConstants.acuityCodes,
        GlobalConstants.appointmentServiceCode,
        GlobalConstants.appointmentTime,
        GlobalConstants.appointmentStart,
        GlobalConstants.appointmentEnd,
      ];
    } else {
      this.displayedColumns = [
        GlobalConstants.patientName,
        GlobalConstants.appointmentTime,
        GlobalConstants.acuityCodes,
        GlobalConstants.appointmentServiceCode,
        GlobalConstants.team,
        GlobalConstants.clinicianName,
        GlobalConstants.appointmentStart,
        GlobalConstants.appointmentEnd,
      ];
    }
    this.clinicianAppointments = this.appointments;
    this.getAppointmentFilters();
    this.handleSelectOptionClick(GlobalConstants.all, true);
  }
  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Appointment>(
      this.clinicianAppointments
    );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAppointmentFilters = () => {
    this.appointmentFilters = this.clinicianAppointments?.map(
      (item: { appointmentStartStatusLegend: any }) =>
        item.appointmentStartStatusLegend.legendLabel
    );

    this.appointmentFilters?.concat(
      this.clinicianAppointments?.map(
        (item: { appointmentEndStatusLegend: any }) =>
          item.appointmentEndStatusLegend.legendLabel
      )
    );
    this.appointmentFilters = [...new Set(this.appointmentFilters)];
    this.appointmentFilters.splice(0, 0, GlobalConstants.all);
  };

  // this method is used to handle filter options selected if non selected then apply button will be disabled
  // text - text of the option selected, selected - true/false
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

  // this method is used to display the telephone/personal icon in the grid
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
      filterData = this.clinicianAppointments;
    } else {
      this.appointmentFilterSelected.forEach((element) => {
        filterData = filterData.concat(
          this.clinicianAppointments.filter(
            (a) =>
              a.appointmentEndStatusLegend?.legendLabel === element ||
              a.appointmentStartStatusLegend?.legendLabel === element
          )
        );
      });
    }
    this.dataSource = new MatTableDataSource<Appointment>(filterData);
    this.trigger.closeMenu();
  };

  // trigger clinician popup show event to parent compponent
  openClinicianSchedulesPopup(element: Clinician): void {
    this.showClinicianPopupEvent.emit(element);
  }

  // trigger patient popup show event to parent compponent
  openPatientSchedulesPopup(element: Appointment): void {
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
