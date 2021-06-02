import { Component, Input, OnInit } from '@angular/core';
import { AppointmentStatusLegend } from 'src/app/models/appointment-status-legend.interface';

@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrls: ['./appointment-status.component.css'],
})
export class AppointmentStatusComponent implements OnInit {
  @Input() appointmentStatusLegend: AppointmentStatusLegend;
  @Input() tooltipMessage: Date;
  constructor() {}

  ngOnInit(): void {}
}
