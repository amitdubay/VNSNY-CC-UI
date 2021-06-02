import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-idle-timeout-dialog',
  templateUrl: './idle-timeout-dialog.component.html',
  styleUrls: ['./idle-timeout-dialog.component.css'],
})
export class IdleTimeoutDialogComponent {
  onContinue = new EventEmitter();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  // When user clicks on Continue button, emit event to parent
  onSessionContinue(): void {
    this.onContinue.emit();
  }
}
