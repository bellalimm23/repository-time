export const AdminResouceModel = {
  deskripsi: true,
  namaBelakang: true,
  namaDepan: true,
  namaTengah: true,
  nomorIdentitas: true,
  password: true,
  photoUrl: true,
  status: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};
export const AdminResouceLiteModel = {
  deskripsi: true,
  namaBelakang: true,
  namaDepan: true,
  namaTengah: true,
  nomorIdentitas: true,
  password: true,
  photoUrl: true,
  status: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};

export const ProgramStudiResouceLiteModel = {
  id: true,
  kode: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};
export const ProgramStudiResouceModel = {
  id: true,
  kode: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  Mahasiswa: {
    select: {
      deskripsi: true,
      namaBelakang: true,
      namaDepan: true,
      namaTengah: true,
      nomorIdentitas: true,
      password: true,
      photoUrl: true,
      tanggalDibuat: true,
      tanggalDiubah: true,
    },
  },
};

export const MahasiswaResouceLiteModel = {
  deskripsi: true,
  namaBelakang: true,
  namaDepan: true,
  namaTengah: true,
  nomorIdentitas: true,
  password: true,
  photoUrl: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  programStudiId: true,
  programStudi: {
    select: {
      id: true,
      kode: true,
      nama: true,
      tanggalDibuat: true,
      tanggalDiubah: true,
    },
  },
};
export const MahasiswaResouceModel = {};

export const PengalamanResouceLiteModel = {};
export const PengalamanResouceModel = {};

export const LampiranPengalamanResouceLiteModel = {};
export const LampiranPengalamanResouceModel = {};

export const PendidikanResouceLiteModel = {};
export const PendidikanResouceModel = {};

export const LampiranPendidikanResouceLiteModel = {};
export const LampiranPendidikanResouceModel = {};

export const SertifikasiResouceLiteModel = {};
export const SertifikasiResouceModel = {};

export const LampiranSertifikasiResouceLiteModel = {};
export const LampiranSertifikasiResouceModel = {};

export const OrganisasiResouceLiteModel = {};
export const OrganisasiResouceModel = {};

export const LampiranOrganisasiResouceLiteModel = {};
export const LampiranOrganisasiResouceModel = {};

export const TugasAkhirResouceLiteModel = {};
export const TugasAkhirResouceModel = {};

export const LampiranTugasAkhirResouceLiteModel = {};
export const LampiranTugasAkhirResouceModel = {};
