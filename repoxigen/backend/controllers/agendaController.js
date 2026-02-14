import { prisma } from "../lib/prisma.ts";

export const createAgenda = async (req, res) => {
  try {
    const { judul, deskripsi, tanggal, lokasi, token_absen, id_divisi } =
      req.body;
    const creatorId = req.user.id_akun;

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

    res.status(201).json({
      status: true,
      message: "Agenda berhasil dibuat",
      data: newAgenda,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

export const getAllAgenda = async (req, res) => {
  try {
    const agendas = await prisma.agenda.findMany({
      include: {
        divisi: true,
        _count: {
          select: { absensi: true },
        },
      },
      orderBy: { tanggal: "desc" },
    });

    res.status(200).json({
      status: true,
      message: "List agenda berhasil dimuat",
      data: agendas,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
