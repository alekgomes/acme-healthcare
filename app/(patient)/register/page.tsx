"use client";
import { PatientService } from "@/app/services/PatientService/PatienteService.service";
import { usePatientModel } from "../patient.model";
import RegisterView from "./register.view";
import {
  PatientContextProvider,
  usePatientContext,
} from "@/contexts/patientContext";

function RegisterPage() {
  const {
    register,
    errors,
    handleOnSubmit,
    Controller,
    control,
    isSubmitting,
  } = usePatientContext();

  return (
    <PatientContextProvider>
      <RegisterView
        register={register}
        errors={errors}
        handleOnSubmit={handleOnSubmit}
        Controller={Controller}
        control={control}
        isSubmitting={isSubmitting}
      />
    </PatientContextProvider>
  );
}

export default RegisterPage;
