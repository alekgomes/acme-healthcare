"use client";

import { PacientForm } from "@/components/form/register";

export default function UpdateView({
  register,
  errors,
  handleUpdate,
  Controller,
  control,
  isSubmitting,
}: any) {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <PacientForm
        register={register}
        errors={errors}
        handleOnSubmit={handleUpdate}
        Controller={Controller}
        control={control}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}
