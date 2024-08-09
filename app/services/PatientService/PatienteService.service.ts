import { IPatientService } from "./IPatienteService";

export class PatientService implements IPatientService {
  async Create(formData: FormData) {}

  async FindAll(): Promise<any[]> {
    return Promise.resolve([{}]);
  }

  async FindUnique(): Promise<any> {
    return Promise.resolve({});
  }
}
