"use client";

import { PatientView } from "./patient.view";
import { usePatientModel } from "./patient.model";
import { PatientService } from "../services/PatientService/PatienteService.service";
import { UserContextProvider } from "@/contexts/patientContext";

export default function Home() {
  const patientService = new PatientService();
  const { findUnique, queryState, Controller, control } =
    usePatientModel(patientService);

  return (
    <UserContextProvider>
      <PatientView
        filterFn={findUnique}
        filteredPatients={queryState}
        Controller={Controller}
        control={control}
      />
    </UserContextProvider>
  );
}
