import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useEffect, useState } from "react";

import { Patient, PatientRegister } from "@prisma/client";

import { IAppointmentService } from "@/app/services/AppointmentService/IAppointmentService";

const formSchema = z.object({
  date: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === "invalid_date" ? "Data inválida" : defaultError,
      }),
    })
    .refine((date) => new Date() > date, {
      message: "Proibido datas futuras",
    }),
  description: z.string({ required_error: "Campo obrigatório" }),
  status: z.enum(["ACTIVE", "INACTIVE", ""], {
    required_error: "Campo obrigatório",
  }),
});

export type AppointmentSchema = z.infer<typeof formSchema>;

export function useAppointmentModel(service: IAppointmentService) {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    reset,
  } = useForm<AppointmentSchema>({
    resolver: zodResolver(formSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [apiStatus, setApiStatus] = useState({ status: null, message: null });

  useEffect(() => {
    setApiStatus({ status: null, message: null });
  }, []);

  const getAppointments = async (
    patientId: Partial<Patient>
  ): Promise<PatientRegister[]> => {
    setIsLoading(true);
    const { data } = await service.GetAll(patientId);
    setIsLoading(false);
    setPatient(data.patient);
    setApiStatus({ status: null, message: null });

    return data.patient;
  };

  const handleOnSubmit = ({ id }: Partial<Patient>) =>
    handleSubmit(async (formData: AppointmentSchema) => {
      setIsLoading(true);
      const { data } = await service.Create({ ...formData, pacientId: id });
      if (data.status == "success") {
        reset({ date: undefined, description: "", status: "" });
      }
      setIsLoading(false);
      setApiStatus(data);
      return data;
    });

  const populateEditForm = (appointment: PatientRegister) => {
    setValue("date", appointment.date);
    setValue("description", appointment.description);
    setValue("status", appointment.status);
  };

  const handleUpdate = ({ id }: Partial<Patient>) =>
    handleSubmit(async (formData: AppointmentSchema) => {
      setIsLoading(true);
      const { data } = await service.Update({ ...formData, registerId: id });
      setIsLoading(false);
      setApiStatus(data);
      return data;
    });

  return {
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
  };
}
