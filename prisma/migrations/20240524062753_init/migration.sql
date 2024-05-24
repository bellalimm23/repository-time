-- CreateEnum
CREATE TYPE "AdminStatusEnum" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "ThesisStatusEnum" AS ENUM ('pending', 'reject', 'approve');

-- CreateTable
CREATE TABLE "ProgramStudi" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "nama" TEXT NOT NULL,
    "kode" TEXT NOT NULL,

    CONSTRAINT "ProgramStudi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "nomor_identitas" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "nama_depan" TEXT NOT NULL,
    "nama_tengah" TEXT NOT NULL,
    "nama_belakang" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "AdminStatusEnum" NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("nomor_identitas")
);

-- CreateTable
CREATE TABLE "mahasiswa" (
    "nomor_identitas" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "nama_depan" TEXT NOT NULL,
    "nama_tengah" TEXT NOT NULL,
    "nama_belakang" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "program_studi_id" TEXT NOT NULL,

    CONSTRAINT "mahasiswa_pkey" PRIMARY KEY ("nomor_identitas")
);

-- CreateTable
CREATE TABLE "Organisasi" (
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

    CONSTRAINT "Organisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LampiranOrganisasi" (
    "id" TEXT NOT NULL,
    "organisasi_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "LampiranOrganisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengalaman" (
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

    CONSTRAINT "Pengalaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LampiranPengalaman" (
    "id" TEXT NOT NULL,
    "pengalaman_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "LampiranPengalaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sertifikasi" (
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

    CONSTRAINT "Sertifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LampiranSertifikasi" (
    "id" TEXT NOT NULL,
    "sertifikasi_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "LampiranSertifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pendidikan" (
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

    CONSTRAINT "Pendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LampiranPendidikan" (
    "id" TEXT NOT NULL,
    "pendidikan_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "LampiranPendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TugasAkhir" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_terbit" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "judul_tugas_akhir" TEXT NOT NULL,
    "abstrak" TEXT NOT NULL,
    "status" "ThesisStatusEnum" NOT NULL,
    "nomor_identitas_mahasiswa" TEXT NOT NULL,

    CONSTRAINT "TugasAkhir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LampiranTugasAkhir" (
    "id" TEXT NOT NULL,
    "tugas_akhir_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "LampiranTugasAkhir_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mahasiswa" ADD CONSTRAINT "mahasiswa_program_studi_id_fkey" FOREIGN KEY ("program_studi_id") REFERENCES "ProgramStudi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organisasi" ADD CONSTRAINT "Organisasi_pengalaman_id_fkey" FOREIGN KEY ("pengalaman_id") REFERENCES "Pengalaman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organisasi" ADD CONSTRAINT "Organisasi_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranOrganisasi" ADD CONSTRAINT "LampiranOrganisasi_organisasi_id_fkey" FOREIGN KEY ("organisasi_id") REFERENCES "Organisasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengalaman" ADD CONSTRAINT "Pengalaman_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranPengalaman" ADD CONSTRAINT "LampiranPengalaman_pengalaman_id_fkey" FOREIGN KEY ("pengalaman_id") REFERENCES "Pengalaman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sertifikasi" ADD CONSTRAINT "Sertifikasi_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranSertifikasi" ADD CONSTRAINT "LampiranSertifikasi_sertifikasi_id_fkey" FOREIGN KEY ("sertifikasi_id") REFERENCES "Sertifikasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pendidikan" ADD CONSTRAINT "Pendidikan_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranPendidikan" ADD CONSTRAINT "LampiranPendidikan_pendidikan_id_fkey" FOREIGN KEY ("pendidikan_id") REFERENCES "Pendidikan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TugasAkhir" ADD CONSTRAINT "TugasAkhir_nomor_identitas_mahasiswa_fkey" FOREIGN KEY ("nomor_identitas_mahasiswa") REFERENCES "mahasiswa"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LampiranTugasAkhir" ADD CONSTRAINT "LampiranTugasAkhir_tugas_akhir_id_fkey" FOREIGN KEY ("tugas_akhir_id") REFERENCES "TugasAkhir"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
