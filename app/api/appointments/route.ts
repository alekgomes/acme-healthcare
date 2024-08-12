import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const patientId = Number(searchParams.get("id"));

  try {
    const patientWithRegisters = await db.patient.findUnique({
      where: {
        id: patientId,
      },
      include: {
        registers: true,
      },
    });

    if (!patientWithRegisters) {
      return NextResponse.json(
        { message: "Paciente não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ patient: patientWithRegisters });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error retrieving patient registers" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const dateToSave = new Date(data.date);
  const id = Number(data.pacientId);
  try {
    const newPatientRegister = await db.patientRegister.create({
      data: {
        date: dateToSave,
        description: data.description,
        status: data.status,
        patient: {
          connect: {
            id,
          },
        },
      },
    });

    return NextResponse.json({
      status: "success",
      message: {
        title: "Registrado com sucesso!",
        description: "Um novo registro foi adicionado",
      },
      payload: newPatientRegister,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: "error",
      message: {
        title: "Oops!",
        description: "Ocorreu um erro ao criar o registro",
      },
      payload: error,
    });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();

  const registerId = Number(data.registerId); // ID do registro que você deseja atualizar
  const dateToUpdate = new Date(data.date);

  try {
    const updatedPatientRegister = await db.patientRegister.update({
      where: { id: registerId },
      data: {
        date: dateToUpdate,
        description: data.description,
        status: data.status,
      },
    });

    return NextResponse.json({
      status: "success",
      message: {
        title: "Registro atualizado com sucesso!",
        description: "O registro foi atualizado com os novos dados.",
      },
      payload: updatedPatientRegister,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: "error",
      message: {
        title: "Oops!",
        description: "Ocorreu um erro ao atualizar o registro.",
      },
      payload: error,
    });
  }
}
