"use client";

import { useEffect } from "react";
import { PatientView } from "./patient.view";
import { usePatientContext } from "@/contexts/patientContext";

export default function Home() {
  const { findUnique, Controller, control, patients, isLoading, setApiStatus } =
    usePatientContext();

  useEffect(() => {
    setApiStatus({ status: null, message: null });
  }, []);

  return (
    <PatientView
      filterFn={findUnique}
      patients={patients}
      isLoading={isLoading}
      Controller={Controller}
      control={control}
    />
  );
}
