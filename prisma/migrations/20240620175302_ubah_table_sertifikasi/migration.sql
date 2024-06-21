/*
  Warnings:

  - Added the required column `nama_institusi` to the `sertifikasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sertifikasi" ADD COLUMN     "nama_institusi" TEXT NOT NULL;
