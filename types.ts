import { Patient, PatientRegister } from "@prisma/client";

export type ApiStatus = {
  status: "success" | "error" | null;
  message: {
    title: string;
    description?: string;
  } | null;
  payload?: Patient | PatientRegister;
};
