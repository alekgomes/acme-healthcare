import { IPatientService } from "@/app/services/PatientService/IPatienteService";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PatientSchema>({
    resolver: zodResolver(formSchema),
  });

  const findUnique = (query: any) => {
    service.FindUnique(query);
  };

  const handleOnSubmit = handleSubmit((data: PatientSchema) => {
    service.Create(data);
  });

  return { findUnique, register, handleOnSubmit, errors, Controller, control };
}
