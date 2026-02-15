import { prisma } from "../lib/prisma.ts";

const superRole = ["super_admin"];

export const createAgenda = async (
  data,
  creatorId,
  userRole,
  userIDivisiId,
) => {
  const { judul, deskripsi, tanggal, lokasi, token_absen, id_divisi } = data;

  let targetDivisi = parseInt(id_divisi);
  // const superRole = ["super_admin"];

  if (!superRole.includes(userRole)) {
    if (!userIDivisiId) throw new Error("Kamu ga punya akses hak divisi!");
    targetDivisi = userIDivisiId;
  }

  const newAgenda = await prisma.agenda.create({
    data: {
      judul,
      deskripsi,
      tanggal: new Date(tanggal),
      lokasi,
      token_absen,
      is_absen_open: true,
      id_divisi: targetDivisi,
      created_by: creatorId,
    },
  });
};

export const getAllAgenda = async (userRole, userDivisiId, userId) => {
  let whereClause = {};


  // SKENARIO 1: Admin Divisi (Cuma lihat divisinya)
  if (userRole === "admin_divisi") {
    if (!userDivisiId) return [];
    whereClause = { id_divisi: userDivisiId };
  }

  // SKENARIO 2: User Biasa/Member (Cuma lihat divisinya)
  else if (userRole === "user") {
    const userProfile = await prisma.users.findUnique({
      where: { id_akun: userId },
      select: { divisi_peminatan_id: true },
    });

    if (!userProfile || !userProfile.divisi_peminatan_id) return [];

    whereClause = { id_divisi: userProfile.divisi_peminatan_id };
  }

  // SKENARIO 3: Super Admin (Lihat Semua - whereClause tetap kosong)
  return await prisma.agenda.findMany({
    where: whereClause,
    include: {
      divisi: true,
      _count: {
        select: { absensi: true },
      },
    },
    orderBy: { tanggal: "desc" },
  });
};

export const getAgendaPartisipants = async (
  agendaId,
  userRole,
  userDivisiId,
) => {
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

  if (!superRole.includes(userRole) && agenda.id_divisi !== userDivisiId) {
    throw new Error("Dilarang mengintip agenda divisi lain Kak!");
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
