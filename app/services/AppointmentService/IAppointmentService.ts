import { PatientSchema } from "@/app/(patient)/patient.model";

export interface IAppointmentService {
  Create: (data: any) => Promise<any>;
  GetAll: (patientId: number) => any;
  Update: (data: any) => any; // type Pacient[]
  // FindByQuery: (query: any) => Promise<any>; // type Pacient
}
