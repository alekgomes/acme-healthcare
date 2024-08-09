import { IPatientService } from "@/app/services/PatientService/IPatienteService";

export function usePatientModel(service: IPatientService) {
  const registerPatient = (formData: FormData) => {
    service.Create(formData);
  };

  const findUnique = (query: any) => {
    service.FindUnique(query);
  };

  return { registerPatient, findUnique };
}
