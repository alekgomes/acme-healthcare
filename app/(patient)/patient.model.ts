import { IPatientService } from "@/app/services/PatientService/IPatienteService";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useEffect, useState } from "react";
import { populate } from "@/lib/utils";

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
  street: z.string({ required_error: "Campo obrigatório" }),
  adressNumber: z.string({ required_error: "Campo obrigatório" }),
  status: z.enum(["ACTIVE", "INACTIVE"], {
    required_error: "Campo obrigatório",
  }),
});

export type PatientSchema = z.infer<typeof formSchema>;

export function usePatientModel(service: IPatientService) {
  const [queryState, setQueryState] = useState<any>({
    isLoadingQuery: false,
    patients: [],
  });

  const [currentPatient, setCurrentPatient] = useState(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    setValue,
  } = useForm<PatientSchema>({
    resolver: zodResolver(formSchema),
  });

  const findUnique = async (query: any) => {
    setQueryState((prevState: any) => ({ ...prevState, isLoadingQuery: true }));
    const { data } = await service.FindUnique(query);
    setQueryState({ patients: data, isLoadingQuery: false });
  };

  const findAndUpdateFormState = async (id: any) => {
    const { data } = await service.FindUnique(id);
    const { patient } = data;
    Object.entries(patient).map((entry) => populate(entry, setValue));
  };

  const updatePacient = async (params: any) => {
    await service.Update(params);
  };

  const handleUpdate = handleSubmit(async (data: any) => {
    const res = await service.Update(data);
    if (res.data.status === "error") {
      if (res.data.message.includes("CPF já cadastrado")) {
        setError("cpf", { message: res.data.message });
      }
    } else {
      console.log("Paciente atualizado com sucesso:", res);
    }
  });

  const handleOnSubmit = handleSubmit(async (data: PatientSchema) => {
    const res = await service.Create(data);
    if (res.data.status === "error") {
      if (res.data.message.includes("CPF já cadastrado")) {
        setError("cpf", { message: res.data.message });
      }
    } else {
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
    queryState,
    findAndUpdateFormState,
    handleUpdate,
  };
}
