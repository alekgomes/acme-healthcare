"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cepMask, cpfMask } from "@/lib/utils";

export const ErrorMessage: React.FC<any> = ({ errors, fieldName }) => {
  if (!errors?.hasOwnProperty(fieldName)) return null;

  const error = errors[fieldName];
  const errorMessage = error.message;

  return (
    <div
      aria-live="polite"
      className="mt-2 text-sm text-rose-500 border border-rose-500 bg-rose-500/10 rounded-sm"
    >
      <p className="flex items-center py-1 font-medium rounded-sm">
        {errorMessage}
      </p>
    </div>
  );
};

export default function RegisterView({
  register,
  errors,
  handleOnSubmit,
  Controller,
  control,
  isSubmitting,
}: any) {
  console.log("ERRORS:", errors);
  return (
    <section className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleOnSubmit}>
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              Cadastro de novo paciente
            </CardTitle>
            <CardDescription>
              Cadastro de inforamações do paciente
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-between ">
            <fieldset className="basis-[48%]">
              <legend className="text-muted-foreground text-sm">
                Dados pessoais
              </legend>
              <div className="space-y-2 ">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="João Gomes"
                  {...register("name")}
                  aria-required
                />
                <ErrorMessage errors={errors} fieldName="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Data de nascimento</Label>
                <Input
                  id="dob"
                  type="date"
                  placeholder="Data de nascimento"
                  {...register("dob")}
                  aria-required
                />
                <ErrorMessage errors={errors} fieldName="dob" />
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
                <ErrorMessage errors={errors} fieldName="cpf" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sex">Sexo</Label>
                <Controller
                  control={control}
                  name="sex"
                  render={({ field: { onChange, onBlur, value } }: any) => (
                    <Select onValueChange={onChange} defaultValue={value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sexo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MASC">Masculino</SelectItem>
                        <SelectItem value="FEM">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <ErrorMessage errors={errors} fieldName="sex" />
              </div>
            </fieldset>

            <fieldset id="adress" className="basis-[48%]">
              <legend className="text-muted-foreground text-sm">
                Endereço
              </legend>

              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Controller
                  control={control}
                  name="cep"
                  render={({ field: { onChange, onBlur, value } }: any) => (
                    <Input
                      id="cpf"
                      type="text"
                      placeholder="00000-000"
                      aria-required
                      maxLength={9}
                      onChange={(e) => {
                        const { value } = e.target;
                        e.target.value = cepMask(value);
                        onChange(e);
                      }}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
                <ErrorMessage errors={errors} fieldName="cep" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">CIdade</Label>
                <Input
                  id="city"
                  type="text"
                  {...register("city")}
                  aria-required
                />
                <ErrorMessage errors={errors} fieldName="city" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Logradouro</Label>
                <Input
                  id="street"
                  type="text"
                  {...register("street")}
                  aria-required
                />
                <ErrorMessage errors={errors} fieldName="street" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adressNumber">Número</Label>
                <Input
                  id="adressNumber"
                  type="text"
                  {...register("adressNumber")}
                  placeholder="123"
                  aria-required
                />
                <ErrorMessage errors={errors} fieldName="adressNumber" />
              </div>
            </fieldset>

            <fieldset className=" my-5">
              <legend className="text-muted-foreground text-sm">Status</legend>
              <Label>Define status inicial do paciente</Label>

              <Controller
                control={control}
                name="status"
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <RadioGroup
                    name="status"
                    className="flex mt-2"
                    onValueChange={onChange}
                    defaultValue={value}
                  >
                    <div className="flex items-center space-x-2 ">
                      <RadioGroupItem value="ACTIVE" id="active" />
                      <Label htmlFor="active">Ativo</Label>
                    </div>
                    <div className="flex items-center space-x-2 ">
                      <RadioGroupItem value="INACTIVE" id="inactive" />
                      <Label htmlFor="inactive">Inativo</Label>
                    </div>
                  </RadioGroup>
                )}
              />

              <ErrorMessage errors={errors} fieldName="status" />
            </fieldset>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}
