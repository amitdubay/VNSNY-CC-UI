export interface RequestData {
  searchText?: string;
  lobId: number;
  disciplines: string[];
  regions: string[];
  branches: string[];
  teams: number[];
  startDate: Date;
  endDate: Date;
  selectedDates: Date[];
  patientId?: number;
  clinicianId?: number;
}
