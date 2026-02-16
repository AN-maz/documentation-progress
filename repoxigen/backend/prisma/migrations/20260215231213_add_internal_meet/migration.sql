-- CreateTable
CREATE TABLE `intenal_meet` (
    `id_meet` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `lokasi` VARCHAR(191) NULL,
    `token_absen` VARCHAR(10) NOT NULL,
    `is_open` BOOLEAN NOT NULL DEFAULT true,
    `notulensi` LONGTEXT NOT NULL,
    `file_notulensi` VARCHAR(191) NULL,
    `created_by` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_meet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `absensi_internal` (
    `id_absensi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_meet` INTEGER NOT NULL,
    `nim` VARCHAR(191) NOT NULL,
    `waktu_input` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `absensi_internal_id_meet_nim_key`(`id_meet`, `nim`),
    PRIMARY KEY (`id_absensi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `intenal_meet` ADD CONSTRAINT `intenal_meet_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `akun`(`id_akun`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi_internal` ADD CONSTRAINT `absensi_internal_id_meet_fkey` FOREIGN KEY (`id_meet`) REFERENCES `intenal_meet`(`id_meet`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi_internal` ADD CONSTRAINT `absensi_internal_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `users`(`nim`) ON DELETE CASCADE ON UPDATE CASCADE;
