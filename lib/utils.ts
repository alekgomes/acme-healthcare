import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};


export const cepMask = (value: string) => {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
};

export const calcAge = (dob: any) => {
  const hoje = new Date();
  const nascimento = new Date(dob);

  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  // Se o aniversário ainda não ocorreu este ano, subtrai 1 da idade
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }

  return idade;
};

export const sexEnums = (sex: string): string => {
  if (sex == "MASC") return "Masculino";
  if (sex == "FEM") return "Feminino";
  return "";
};

export const populate = (entry: any, cb: any) => {
  if (Object.entries(entry[1]).length > 1) {
    Object.entries(entry[1]).map((entry) => populate(entry, cb));
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  if (dateRegex.test(entry[1])) {
    cb(entry[0], new Date(entry[1]).toISOString().split("T")[0]);
  } else {
    cb(entry[0], entry[1]);
  }
};

export const dateFormatter = (dateString: Date) => {
  return new Date(dateString).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
