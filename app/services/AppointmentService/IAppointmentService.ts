import { Patient, PatientRegister } from "@prisma/client";

export interface IAppointmentService {
  Create: (data: any) => Promise<any>;
  GetAll: (patientId: Partial<Patient>) => Promise<any>;
  Update: (data: any) => any; // type Pacient[]
  // FindByQuery: (query: any) => Promise<any>; // type Pacient
}
