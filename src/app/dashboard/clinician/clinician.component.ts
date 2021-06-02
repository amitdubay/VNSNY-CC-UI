import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clinician',
  templateUrl: './clinician.component.html',
  styleUrls: ['./clinician.component.css'],
})
export class ClinicianComponent implements OnInit {
  @Input() clinicians: any;
  @Input() selectedClinicianId = 0;
  @Output() getAppointmentsByClinicianIdEvent = new EventEmitter<number>();
  arrClinicians: any;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.arrClinicians = this.clinicians;
  }

  getAppointmentsByClinicianId(clinicianId: number): void {
    // console.log(this.selectedClinicianId,clinicianId);
    if (this.selectedClinicianId === clinicianId) {
      this.selectedClinicianId = 0;
    } else {
      this.selectedClinicianId = clinicianId;
    }
    // console.log(this.selectedClinicianId);
    this.getAppointmentsByClinicianIdEvent.emit(clinicianId);
  }
}
