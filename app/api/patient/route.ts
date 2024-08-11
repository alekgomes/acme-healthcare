import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { Status } from "@prisma/client"; // Importando o enum Status

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);

  const cpf = searchParams.get("cpf") || undefined;
  const name = searchParams.get("name") || undefined;
  const status = searchParams.get("status") as Status | undefined;
  const id = Number(searchParams.get("id")) || undefined;

  // Se possuir id, retornar único paciente
  if (id) {
    try {
      const patients = await db.patient.findUnique({
        where: { id: id },
        include: {
          address: true,
        },
      });

      console.log(patients);
      return NextResponse.json({ patient: patients });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        {
          status: "error",
          message: "Erro ao pesquisar paciente",
        },
        { status: 500 }
      );
    }
  }

  // Criar um objeto de condições para o filtro dinamicamente
  const conditions = {};

  if (cpf) {
    Object.assign(conditions, { cpf: { contains: cpf } });
  }

  if (name) {
    Object.assign(conditions, {
      name: { contains: name, mode: "insensitive" },
    });
  }

  if (status) {
    Object.assign(conditions, { status: { equals: status } });
  }

  console.log(conditions);

  try {
    const patients = await db.patient.findMany({
      where: conditions,
      include: {
        address: true,
      },
    });

    console.log(patients);

    return NextResponse.json({ patients: patients });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: "error",
        message: "Erro ao pesquisar paciente",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    const newPatient = await db.patient.create({
      data: {
        name: data.name,
        dob: data.dob,
        cpf: data.cpf,
        sex: data.sex,
        status: data.status,
        address: {
          create: {
            cep: data.cep,
            city: data.city,
            street: data.street,
            adressNumber: data.adressNumber,
          },
        },
      },
    });

    return NextResponse.json({
      patient: newPatient,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const target = (error.meta?.target as string[]) ?? undefined;
      if (error.code === "P2002" && target.includes("cpf")) {
        return NextResponse.json(
          {
            status: "error",
            message: "CPF já cadastrado.",
          },
          { status: 409 }
        );
      }
    }

    console.log({ error });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const updatedUser = await db.patient.update({
    where: {
      id: data.id,
    },

    data: {
      name: data.name,
      dob: data.dob,
      cpf: data.cpf,
      sex: data.sex,
      status: data.status,
      address: {
        update: {
          where: {
            id: data.addressId,
          },
          data: {
            cep: data.cep,
            city: data.city,
            street: data.street,
            adressNumber: data.adressNumber,
          },
        },
      },
    },
  });

  console.log(updatedUser);
  return NextResponse.json({ updatedUser });
}
