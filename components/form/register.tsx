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
import { ErrorMessage } from "./error-message";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type PacientFormProps = {
  handleOnSubmit: any;
  register: any;
  errors: any;
  control: any;
  Controller: any;
  isSubmitting: any;
  apiStatus: any;
};

export const PacientForm = ({
  handleOnSubmit,
  errors,
  control,
  Controller,
  isSubmitting,
  apiStatus,
}: PacientFormProps) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Cadastro de novo paciente</CardTitle>
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

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Input
                    id="name"
                    type="text"
                    placeholder="João Gomes"
                    aria-required
                    value={value}
                    onChange={onChange}
                  />
                )}
              />

              <ErrorMessage errors={errors} fieldName="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Data de nascimento</Label>
              <Controller
                control={control}
                name="dob"
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Input
                    id="dob"
                    type="date"
                    placeholder="Data de nascimento"
                    aria-required
                    value={value}
                    onChange={onChange}
                  />
                )}
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
                  <Select onValueChange={onChange} value={value} name="sex">
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
            <legend className="text-muted-foreground text-sm">Endereço</legend>

            <div className="space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Controller
                control={control}
                name="cep"
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Input
                    id="cep"
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
              <Label htmlFor="city">Cidade</Label>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Input
                    id="city"
                    type="text"
                    aria-required
                    placeholder="São Paulo"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <ErrorMessage errors={errors} fieldName="city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="street">Logradouro</Label>
              <Controller
                control={control}
                name="street"
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Input
                    id="street"
                    type="text"
                    placeholder="Rua das Flores"
                    aria-required
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
              <ErrorMessage errors={errors} fieldName="street" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adressNumber">Número</Label>
              <Controller
                control={control}
                name="adressNumber"
                render={({ field: { onChange, onBlur, value } }: any) => (
                  <Input
                    id="adressNumber"
                    type="text"
                    placeholder="123"
                    aria-required
                    value={value}
                    onChange={onChange}
                  />
                )}
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
                  value={value}
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
          {apiStatus.status ? (
            <Alert
              className=""
              variant={`${
                apiStatus.status == "error" ? "destructive" : "creation"
              }`}
            >
              <AlertTitle>{apiStatus.message?.title}</AlertTitle>
              <AlertDescription>
                {apiStatus.message?.description}
              </AlertDescription>
            </Alert>
          ) : null}

          <Button className="w-full mt-3" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
