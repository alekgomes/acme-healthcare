import { IPatientService } from "@/app/services/PatientService/IPatienteService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  dob: z.string({ required_error: "Campo obrigatório" }).date(),
  cpf: z
    .string({ required_error: "Campo obrigatório" })
    .min(11, { message: "CPF inválido" }),
  sex: z.enum(["masc", "fem"], { required_error: "Campo obrigatório" }),
  cep: z
    .string({ required_error: "Campo obrigatório" })
    .min(8, { message: "CEP inválido" }),
  street: z.string({ required_error: "Campo obrigatório" }),
  adressNumber: z.string({ required_error: "Campo obrigatório" }),
  status: z.enum(["active", "inactive"], {
    required_error: "Campo obrigatório",
  }),
});

export type Schema = z.infer<typeof formSchema>;

export function usePatientModel(service: IPatientService) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(formSchema),
  });

  const createNewPatient = (formData: FormData) => {
    service.Create(formData);
  };

  const findUnique = (query: any) => {
    service.FindUnique(query);
  };

  const handleOnSubmit = handleSubmit((data) => console.log(data));

  return { createNewPatient, findUnique, register, handleOnSubmit, errors };
}
