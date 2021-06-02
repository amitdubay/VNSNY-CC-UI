import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from '../shared/components/header/header.component';
import { ClinicianComponent } from './clinician/clinician.component';
import { PatientComponent } from './patient/patient.component';
import { DashboardService } from '../services/dashboard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentListviewComponent } from './appointment-listview/appointment-listview.component';
import { ClinicianSchedulesPopupComponent } from './clinician-schedules-popup/clinician-schedules-popup.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AppointmentStatusLegendComponent } from './appointment-status-legend/appointment-status-legend.component';
import { PatientSchedulesPopupComponent } from './patient-schedules-popup/patient-schedules-popup.component';
import { PatientAppointmentListviewComponent } from './patient-appointment-listview/patient-appointment-listview.component';
import { AppointmentStatusComponent } from './appointment-status/appointment-status.component';

const sharedComponents = [
  HeaderComponent,
  ClinicianComponent,
  PatientComponent,
  DashboardComponent,
  AppointmentListviewComponent,
  ClinicianSchedulesPopupComponent,
  CalendarComponent,
  PatientSchedulesPopupComponent,
  AppointmentStatusLegendComponent,
];
@NgModule({
  declarations: [
    ...sharedComponents,
    AppointmentStatusLegendComponent,
    PatientAppointmentListviewComponent,
    AppointmentStatusComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  exports: [...sharedComponents],
  providers: [DashboardService],
  entryComponents: [ClinicianSchedulesPopupComponent],
})
export class DashboardModule {}
