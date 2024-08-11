import { FormQuery } from "@/components/form/form-query";
import PacientsList from "@/components/pacient-list";

type PatientViewProps = {
  filterFn: (query: any) => void;
  patients: any;
  Controller: any;
  control: any;
  isLoading: boolean;
};

export function PatientView({
  filterFn,
  patients,
  Controller,
  control,
  isLoading,
}: PatientViewProps) {
  return (
    <main className="flex flex-col items-center">
      <FormQuery
        filterFn={filterFn}
        Controller={Controller}
        control={control}
        isLoading={isLoading}
      />
      <PacientsList patients={patients} />
    </main>
  );
}
