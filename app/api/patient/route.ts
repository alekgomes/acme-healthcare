import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

export function GET() {
  return NextResponse.json({
    test: "test",
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  console.log("POST: ", data);
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
