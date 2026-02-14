import { prisma } from "../lib/prisma.ts";
import bcrypt from "bcrypt";

export const registerUser = async (data) => {
  const { nama_lengkap, nim, jurusan, email, password, kode_divisi, alasan } =
    data;

  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [{ akun: { email: email } }, { nim: nim }],
    },
  });

  if (existingUser) {
    throw new Error("Email atau Nim sudah terdaftar!");
  }

  const divisiTarget = await prisma.divisi.findUnique({
    where: { kode: kode_divisi },
  });

  if (!divisiTarget) {
    throw new Error("Divisi tidak ditemukan!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const newAccount = await tx.akun.create({
        data: {
          email,
          password: hashedPassword,
          role: "user",
        },
      });

      const newUser = await tx.users.create({
        data: {
          nim,
          id_akun: newAccount.id_akun,
          nama_lengkap,
          jurusan,
          angkatan: 2025,
          divisi_peminatan_id: divisiTarget.id_divisi,
          alasan,
          status_keanggotaan: "pending",
        },
      });

      return { account: newAccount, user: newUser };
    });

    return result;
  } catch (err) {
    throw new Error("Gagal registrasi: " + err.message);
  }
};