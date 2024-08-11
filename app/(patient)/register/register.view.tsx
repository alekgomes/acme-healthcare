"use client";

import { PacientForm } from "@/components/form/register";
import { Button } from "@/components/ui/button";

export default function RegisterView({
  register,
  errors,
  handleOnSubmit,
  Controller,
  control,
  isSubmitting,
  apiStatus,
}: any) {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <PacientForm
        register={register}
        errors={errors}
        handleOnSubmit={handleOnSubmit}
        Controller={Controller}
        control={control}
        isSubmitting={isSubmitting}
        apiStatus={apiStatus}
      />
    </section>
  );
}
