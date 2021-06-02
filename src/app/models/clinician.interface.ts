import { Address } from './address.interface';
import { AppointmentStatusLegend } from './appointment-status-legend.interface';

export interface Clinician {
  clinicianId: number;
  firstName: string;
  lastName: string;
  jobCode: string;
  lastSyncTime: string;
  phoneNumber?: string;
  address?: Address;
  appointmentStatusLegend?:AppointmentStatusLegend;
}
