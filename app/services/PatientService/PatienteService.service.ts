import axios from "axios";

import { PatientSchema } from "@/app/(patient)/patient.model";
import { IPatientService } from "./IPatienteService";

export class PatientService implements IPatientService {
  async Create(data: PatientSchema) {
    const res = await axios.post("/api/patient", data);
    return res;
  }

  async Update(data: any): Promise<any> {
    const res = await axios.put("/api/patient", data);
    return res;
  }

  async FindByQuery(query: any): Promise<any> {
    const res = await axios.get("/api/patient", { params: query });
    return res;
  }
}
