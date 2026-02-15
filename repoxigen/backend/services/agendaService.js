import { prisma } from "../lib/prisma.ts";

export const createAgenda = async (data, creatorId) => {
  const { judul, deskripsi, tanggal, lokasi, token_absen, id_divisi } = data;

  const newAgenda = await prisma.agenda.create({
    data: {
      judul,
      deskripsi,
      tanggal: new Date(tanggal),
      lokasi,
      token_absen,
      is_absen_open: true,
      id_divisi: parseInt(id_divisi),
      created_by: creatorId,
    },
  });
};

export const getAllAgenda = async () => {
  return await prisma.agenda.findMany({
    include: {
      divisi: true,
      _count: {
        select: { absensi: true },
      },
    },
    orderBy: { tanggal: "desc" },
  });
};

export const getAgendaPartisipants = async (agendaId) => {
  const agenda = await prisma.agenda.findUnique({
    where: { id_agenda: parseInt(agendaId) },
    include: {
      divisi: true,
      _count: {
        select: { absensi: true },
      },
    },
  });

  if (!agenda) {
    throw new Error("Agenda tidak ditemukan Min...");
  }

  const participants = await prisma.absensi.findMany({
    where: { id_agenda: parseInt(agendaId) },
    include: {
      user: {
        select: {
          nama_lengkap: true,
          nim: true,
          jurusan: true,
          angkatan: true,
        },
      },
    },
    orderBy: { waktu_input: "asc" },
  });

  return {
    detail_agenda: {
      judul: agenda.judul,
      tanggal: agenda.tanggal,
      divisi: agenda.divisi.nama_divisi,
      total_hadir: agenda._count.absensi,
    },
    peserta: participants.map((p) => ({
      nim: p.nim,
      nama: p.user.nama_lengkap,
      jurusan: p.user.jurusan,
      waktu_absen: p.waktu_input,
    })),
  };
};
