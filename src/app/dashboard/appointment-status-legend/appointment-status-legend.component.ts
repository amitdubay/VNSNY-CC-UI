import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-status-legend',
  templateUrl: './appointment-status-legend.component.html',
  styleUrls: ['./appointment-status-legend.component.css'],
})
export class AppointmentStatusLegendComponent {
  @Input() appointmentStatusLegends = [];
}
