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

export const updateAgenda = async (agendaId, data, userRole, userDivisiId) => {
  const agenda = await prisma.agenda.findUnique({
    where: { id_agenda: parseInt(agendaId) },
  });

  if (!agenda) throw new Error("agenda tidak ditemukan!");
  if (!superRole.includes(userRole)) {
    if (agenda.id_divisi !== userDivisiId) {
      throw new Error("Anda tidak berhak mengedit agenda divisi lain!");
    }
  }

  return await prisma.agenda.update({
    where: { id_agenda: parseInt(agendaId) },
    data: {
      judul: data.judul,
      deskripsi: data.deskripsi,
      tanggal: data.tanggal ? new Data(data.tanggal) : undefined,
      lokasi: data.lokasi,
      token_absen: data.token_absen,
      is_absen_open: data.is_absen_open,
      konten_materi: data.konten_materi,
    },
  });
};

export const deleteAgenda = async (agendaId, userRole, userDIvisiId) => {
  const agenda = await prisma.agenda.findUnique({
    where: { id_agenda: parseInt(agendaId) },
  });

  if (!agenda) throw new Error("Agenda tidak ditemukan");
  if (!userRole.include(userRole)) {
    if (agenda.id_divisi !== userDIvisiId) {
      throw new Error("Anda tidak berhak mengghapus agenda divisi lain");
    }
  }

  return await prisma.agenda.delete({
    where: { id_agenda: parseInt(agendaId) },
  });
};

export const kickParticipants = async (absensiId, userRole, userDivisiId) => {
  const absensi = await prisma.absensi.findUnique({
    where: { id_absensi: parseInt(absensiId) },
    include: {
      agenda: true,
    },
  });

  if (!absensi) throw new Error("Data absensi tidak ditemukan!");

  if (!superRole.includes(userRole)) {
    if (absensi.agenda.id_divisi !== userDivisiId) {
      throw new Error("Anda tidak berhak menghapus peserta divisi lain!");
    }
  }

  return await prisma.absensi.delete({
    where: { id_absensi: parseInt(agendaId) },
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
