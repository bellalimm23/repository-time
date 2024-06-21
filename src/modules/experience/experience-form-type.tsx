import {
  StudentModel,
  students,
} from 'modules/admin/students/components/student-form-type';
import * as Yup from 'yup';

export type ExperienceItemModel = {
  id: string;
  pengalaman_id: string;
  file_url: string;
  jenis_file: string;
};

export type ExperienceModel = {
  id: string;
  mahasiswa: StudentModel;
  posisi: string;
  nama_perusahaan: string;
  lokasi: string;
  deskripsi: string;
  waktu_mulai: Date | null;
  waktu_selesai: Date | null;
  skills: string;
  items: ExperienceItemModel[];
};

export const ExperienceFormSchema = () =>
  Yup.object({
    nomor_identitas_mahasiswa: Yup.string().required(),
    posisi: Yup.string().default(''),
    nama_perusahaan: Yup.string().required(),
    lokasi: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    waktu_mulai: Yup.date().nullable().default(null),
    waktu_selesai: Yup.date().nullable().default(null),
    skills: Yup.array(Yup.string().default('')).default([]),
  });

export type ExperienceFormType = Yup.InferType<
  ReturnType<typeof ExperienceFormSchema>
> & {
  data?: ExperienceModel;
};

const items: ExperienceItemModel[] = [
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '1',
    jenis_file: '',
    pengalaman_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '2',
    jenis_file: '',
    pengalaman_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '3',
    jenis_file: '',
    pengalaman_id: '1',
  },
];

export const experiences: ExperienceModel[] = [
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    id: '1',
    items,
    lokasi: 'Medan',
    mahasiswa: students[0],
    nama_perusahaan: 'STMIK Time Medan',
    posisi: 'Mahasiswa',
    skills: 'react|javascript|web',
    waktu_mulai: new Date(),
    waktu_selesai: null,
  },
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    id: '2',
    items,
    lokasi: 'Medan',
    mahasiswa: students[0],
    nama_perusahaan: 'PT Testing',
    posisi: 'Admin Accounting',
    skills: 'microsoft word|microsoft excel',
    waktu_mulai: new Date(),
    waktu_selesai: new Date(),
  },
];
