import { AcuityCode } from './acuity-code.interface';
import { Address } from './address.interface';
import { AppointmentServiceCode } from './appointment-service-code.interface';
import { AppointmentStatusLegend } from './appointment-status-legend.interface';
import { Clinician } from './clinician.interface';
import { Patient } from './patient.interface';

export interface Appointment {
  appointmentSequence?: string;
  address?: Address;
  clinician: Clinician;
  teamName: string;
  patient?: Patient;
  acuityCodes?: AcuityCode[];
  appointmentServiceCodes: AppointmentServiceCode[];
  appointmentWdoStartTime: Date;
  appointmentWdoEndTime: Date;
  appointmentActStartTime: Date;
  appointmentActEndTime: Date;
  appointmentStartStatusLegend: AppointmentStatusLegend;
  appointmentEndStatusLegend: AppointmentStatusLegend;
}
