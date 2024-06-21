/*
  Warnings:

  - You are about to drop the `LampiranOrganisasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LampiranPendidikan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LampiranPengalaman` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LampiranSertifikasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LampiranTugasAkhir` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organisasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pendidikan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pengalaman` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sertifikasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TugasAkhir` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LampiranOrganisasi" DROP CONSTRAINT "LampiranOrganisasi_organisasi_id_fkey";

-- DropForeignKey
ALTER TABLE "LampiranPendidikan" DROP CONSTRAINT "LampiranPendidikan_pendidikan_id_fkey";

-- DropForeignKey
ALTER TABLE "LampiranPengalaman" DROP CONSTRAINT "LampiranPengalaman_pengalaman_id_fkey";

-- DropForeignKey
ALTER TABLE "LampiranSertifikasi" DROP CONSTRAINT "LampiranSertifikasi_sertifikasi_id_fkey";

-- DropForeignKey
ALTER TABLE "LampiranTugasAkhir" DROP CONSTRAINT "LampiranTugasAkhir_tugas_akhir_id_fkey";

-- DropForeignKey
ALTER TABLE "Organisasi" DROP CONSTRAINT "Organisasi_nomor_identitas_mahasiswa_fkey";

-- DropForeignKey
ALTER TABLE "Organisasi" DROP CONSTRAINT "Organisasi_pengalaman_id_fkey";

-- DropForeignKey
ALTER TABLE "Pendidikan" DROP CONSTRAINT "Pendidikan_nomor_identitas_mahasiswa_fkey";

-- DropForeignKey
ALTER TABLE "Pengalaman" DROP CONSTRAINT "Pengalaman_nomor_identitas_mahasiswa_fkey";

-- DropForeignKey
ALTER TABLE "Sertifikasi" DROP CONSTRAINT "Sertifikasi_nomor_identitas_mahasiswa_fkey";

-- DropForeignKey
ALTER TABLE "TugasAkhir" DROP CONSTRAINT "TugasAkhir_nomor_identitas_mahasiswa_fkey";

-- DropTable
DROP TABLE "LampiranOrganisasi";

-- DropTable
DROP TABLE "LampiranPendidikan";

-- DropTable
DROP TABLE "LampiranPengalaman";

-- DropTable
DROP TABLE "LampiranSertifikasi";

-- DropTable
DROP TABLE "LampiranTugasAkhir";

-- DropTable
DROP TABLE "Organisasi";

-- DropTable
DROP TABLE "Pendidikan";

-- DropTable
DROP TABLE "Pengalaman";

-- DropTable
DROP TABLE "Sertifikasi";

-- DropTable
DROP TABLE "TugasAkhir";

-- CreateTable
CREATE TABLE "organisasi" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_mulai" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_selesai" TIMESTAMPTZ(6),
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "posisi" TEXT NOT NULL,
    "pengalaman_id" TEXT,
    "nomor_identitas_mahasiswa" TEXT NOT NULL,

    CONSTRAINT "organisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_organisasi" (
    "id" TEXT NOT NULL,
    "organisasi_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_organisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengalaman" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_mulai" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_selesai" TIMESTAMPTZ(6),
    "posisi" TEXT NOT NULL,
    "nama_perusahaan" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "nomor_identitas_mahasiswa" TEXT NOT NULL,

    CONSTRAINT "pengalaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_pengalaman" (
    "id" TEXT NOT NULL,
    "pengalaman_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_pengalaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sertifikasi" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_terbit" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_kadaluarsa" TIMESTAMPTZ(6),
    "nama_sertifikasi" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "nilai_akhir" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "nomor_identitas_mahasiswa" TEXT NOT NULL,

    CONSTRAINT "sertifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_sertifikasi" (
    "id" TEXT NOT NULL,
    "sertifikasi_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_sertifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendidikan" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_mulai" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_selesai" TIMESTAMPTZ(6),
    "nama_institusi" TEXT NOT NULL,
    "gelar" TEXT NOT NULL,
    "bidang_studi" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "nilai_akhir" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "nomor_identitas_mahasiswa" TEXT NOT NULL,

    CONSTRAINT "pendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_pendidikan" (
    "id" TEXT NOT NULL,
    "pendidikan_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_pendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tugas_akhir" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_terbit" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "judul_tugas_akhir" TEXT NOT NULL,
    "abstrak" TEXT NOT NULL,
    "status" "ThesisStatusEnum" NOT NULL,
    "nomor_identitas_mahasiswa" TEXT NOT NULL,

    CONSTRAINT "tugas_akhir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_tugas_akhir" (
    "id" TEXT NOT NULL,
    "tugas_akhir_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_tugas_akhir_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "organisasi" ADD CONSTRAINT "organisasi_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organisasi" ADD CONSTRAINT "organisasi_pengalaman_id_fkey" FOREIGN KEY ("pengalaman_id") REFERENCES "pengalaman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_organisasi" ADD CONSTRAINT "lampiran_organisasi_organisasi_id_fkey" FOREIGN KEY ("organisasi_id") REFERENCES "organisasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengalaman" ADD CONSTRAINT "pengalaman_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_pengalaman" ADD CONSTRAINT "lampiran_pengalaman_pengalaman_id_fkey" FOREIGN KEY ("pengalaman_id") REFERENCES "pengalaman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sertifikasi" ADD CONSTRAINT "sertifikasi_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_sertifikasi" ADD CONSTRAINT "lampiran_sertifikasi_sertifikasi_id_fkey" FOREIGN KEY ("sertifikasi_id") REFERENCES "sertifikasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendidikan" ADD CONSTRAINT "pendidikan_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_pendidikan" ADD CONSTRAINT "lampiran_pendidikan_pendidikan_id_fkey" FOREIGN KEY ("pendidikan_id") REFERENCES "pendidikan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tugas_akhir" ADD CONSTRAINT "tugas_akhir_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_tugas_akhir" ADD CONSTRAINT "lampiran_tugas_akhir_tugas_akhir_id_fkey" FOREIGN KEY ("tugas_akhir_id") REFERENCES "tugas_akhir"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
