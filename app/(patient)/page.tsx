"use client";

import { PatientView } from "./patient.view";
import { usePatientModel } from "./patient.model";
import { PatientService } from "../services/PatientService/PatienteService.service";

export default function Home() {
  const patientService = new PatientService();
  const { findUnique } = usePatientModel(patientService);

  return <PatientView filterFn={findUnique} />;
}
