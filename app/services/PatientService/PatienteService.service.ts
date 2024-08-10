import axios from "axios";

import { PatientSchema } from "@/app/(patient)/patient.model";
import { IPatientService } from "./IPatienteService";

export class PatientService implements IPatientService {
  async Create(data: PatientSchema) {
    const res = await axios.post("/api/patient", data);
    return res;
  }

  async FindAll(): Promise<any[]> {
    return Promise.resolve([{}]);
  }

  async FindUnique(): Promise<any> {
    return Promise.resolve({});
  }
}
