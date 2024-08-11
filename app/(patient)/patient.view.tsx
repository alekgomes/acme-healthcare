import { FormQuery } from "@/components/form/form-query";
import PacientsList from "@/components/pacient-list";

type PatientViewProps = {
  filterFn: (query: any) => void;
  filteredPatients: any;
  Controller: any;
  control: any;
};

export function PatientView({
  filterFn,
  filteredPatients,
  Controller,
  control,
}: PatientViewProps) {
  const { isLoadingQuery, patients } = filteredPatients;

  return (
    <main className="flex flex-col items-center">
      <FormQuery
        filterFn={filterFn}
        Controller={Controller}
        control={control}
        isLoading={isLoadingQuery}
      />
      <PacientsList filteredPatients={patients} />
    </main>
  );
}
