import {
  StudentModel,
  students,
} from 'modules/admin/students/components/student-form-type';
import * as Yup from 'yup';

export type CertificationItemModel = {
  id: string;
  sertifikasi_id: string;
  file_url: string;
  jenis_file: string;
};

export type CertificationModel = {
  id: string;
  mahasiswa: StudentModel;
  skills: string;
  items: CertificationItemModel[];

  nama_sertifikasi: string;
  nama_institusi: string;
  deskripsi: string;
  nilai_akhir: string;
  waktu_terbit: Date;
  waktu_kadaluarsa: Date | null;
};

export const CertificationFormSchema = () =>
  Yup.object({
    nomor_identitas_mahasiswa: Yup.string().default(''),
    nama_sertifikasi: Yup.string().default(''),
    nama_institusi: Yup.string().required(),
    deskripsi: Yup.string().default(''),
    nilai_akhir: Yup.string().default(''),
    waktu_terbit: Yup.date().nullable().default(null),
    waktu_kadaluarsa: Yup.date().nullable().default(null),
    skills: Yup.array(Yup.string().default('')).default([]),
  });

export type CertificationFormType = Yup.InferType<
  ReturnType<typeof CertificationFormSchema>
> & {
  data?: CertificationModel;
};

const items: CertificationItemModel[] = [
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '1',
    jenis_file: '',
    sertifikasi_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '2',
    jenis_file: '',
    sertifikasi_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '3',
    jenis_file: '',
    sertifikasi_id: '1',
  },
];

export const certifications: CertificationModel[] = [
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    id: '1',
    items,
    mahasiswa: students[0],
    skills: 'html|css|javascript',
    waktu_terbit: new Date(),
    waktu_kadaluarsa: null,
    nama_institusi: 'Dicoding',
    nama_sertifikasi: 'Sertifikasi Frontend Pemula',
    nilai_akhir: '100',
  },
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    id: '1',
    items,
    mahasiswa: students[0],
    skills: 'react|nextjs',
    waktu_terbit: new Date(),
    waktu_kadaluarsa: new Date(),
    nama_institusi: 'Dicoding',
    nama_sertifikasi: 'Sertifikasi Frontend Expert',
    nilai_akhir: '95',
  },
];
