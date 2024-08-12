import axios from "axios";

import { Patient, PatientRegister } from "@prisma/client";

import { IAppointmentService } from "./IAppointmentService";

export class AppointmentService implements IAppointmentService {
  async GetAll(patientId: Partial<Patient>): Promise<any> {
    const res = await axios.get("/api/appointments", { params: patientId });
    return res;
  }

  async Create(data: any): Promise<any> {
    const res = await axios.post("/api/appointments", data);
    return res;
  }

  async Update(data: any): Promise<any> {
    const res = await axios.put("/api/appointments", data);
    return res;
  }
}
