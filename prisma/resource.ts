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
  photoUrl: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  programStudiId: true,
  programStudi: {
    select: ProgramStudiResouceLiteModel,
  },
};

export const PengalamanResouceLiteModel = {
  deskripsi: true,
  id: true,
  LampiranPengalaman: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  lokasi: true,
  namaPerusahaan: true,
  nomorIdentitasMahasiswa: true,
  posisi: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};
export const PengalamanResouceModel = {
  deskripsi: true,
  id: true,
  LampiranPengalaman: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  lokasi: true,
  mahasiswa: {
    select: MahasiswaResouceLiteModel,
  },
  namaPerusahaan: true,
  nomorIdentitasMahasiswa: true,
  posisi: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};

export const PendidikanResouceLiteModel = {
  bidangStudi: true,
  deskripsi: true,
  gelar: true,
  id: true,
  LampiranPendidikan: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  namaInstitusi: true,
  nilaiAkhir: true,
  nomorIdentitasMahasiswa: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};
export const PendidikanResouceModel = {
  bidangStudi: true,
  deskripsi: true,
  gelar: true,
  id: true,
  LampiranPendidikan: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  namaInstitusi: true,
  nilaiAkhir: true,
  nomorIdentitasMahasiswa: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
  mahasiswa: {
    select: MahasiswaResouceLiteModel,
  },
};

export const SertifikasiResouceLiteModel = {
  deskripsi: true,
  id: true,
  LampiranSertifikasi: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  namaSertifikasi: true,
  nilaiAkhir: true,
  nomorIdentitasMahasiswa: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalKadaluarsa: true,
  tanggalTerbit: true,
};
export const SertifikasiResouceModel = {
  deskripsi: true,
  id: true,
  LampiranSertifikasi: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  mahasiswa: {
    select: MahasiswaResouceLiteModel,
  },
  namaSertifikasi: true,
  nilaiAkhir: true,
  nomorIdentitasMahasiswa: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalKadaluarsa: true,
  tanggalTerbit: true,
};

export const OrganisasiResouceLiteModel = {
  deskripsi: true,
  id: true,
  LampiranOrganisasi: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  nama: true,
  nomorIdentitasMahasiswa: true,
  pengalaman: {
    select: {
      id: true,
      namaPerusahaan: true,
      posisi: true,
    },
  },
  posisi: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};
export const OrganisasiResouceModel = {
  deskripsi: true,
  id: true,
  LampiranOrganisasi: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  nama: true,
  mahasiswa: {
    select: MahasiswaResouceLiteModel,
  },
  nomorIdentitasMahasiswa: true,
  pengalaman: {
    select: {
      id: true,
      namaPerusahaan: true,
      posisi: true,
    },
  },
  posisi: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};

export const TugasAkhirResouceLiteModel = {
  abstrak: true,
  id: true,
  judulTugasAkhir: true,
  LampiranTugasAkhir: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  status: true,
  tanggalDibuat: true,
  nomorIdentitasMahasiswa: true,
  tanggalDiubah: true,
  tanggalTerbit: true,
};

export const TugasAkhirResouceModel = {
  abstrak: true,
  id: true,
  judulTugasAkhir: true,
  LampiranTugasAkhir: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  mahasiswa: {
    select: MahasiswaResouceLiteModel,
  },
  status: true,
  tanggalDibuat: true,
  nomorIdentitasMahasiswa: true,
  tanggalDiubah: true,
  tanggalTerbit: true,
};

export const MahasiswaResouceModel = {
  deskripsi: true,
  namaBelakang: true,
  namaDepan: true,
  namaTengah: true,
  nomorIdentitas: true,
  Organisasi: {
    select: OrganisasiResouceLiteModel,
  },
  Pendidikan: {
    select: PendidikanResouceLiteModel,
  },
  Pengalaman: {
    select: PengalamanResouceLiteModel,
  },
  photoUrl: true,
  programStudi: {
    select: ProgramStudiResouceLiteModel,
  },
  programStudiId: true,
  Sertifikasi: {
    select: SertifikasiResouceLiteModel,
  },
  tanggalDibuat: true,
  tanggalDiubah: true,
  TugasAkhir: {
    select: TugasAkhirResouceLiteModel,
  },
};
