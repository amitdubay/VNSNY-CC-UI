import { Address } from './address.interface';

export interface Patient {
  patientId: number;
  MRN: string;
  DOB: Date;
  firstName: string;
  lastName: string;
  address: Address;
  phoneNumber?: string;
}
