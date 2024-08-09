"use client";
import { PatientService } from "@/app/services/PatientService/PatienteService.service";
import { usePatientModel } from "../patient.model";
import RegisterView from "./register.view";

function RegisterPage() {
  const patientService = new PatientService();
  const { register, handleOnSubmit, errors } = usePatientModel(patientService);

  return (
    <RegisterView
      register={register}
      errors={errors}
      handleOnSubmit={handleOnSubmit}
    />
  );
}

export default RegisterPage;
