"use client";
import { PatientService } from "@/app/services/PatientService/PatienteService.service";
import { usePatientModel } from "../../patient.model";
import UpdateView from "./update.view";
import { UserContextProvider } from "@/contexts/patientContext";

function UpdatePage({ params }: any) {
  const patientService = new PatientService();
  const {
    register,
    handleOnSubmit,
    errors,
    Controller,
    control,
    isSubmitting,
    findAndUpdateFormState,
    handleUpdate,
  } = usePatientModel(patientService);

  console.log(params);

  findAndUpdateFormState(params);

  return (
    <UserContextProvider>
      <UpdateView
        register={register}
        errors={errors}
        handleOnSubmit={handleOnSubmit}
        Controller={Controller}
        control={control}
        isSubmitting={isSubmitting}
        handleUpdate={handleUpdate}
      />
    </UserContextProvider>
  );
}

export default UpdatePage;
