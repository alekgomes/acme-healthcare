import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cpfMask } from "@/lib/utils";

type FormQueryProps = {
  filterFn: any;
  Controller: any;
  control: any;
  isLoading: any;
};

export const FormQuery = ({
  filterFn,
  Controller,
  control,
  isLoading,
}: FormQueryProps) => {
  const [formState, setFormState] = useState({
    nome: "",
    cpf: "",
    status: "",
  });

  const onChange = (event: any) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const onValueChange = (value: any) =>
    setFormState({ ...formState, status: value });

  const onSubmit = (event: any) => {
    event.preventDefault();
    filterFn(formState);
  };

  return (
    <form onSubmit={onSubmit}>
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Pacientes</CardTitle>
          <CardDescription>
            Procure pacientes pelo nome, CPF ou status.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome do paciente"
                name="name"
                onChange={onChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Controller
                control={control}
                name="cpf"
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="123.456.789-09"
                    aria-required
                    onChange={(e) => {
                      const { value } = e.target;
                      e.target.value = cpfMask(value);
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" onValueChange={onValueChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filtre por status" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="null">Escolha um status</SelectItem> */}
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Buscando" : "Buscar"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
