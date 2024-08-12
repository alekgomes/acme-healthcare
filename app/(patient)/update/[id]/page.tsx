"use client";

import { useEffect } from "react";
import UpdateView from "./update.view";
import { usePatientContext } from "@/contexts/patientContext";

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
    apiStatus,
  } = usePatientContext();

  let currentPatient = patients as any | null | undefined;
  currentPatient = currentPatient?.find(
    (patient: any) => patient.id == params.id
  );

  const handleUpdateWithId = handleUpdate({
    id: currentPatient.id,
    addressId: currentPatient.addressId,
  });

  useEffect(() => {
    populateEditForm(currentPatient);
  }, [currentPatient.id]);

  return (
    <UpdateView
      register={register}
      errors={errors}
      handleOnSubmit={handleUpdateWithId}
      Controller={Controller}
      control={control}
      isSubmitting={isSubmitting}
      apiStatus={apiStatus}
    />
  );
}

export default UpdatePage;
