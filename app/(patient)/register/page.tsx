"use client";
import { useEffect } from "react";
import RegisterView from "./register.view";
import { usePatientContext } from "@/contexts/patientContext";

function RegisterPage() {
  const {
    register,
    errors,
    handleOnSubmit,
    Controller,
    control,
    isSubmitting,
    apiStatus,
    reset,
  } = usePatientContext();

  useEffect(() => {
    reset({
      name: "",
      dob: "",
      cpf: "",
      sex: "",
      cep: "",
      city: "",
      street: "",
      status: "",
      adressNumber: "",
    });
  }, []);

  return (
    <RegisterView
      register={register}
      errors={errors}
      handleOnSubmit={handleOnSubmit}
      Controller={Controller}
      control={control}
      isSubmitting={isSubmitting}
      apiStatus={apiStatus}
    />
  );
}

export default RegisterPage;
