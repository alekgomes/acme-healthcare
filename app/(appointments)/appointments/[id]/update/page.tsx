"use client";

import { useAppointmentContext } from "@/contexts/appointmentContext";
import UpdateAppointmentView from "./update.view";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const {
    Controller,
    control,
    errors,
    populateEditForm,
    patient,
    handleUpdate,
    apiStatus,
    isLoading,
  } = useAppointmentContext();
  const params = useParams<{ id: string }>();

  const handleSubmitWithId = handleUpdate(params);
  const currAppointment = patient?.registers.find(
    (register: any) => register.id == params.id
  );

  useEffect(() => {
    populateEditForm(currAppointment);
  }, [params, params.id, currAppointment]);

  return (
    <UpdateAppointmentView
      Controller={Controller}
      control={control}
      errors={errors}
      handleOnSubmit={handleSubmitWithId}
      apiStatus={apiStatus}
      isLoading={isLoading}
    />
  );
}
