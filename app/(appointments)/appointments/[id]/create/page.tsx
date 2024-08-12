"use client";

import { useAppointmentContext } from "@/contexts/appointmentContext";
import CreateAppointmentView from "./create.view";
import { useParams } from "next/navigation";

export default function Home() {
  const { Controller, control, errors, handleOnSubmit, isLoading, apiStatus } =
    useAppointmentContext();
  const params = useParams<{ id: string }>();

  const handleSubmitWithId = handleOnSubmit(params);

  return (
    <CreateAppointmentView
      Controller={Controller}
      control={control}
      errors={errors}
      handleOnSubmit={handleSubmitWithId}
      isLoading={isLoading}
      apiStatus={apiStatus}
    />
  );
}
