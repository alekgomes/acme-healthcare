import { PatientSchema } from "@/app/(patient)/patient.model";
import { IPatientService } from "./IPatienteService";
import { db } from "@/lib/db";

export class PatientService implements IPatientService {
  async Create(data: PatientSchema) {
    const newPatient = await db.patient.create({
      data: {
        name: data.name,
        dob: data.dob,
        cpf: data.cpf,
        sex: data.sex,
        status: data.status,
        address: {
          create: {
            cep: data.cep,
            city: data.city,
            street: data.street,
            adressNumber: data.adressNumber,
          },
        },
      },
    });

    console.log("newPatient", newPatient);
  }

  async FindAll(): Promise<any[]> {
    return Promise.resolve([{}]);
  }

  async FindUnique(): Promise<any> {
    return Promise.resolve({});
  }
}
