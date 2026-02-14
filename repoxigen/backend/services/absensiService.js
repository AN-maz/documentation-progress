import { prisma } from "../lib/prisma.ts";

export const submitAbsensi = async (id_agenda, token_input, userNim) => {
  const agenda = await prisma.agenda.findUnique({
    where: { id_agenda: parseInt(id_agenda) },
  });

  if (!agenda) {
    throw new Error("Agenda tidak ditemukan");
  }

  if (!agenda.is_absen_open) {
    throw new Error("Absensi sudah ditutup euy!");
  }

  if (agenda.token_absen !== token_input) {
    throw new Error("Token absensi salah Euy");
  }

  const existingAbsensi = await prisma.absensi.findFirst({
    where: {
      id_agenda: parseInt(id_agenda),
      nim: userNim,
    },
  });

  if (existingAbsensi) {
    throw new Error("Kamu sudah absen sebelumnya!");
  }

  return await prisma.absensi.create({
    data: {
      id_agenda: parseInt(id_agenda),
      nim: userNim,
      status: "hadir",
      waktu_input: new Date(),
    },
  });
};
