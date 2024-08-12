"use client";

import { useAppointmentModel } from "@/app/(appointments)/appointments/appointments.model";
import { AppointmentService } from "@/app/services/AppointmentService/AppointmentService.service";
import { createContext, useContext } from "react";

type ContextProps = {
  getAppointments: any;
  isLoading: any;
  Controller: any;
  control: any;
  errors: any;
  handleOnSubmit: any;
  patient: any;
  populateEditForm: any;
};

const AppointmentContext = createContext<ContextProps | null>(null);

export function AppointmentContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appointmentService = new AppointmentService();
  const {
    getAppointments,
    isLoading,
    Controller,
    control,
    errors,
    handleOnSubmit,
    patient,
    populateEditForm,
    isSubmitting,
    apiStatus,
    handleUpdate,
  } = useAppointmentModel(appointmentService);
  return (
    <AppointmentContext.Provider
      value={{
        getAppointments,
        isLoading,
        Controller,
        control,
        errors,
        handleOnSubmit,
        patient,
        populateEditForm,
        isSubmitting,
        apiStatus,
        handleUpdate,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  const context = useContext(AppointmentContext);

  if (!context) {
    throw Error("AppointmentContext error");
  }

  return context;
}
