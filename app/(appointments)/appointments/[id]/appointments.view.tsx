"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { calcAge, dateFormatter } from "@/lib/utils";
import { Patient, PatientRegister } from "@prisma/client";
import Link from "next/link";

type PatientViewProps = {
  getAppointments: any;
  params: any;
  isLoading: boolean;
  patient: Patient;
  Controller: any;
  control: any;
  errors: any;
};

export function AppointmentsView({
  getAppointments,
  params,
  isLoading,
}: PatientViewProps) {
  const [patient, setPatient] = useState<any>({});

  useEffect(() => {
    const fetch = async () => {
      const res = await getAppointments(params);
      setPatient(res);
    };

    fetch();
  }, []);

  if (!patient) return;

  if (isLoading) {
    return <p className="mt-36 text-center">Carregando...</p>;
  }

  return (
    <section className="flex flex-col items-center pt-36">
      <div className="w-full max-w-4xl mx-auto p-6 md:p-8 lg:p-10">
        <div className="grid gap-6 md:gap-8 lg:gap-10">
          <div className="bg-card p-4 md:p-6 lg:p-8 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 md:gap-6">
              <Avatar className="h-16 w-16 md:h-20 md:w-20">
                <AvatarImage src="/placeholder-user.jpg" alt="Patient Avatar" />
                <AvatarFallback>{patient?.name?.split("")[0]}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="text-xl md:text-2xl font-bold">
                  {patient.name}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div>
                    Status:{" "}
                    <span className="font-medium">{patient.status}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div>
                    Sexo: <span className="font-medium">{patient.sex}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div>
                    Idade:{" "}
                    <span className="font-medium">{calcAge(patient.dob)}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="ml-auto">
                Editar
              </Button>
            </div>
          </div>
          <div className="bg-card p-4 md:p-6 lg:p-8 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold">
                Histórico de consultas
              </h2>
              <div className="flex items-center gap-4">
                <Link href={`/appointments/${patient.id}/create`}>
                  <Button size="sm">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Nova Consulta
                  </Button>
                </Link>
              </div>
            </div>
            <div className="grid gap-4 md:gap-6">
              {patient?.registers?.length > 0 ? (
                patient?.registers?.map((register: any, idx: number) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6 p-4 md:p-6 bg-muted rounded-md"
                  >
                    <div className="text-sm md:text-base font-medium">
                      {dateFormatter(register.date)}
                    </div>
                    <div>
                      <div className="text-sm md:text-base font-medium">
                        Routine Check-up
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {register.description}
                      </div>
                    </div>
                    <div className="text-sm md:text-base font-medium text-muted-foreground">
                      {register.status}
                      <Link href={`/appointments/${register.id}/update`}>
                        <Button variant="outline" size="sm" className="ml-4">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-36 text-center">
                  Paciente sem registro de consuta.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
