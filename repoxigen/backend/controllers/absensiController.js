import { prisma } from "../lib/prisma.ts";

export const submitAbsensi = async (req, res) => {
  try {
    const { id_agenda, token_input } = req.body;
    const userNim = req.user.nim;

    const agenda = await prisma.agenda.findUnique({
      where: { id_agenda: parseInt(id_agenda) },
    });

    if (!agenda) {
      return res
        .status(404)
        .json({ status: false, message: "Agenda tidak ditemukan" });
    }

    if (!agenda.is_absen_open) {
      return res
        .status(400)
        .json({ status: false, message: "Absensi sudah ditutup euy!" });
    }

    if (agenda.token_absen !== token_input) {
      return res
        .status(400)
        .json({ status: false, message: "Token absensi salah Euy" });
    }

    const existingAbsensi = await prisma.absensi.findFirst({
      where: {
        id_agenda: parseInt(id_agenda),
        nim: userNim,
      },
    });

    if (existingAbsensi) {
      return res
        .status(400)
        .json({ status: false, message: "Kamu sudah absen sebelumnya!" });
    }

    const absensiBaru = await prisma.absensi.create({
      data: {
        id_agenda: parseInt(id_agenda),
        nim: userNim,
        status: "hadir",
        waktu_input: new Date(),
      },
    });

    res.status(200).json({
      status: true,
      message: "Absensi berhasil dicatat! Omke Gas belajarnya ya",
      data: absensiBaru,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
