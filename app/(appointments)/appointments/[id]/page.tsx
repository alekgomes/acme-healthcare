"use client";
import { useAppointmentContext } from "@/contexts/appointmentContext";
import { AppointmentsView } from "./appointments.view";

export default function AppointmentsPage({ params }: any) {
  const { getAppointments, isLoading, patient, Controller, control, errors } =
    useAppointmentContext();
  return (
    <AppointmentsView
      getAppointments={getAppointments}
      params={params}
      isLoading={isLoading}
      patient={patient}
      Controller={Controller}
      control={control}
      errors={control}
    />
  );
}
