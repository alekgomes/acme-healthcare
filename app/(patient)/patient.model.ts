import { IPatientService } from "@/app/services/PatientService/IPatienteService";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useState } from "react";
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

const defaultFields = {
  name: "",
  dob: "",
  cpf: "",
  sex: "",
  cep: "",
  city: "",
  street: "",
  adressNumber: "",
};

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
  } = useForm<PatientSchema>({
    resolver: zodResolver(formSchema),
  });

  const [isLoading, setIsLoading] = useState<any>(false);
  const [patients, setPatients] = useState<any[] | null>(null);
  const [apiStatus, setApiStatus] = useState({ status: null, message: null });

  const findUnique = async (query: any) => {
    setIsLoading(true);
    const { data } = await service.FindByQuery(query);

    setPatients(data.patients);
    setIsLoading(false);
    return data.patients;
  };

  const populateEditForm = (currentPatient: any) => {
    Object.entries(currentPatient).map((entry) => populate(entry, setValue));
  };

  const handleUpdate = (ids: any) =>
    handleSubmit(async (data: any) => {
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

      const { updatedUser } = res.data;
      const newPatients = patients?.filter(
        (patient) => patient.id !== updatedUser.id
      );
      setPatients([...newPatients, updatedUser]);

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
      reset(defaultFields);
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
  };
}

