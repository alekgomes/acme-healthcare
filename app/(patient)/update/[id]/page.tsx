"use client";

import { useEffect } from "react";
import UpdateView from "./update.view";
import {
  PatientContextProvider,
  usePatientContext,
} from "@/contexts/patientContext";

function UpdatePage({ params }: any) {
  const {
    register,
    errors,
    Controller,
    control,
    isSubmitting,
    handleUpdate,
    patients,
    populateEditForm,
  } = usePatientContext();

  let currentPatient = patients as any | null | undefined;
  currentPatient = currentPatient.find(
    (patient: any) => patient.id == params.id
  );

  const handleUpdateWithId = handleUpdate({
    id: currentPatient.id,
    addressId: currentPatient.addressId,
  });

  console.log("currentPatient", currentPatient);

  useEffect(() => {
    populateEditForm(currentPatient);
  }, [patients, currentPatient]);

  return (
    <PatientContextProvider>
      <UpdateView
        register={register}
        errors={errors}
        handleOnSubmit={handleUpdateWithId}
        Controller={Controller}
        control={control}
        isSubmitting={isSubmitting}
        currentPatient={currentPatient}
      />
    </PatientContextProvider>
  );
}

export default UpdatePage;
