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
