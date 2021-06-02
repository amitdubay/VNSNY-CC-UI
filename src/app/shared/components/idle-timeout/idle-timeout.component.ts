import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/common/app-settings';
import { IdleTimeoutService } from '../../services/idle-timeout.service';
import { IdleTimeoutDialogComponent } from '../idle-timeout-dialog/idle-timeout-dialog.component';

@Component({
  selector: 'app-idle-timeout',
  templateUrl: './idle-timeout.component.html',
  styleUrls: ['./idle-timeout.component.css'],
})
export class IdleTimeoutComponent implements OnInit {
  isTimeoutDialogOpen = false;
  originalPageTitle = '';
  dialogRef: MatDialogRef<IdleTimeoutDialogComponent>;

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private idleTimeoutService: IdleTimeoutService,
    private titleService: Title
  ) {
    this.originalPageTitle = this.titleService.getTitle();
  }

  ngOnInit(): void {
    // Initiate Timer only if 'userIdleTime' config value is greater than 0
    if (AppSettings.userIdleTimeout > 0) {
      this.initTimer();
    }
  }

  initTimer(): void {
    this.idleTimeoutService.initilizeSessionTimeout();
    this.idleTimeoutService.automaticLogoutTimeLeft.subscribe(
      (timeLeftInSec: string) => {
        this.onTimeTick(parseInt(timeLeftInSec, 10));
      }
    );

    this.idleTimeoutService.showDialog.subscribe((flag: boolean) => {
      if (flag === true) {
        this.openTimeoutDialog();
      }
    });
  }

  onTimeTick(timeLeftInSec): void {
    if (timeLeftInSec === 0) {
      // Timer has reached to 'Zero', logout user
      this.idleTimeout();
    } else if (this.isTimeoutDialogOpen === true) {
      const minutes = Math.floor(timeLeftInSec / 60);
      const seconds = (timeLeftInSec - minutes * 60)
        .toString()
        .padStart(2, '0');
      this.dialogRef.componentInstance.data = { min: minutes, sec: seconds };
      this.updatePageTitle(minutes.toString(), seconds);
    }
  }

  openTimeoutDialog(): void {
    if (!this.isTimeoutDialogOpen) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = null;
      dialogConfig.maxHeight = '100%';
      dialogConfig.width = '540px';
      dialogConfig.maxWidth = '100%';
      dialogConfig.disableClose = true;
      dialogConfig.hasBackdrop = true;
      this.dialogRef = this.matDialog.open(
        IdleTimeoutDialogComponent,
        dialogConfig
      );
      const sub = this.dialogRef.componentInstance.onContinue.subscribe(() => {
        // User opted to continue the session
        this.continueSession();
      });
      this.dialogRef.afterClosed().subscribe(() => {
        sub.unsubscribe();
      });
      this.isTimeoutDialogOpen = true;
    }
  }

  continueSession(): void {
    this.resetPageTitle();
    this.isTimeoutDialogOpen = false;
    this.idleTimeoutService.reset();
  }

  idleTimeout(): void {
    if (this.dialogRef && this.dialogRef.componentInstance) {
      // Timeout occured. Close the dialog
      this.dialogRef.close();
    }
    // Logout user
    this.isTimeoutDialogOpen = false;
    this.idleTimeoutService.cleanUp();
    this.router.navigate(['/login']);
    this.resetPageTitle();
  }

  updatePageTitle(minutes: string, seconds: string): void {
    this.titleService.setTitle(`Timeout in ${minutes}:${seconds}`);
  }

  resetPageTitle(): void {
    this.titleService.setTitle(this.originalPageTitle);
  }
}
