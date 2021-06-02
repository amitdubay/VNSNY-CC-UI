import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  @Input() patients: any;
  arrPatients: any;
  @Input() selectedPatientId = 0;
  @Output() getAppointmentsByPatientIdEvent = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.arrPatients = this.patients;
  }
  getAppointmentsByPatientId(patientId: number): void {
    // console.log(this.selectedClinicianId,clinicianId);
    if (this.selectedPatientId === patientId) {
      this.selectedPatientId = 0;
    } else {
      this.selectedPatientId = patientId;
    }
    // console.log(this.selectedClinicianId);
    this.getAppointmentsByPatientIdEvent.emit(patientId);
  }
}
