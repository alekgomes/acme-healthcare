import { AppointmentForm } from "@/components/form/appointment-form";
import { ApiStatus } from "@/types";

type CreateAppointmentViewProps = {
  Controller: any;
  control: any;
  errors: any;
  handleOnSubmit: any;
  isLoading: boolean;
  apiStatus: ApiStatus;
};

export default function CreateAppointmentView({
  Controller,
  control,
  errors,
  handleOnSubmit,
  isLoading,
  apiStatus,
}: CreateAppointmentViewProps) {
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
