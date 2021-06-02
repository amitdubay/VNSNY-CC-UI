import { NgModule } from '@angular/core';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorDialogService } from './services/error-dialog.service';
import { LoadingDialogService } from './services/loading-dialog.service';
import { MaterialModule } from '../material.module';
import { IdleTimeoutComponent } from './components/idle-timeout/idle-timeout.component';
import { IdleTimeoutDialogComponent } from './components/idle-timeout-dialog/idle-timeout-dialog.component';
import { DataLastRefreshComponent } from './components/data-last-refresh/data-last-refresh.component';
import { InitialsPipe } from './pipes/initials.pipe';
import { LastSyncTimePipe } from './pipes/last-sync-time.pipe';
import { FormatAppointmentDateTimePipe } from './pipes/format-appointment-date-time.pipe';

const sharedComponents = [
  LoadingDialogComponent,
  ErrorDialogComponent,
  IdleTimeoutComponent,
  IdleTimeoutDialogComponent,
  DataLastRefreshComponent,
  InitialsPipe,
  LastSyncTimePipe,
  FormatAppointmentDateTimePipe,
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [...sharedComponents],
  providers: [ErrorDialogService, LoadingDialogService, DatePipe],
  entryComponents: [...sharedComponents],
})
export class SharedModule {}
