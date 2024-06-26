import { AttachmentModel, CommonModel } from 'api-hooks/common/model';
import { StudentLiteModel } from 'api-hooks/student/model';
import { Expose, Type } from 'class-transformer';

export class ExperienceLiteModel extends CommonModel {
  deskripsi: string;
  lokasi: string;

  @Expose({ name: 'nama_perusahaan' })
  namaPerusahaan: string;

  @Expose({ name: 'nomor_identitas_mahasiswa' })
  nomorIdentitasMahasiswa: string;

  posisi: string;
  skills: string;

  @Expose({ name: 'tanggal_mulai' })
  @Type(() => Date)
  tanggalMulai: Date;

  @Expose({ name: 'tanggal_selesai' })
  @Type(() => Date)
  tanggalSelesai: Date;

  @Expose({ name: 'lampiran_pengalaman' })
  @Type(() => AttachmentModel)
  lampiranPengalaman: AttachmentModel[];
}

export class ExperienceModel extends ExperienceLiteModel {
  @Type(() => StudentLiteModel)
  mahasiswa: StudentLiteModel;
}

export type GetExperiencesInput = {
  nomor_identitas?: string;
};

export type GetExperienceInput = {
  id: string;
};

export type ExperienceInputType = {
  nomor_identitas_mahasiswa: string;
  posisi: string;
  nama_perusahaan: string;
  lokasi: string;
  deskripsi: string;
  waktu_mulai: Date | null;
  waktu_selesai: Date | null;
  skills: string[];
  lampiran: string[];
};

export type ExperienceUpdateType = {
  id: string;
  data: ExperienceInputType;
};

export type ExperienceDeleteType = {
  id: string;
};
