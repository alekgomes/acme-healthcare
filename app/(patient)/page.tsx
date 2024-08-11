"use client";

import { useEffect } from "react";
import { PatientView } from "./patient.view";
import {
  PatientContextProvider,
  usePatientContext,
} from "@/contexts/patientContext";

export default function Home() {
  const { findUnique, Controller, control, patients, isLoading } =
    usePatientContext();

  return (
    <PatientContextProvider>
      <PatientView
        filterFn={findUnique}
        patients={patients}
        isLoading={isLoading}
        Controller={Controller}
        control={control}
      />
    </PatientContextProvider>
  );
}
