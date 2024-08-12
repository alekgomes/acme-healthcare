import { z } from "zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Patient, PatientRegister } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { IPatientService } from "@/app/services/PatientService/IPatienteService";
import { populate } from "@/lib/utils";
import { ApiStatus } from "@/types";

const formSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  dob: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === "invalid_date" ? "Data inválida" : defaultError,
      }),
    })
    .refine((date) => new Date() > date, {
      message: "Você não pode ter nascido no futuro",
    }),
  cpf: z
    .string({ required_error: "Campo obrigatório" })
    .min(11, { message: "CPF inválido" }),
  sex: z.enum(["MASC", "FEM"], { required_error: "Campo obrigatório" }),
  cep: z
    .string({ required_error: "Campo obrigatório" })
    .min(8, { message: "CEP inválido" }),
  city: z.string({ required_error: "Campo obrigatório" }),
  street: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  adressNumber: z
    .string({ required_error: "Campo obrigatório" })
    .min(1, { message: "Campo obrigatório" }),
  status: z.enum(["ACTIVE", "INACTIVE"], {
    required_error: "Campo obrigatório",
  }),
});

export type PatientSchema = z.infer<typeof formSchema>;

export function usePatientModel(service: IPatientService) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    setValue,
    reset,
    clearErrors,
  } = useForm<PatientSchema>({
    resolver: zodResolver(formSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [patients, setPatients] = useState<Patient[] | null>(null);
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    status: null,
    message: null,
  });

  const findUnique = async (query: Partial<Patient>): Promise<Patient[]> => {
    clearErrors();
    setIsLoading(true);
    const { data } = await service.FindByQuery(query);

    setPatients(data.patients);
    setIsLoading(false);
    return data.patients;
  };

  const populateEditForm = (currentPatient: Patient): void => {
    clearErrors();
    Object.entries(currentPatient).map((entry) => populate(entry, setValue));
  };

  const handleUpdate = (ids: Partial<Patient>) =>
    handleSubmit(async (data: PatientSchema) => {
      const res = await service.Update({ ...data, ...ids });
      if (
        res.data.status === "error" &&
        res.data.message.includes("CPF já cadastrado")
      ) {
        setError("cpf", { message: res.data.message });
      } else {
        setApiStatus(res.data);
        console.log("Paciente atualizado com sucesso:", res);
      }

      const { payload } = res.data;
      const newPatients =
        patients?.filter((patient) => patient.id !== payload.id) || [];
      setPatients([...newPatients, payload]);

      return { res };
    });

  const handleOnSubmit = handleSubmit(async (data: PatientSchema) => {
    const res = await service.Create(data);
    if (res.data.status === "error") {
      if (res.data.message.includes("CPF já cadastrado")) {
        setError("cpf", { message: res.data.message });
      }
    } else {
      const { patient } = res.data;
      setPatients((prevState) =>
        prevState ? [...prevState, patient] : [patient]
      );
      setApiStatus(res.data);
      console.log("Paciente criado com sucesso:", res);
    }
  });

  return {
    findUnique,
    register,
    handleOnSubmit,
    errors,
    isSubmitting,
    Controller,
    control,
    handleUpdate,
    populateEditForm,
    isLoading,
    patients,
    apiStatus,
    setApiStatus,
    reset,
  };
}
