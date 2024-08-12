import axios from "axios";

import { IAppointmentService } from "./IAppointmentService";

export class AppointmentService implements IAppointmentService {
  // async Create(data: AppointmentSchema) {
  //   const res = await axios.post("/api/patient", data);
  //   return res;
  // }

  // async Update(data: any): Promise<any> {
  //   const res = await axios.put("/api/patient", data);
  //   return res;
  // }

  // async FindByQuery(query: any): Promise<any> {
  //   const res = await axios.get("/api/patient", { params: query });
  //   return res;
  // }

  async GetAll(patientId: number): Promise<any> {
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
