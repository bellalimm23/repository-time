import { AttachmentModel, CommonModel } from 'api-hooks/common/model';
import { StudentLiteModel } from 'api-hooks/student/model';
import { Expose, Type } from 'class-transformer';

export class OrganizationExperienceModel {
  id: string;

  @Expose({ name: 'nama_perusahaan' })
  namaPerusahaan: string;

  posisi: string;
}

export class OrganizationLiteModel extends CommonModel {
  deskripsi: string;
  nama: string;

  @Type(() => OrganizationExperienceModel)
  pengalaman: OrganizationExperienceModel;

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

  @Expose({ name: 'lampiran_organisasi' })
  @Type(() => AttachmentModel)
  lampiranOrganisasi: AttachmentModel[];
}

export class OrganizationModel extends OrganizationLiteModel {
  @Type(() => StudentLiteModel)
  mahasiswa: StudentLiteModel;
}

export type GetOrganizationsInput = {
  nomor_identitas?: string;
};

export type GetOrganizationInput = {
  id: string;
};

export type OrganizationInputType = {
  nomor_identitas_mahasiswa: string;
  nama_organisasi: string;
  pengalaman_id: string;
  posisi: string;
  deskripsi: string;
  waktu_mulai: Date | null;
  waktu_selesai: Date | null;
  skills: string[];
  lampiran: string[];
};

export type OrganizationUpdateType = {
  id: string;
  data: OrganizationInputType;
};

export type OrganizationDeleteType = {
  id: string;
};
