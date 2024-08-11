"use client";

import { usePatientModel } from "@/app/(patient)/patient.model";
import { PatientService } from "@/app/services/PatientService/PatienteService.service";
import { createContext, useContext, useState } from "react";

const PatientContext = createContext(null);

export function PatientContextProvider({ children }) {
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
