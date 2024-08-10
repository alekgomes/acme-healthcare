import { PatientSchema } from "@/app/(patient)/patient.model";

export interface IPatientService {
  Create: (data: PatientSchema) => any;
  FindAll: () => Promise<any[]>; // type Pacient[]
  FindUnique: (query: any) => Promise<any>; // type Pacient
}
