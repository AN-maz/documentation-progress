import { prisma } from "./lib/prisma"; // Pastikan path ini benar sesuai struktur foldermu
import { Faker, id_ID, en, base } from "@faker-js/faker";
import bcrypt from "bcrypt";

const faker = new Faker({
  locale: [id_ID, en, base],
});

async function main() {
  console.log("🌱 Memulai proses seeding data dummy...");

  const defaultPassword = await bcrypt.hash("password123", 10);

  const listJurusan = [
    "Teknik Informatika",
    "Teknik Industri",
    "Desain Komunikasi Visual",
    "Bisnis Digital",
    "Manajemen Retail",
  ];

  // 3. Loop untuk membuat 30 User
  for (let i = 0; i < 30; i++) {
    // Generate Nama & Email
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet
      .email({ firstName, lastName, provider: "oxigen.ac.id" })
      .toLowerCase();

    const isApproved = faker.datatype.boolean();
    const statusKeanggotaan = isApproved
      ? faker.helpers.arrayElement(["aktif", "pasif"])
      : "pending";

    // A. Buat Akun Dulu
    const akun = await prisma.akun.create({
      data: {
        email: email,
        password: defaultPassword,
        role: "user", // Default role user
        is_approved: isApproved,
      },
    });

    await prisma.users.create({
      data: {
        id_akun: akun.id_akun,
        nim: faker.string.numeric(12),
        nama_lengkap: `${firstName} ${lastName}`,
        jurusan: faker.helpers.arrayElement(listJurusan),
        angkatan: faker.helpers.arrayElement([2024, 2025]),
        status_keanggotaan: statusKeanggotaan,
        divisi_peminatan_id: faker.helpers.arrayElement([2, 3, 4]),
        alasan: `Saya ingin bergabung UKM OXIGEN untuk mengembangkan kemampuan di bidang ${faker.helpers.arrayElement(['teknologi', 'organisasi', 'kepemimpinan', 'problem solving'])}.`,
      },
    });
  }

  console.log("✅ Seeding selesai! 30 Data user berhasil dibuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
