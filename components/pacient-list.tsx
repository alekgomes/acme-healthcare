import { Button } from "@/components/ui/button";
import { calcAge, sexEnums } from "@/lib/utils";
import Link from "next/link";

type PacientsListProps = {
  patients: any;
};

export default function PacientsList({ patients }: PacientsListProps) {
  if (patients?.length == 0) {
    return <p>Nenhum resultado para essa busca...</p>;
  }
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {patients?.map((patient: any) => {
          return (
            <div key={patient.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">{patient.name}</h3>
                <div className="flex gap-2">
                  <Link href={`/update/${patient.id}`}>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </Link>
                  <Link href={`/appointments/${patient.id}`}>
                    <Button variant="outline" size="sm">
                      Consultas
                    </Button>
                  </Link>
                </div>
              </div>
              <p className="text-muted-foreground">
                Age: {calcAge(patient.dob)}
              </p>
              <p className="text-muted-foreground">
                Gender: {sexEnums(patient.sex)}
              </p>
              <p className="text-muted-foreground lowercase">
                Status: {patient.status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
