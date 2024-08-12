"use client";

import { usePatientModel } from "@/app/(patient)/patient.model";
import { PatientService } from "@/app/services/PatientService/PatienteService.service";
import { createContext, useContext } from "react";

type ContextProps = {
  findUnique: any;
  Controller: any;
  control: any;
  register: any;
  errors: any;
  handleOnSubmit: any;
  handleUpdate: any;
  isSubmitting: any;
  isLoading: any;
  patients: any;
  populateEditForm: any;
  apiStatus: any;
  setApiStatus: any;
};

const PatientContext = createContext<ContextProps | null>(null);

export function PatientContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const patientService = new PatientService();
  const {
    findUnique,
    Controller,
    control,
    register,
    errors,
    handleOnSubmit,
    handleUpdate,
    isSubmitting,
    populateEditForm,
    isLoading,
    patients,
    apiStatus,
    setApiStatus,
    reset,
  } = usePatientModel(patientService);

  return (
    <PatientContext.Provider
      value={{
        findUnique,
        Controller,
        control,
        register,
        errors,
        handleOnSubmit,
        handleUpdate,
        isSubmitting,
        isLoading,
        patients,
        populateEditForm,
        apiStatus,
        setApiStatus,
        reset,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatientContext() {
  const context = useContext(PatientContext);

  if (!context) {
    throw Error("PatientContext error");
  }

  return context;
}
