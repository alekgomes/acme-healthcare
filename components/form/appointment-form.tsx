import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import Link from "next/link";
import { ErrorMessage } from "@/components/form/error-message";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const AppointmentForm = ({
  Controller,
  control,
  errors,
  handleOnSubmit,
  isLoading,
  apiStatus,
}: any) => {
  return (
    <form onSubmit={handleOnSubmit}>
      <Card className="w-full max-w-xl mt-40">
        <CardHeader>
          <CardTitle>Agendamentos</CardTitle>
          <CardDescription>Agende sua proóxima consulta.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 py-0">
          <div className="grid grid-cols-2 items-center gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Dia e horário</Label>
              <Popover>
                <Controller
                  control={control}
                  name="date"
                  render={({ field: { onChange, onBlur, value } }: any) => (
                    <DateTimePicker
                      placeholder="Escolha dia e horário"
                      granularity="minute"
                      value={value}
                      aria-required
                      onChange={onChange}
                      displayFormat={{ hour24: "dd/MM/yyyy - HH:mm" }}
                    />
                  )}
                />
              </Popover>
              <ErrorMessage errors={errors} fieldName="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, onBlur, value } }: any) => (
                <Textarea
                  id="description"
                  placeholder="Detalhes sobre sua consulta..."
                  rows={4}
                  aria-required
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <ErrorMessage errors={errors} fieldName="description" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
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
          </div>
        </CardContent>
        <CardFooter className="flex justify-between mt-3">
          <Link href="/">
            <Button variant="outline">Cancelar</Button>
          </Link>

          {apiStatus?.status ? (
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando" : "Salvar"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
