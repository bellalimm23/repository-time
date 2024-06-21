import { CertificationLiteModel } from 'api-hooks/certification/model';
import { EducationLiteModel } from 'api-hooks/education/model';
import { ExperienceLiteModel } from 'api-hooks/experience/model';
import { OrganizationLiteModel } from 'api-hooks/organization/model';
import { StudyProgramLiteModel } from 'api-hooks/study-program/model';
import { ThesisLiteModel } from 'api-hooks/thesis/model';
import { Expose, Type } from 'class-transformer';

export class StudentLiteModel {
  deskripsi: string;

  @Expose({ name: 'nama_belakang' })
  namaBelakang: string;

  @Expose({ name: 'nama_depan' })
  namaDepan: string;

  @Expose({ name: 'nama_tengah' })
  namaTengah: string;

  @Expose({ name: 'nomor_identitas' })
  nomorIdentitas: string;

  @Expose({ name: 'program_studi_id' })
  programStudiId: string;

  @Expose({ name: 'tanggal_dibuat' })
  @Type(() => Date)
  tanggalDibuat: Date;

  @Expose({ name: 'tanggal_diubah' })
  @Type(() => Date)
  tanggalDiubah: Date;

  @Expose({ name: 'photo_url' })
  photoUrl: string;

  @Expose({ name: 'program_studi' })
  @Type(() => StudyProgramLiteModel)
  programStudi: StudyProgramLiteModel;
}

export class StudentModel extends StudentLiteModel {
  @Type(() => ExperienceLiteModel)
  pengalaman: ExperienceLiteModel[];

  @Type(() => EducationLiteModel)
  pendidikan: EducationLiteModel[];

  @Type(() => CertificationLiteModel)
  sertifikasi: CertificationLiteModel[];

  @Expose({ name: 'tugas_akhir' })
  @Type(() => ThesisLiteModel)
  tugasAkhir: ThesisLiteModel[];

  @Type(() => OrganizationLiteModel)
  organisasi: OrganizationLiteModel[];
}

export type GetStudentsInput = object;

export type GetStudentInput = {
  id: string;
};

export type StudentInputType = {
  nomor_identitas: string;
  nama_depan: string;
  nama_tengah: string;
  nama_belakang: string;
  deskripsi: string;
  program_studi_id: string;
};

export type StudentUpdateType = {
  id: string;
  data: StudentInputType;
};

export type StudentDeleteType = {
  id: string;
};
