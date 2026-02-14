/*
  Warnings:

  - You are about to drop the column `no_wa` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `no_wa`,
    ADD COLUMN `alasan` TEXT NULL;
