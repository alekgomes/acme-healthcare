import { FormQuery } from "@/components/form/form-query";
import PacientsList from "@/components/pacient-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    <section className="flex flex-col items-center pt-36">
      <Link href="/register">
        <Button>Cadastrar novo paciente</Button>
      </Link>
      <p>ou</p>
      <p>Pesquise por um paciente já cadastrado:</p>
      <FormQuery
        filterFn={filterFn}
        Controller={Controller}
        control={control}
        isLoading={isLoading}
      />
      <PacientsList patients={patients} />
    </section>
  );
}
