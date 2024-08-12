import { AppointmentForm } from "@/components/form/appointment-form";

export default function CreateAppointmentView({
  Controller,
  control,
  errors,
  handleOnSubmit,
  isLoading,
  apiStatus,
}: any) {
  return (
    <section className="flex justify-center items-center ">
      <AppointmentForm
        Controller={Controller}
        control={control}
        errors={errors}
        handleOnSubmit={handleOnSubmit}
        isLoading={isLoading}
        apiStatus={apiStatus}
      />
    </section>
  );
}
