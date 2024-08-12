import { AppointmentForm } from "@/components/form/appointment-form";

export default function UpdateAppointmentView({
  Controller,
  control,
  errors,
  handleOnSubmit,
  apiStatus,
  isLoading,
}: any) {
  return (
    <section className="flex justify-center items-center">
      <AppointmentForm
        Controller={Controller}
        control={control}
        errors={errors}
        handleOnSubmit={handleOnSubmit}
        apiStatus={apiStatus}
        isLoading={isLoading}
      />
    </section>
  );
}
