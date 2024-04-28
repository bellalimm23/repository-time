import {
  StudentModel,
  students,
} from 'modules/admin/students/components/student-form-type';
import * as Yup from 'yup';

export type EducationItemModel = {
  id: string;
  pendidikan_id: string;
  file_url: string;
  jenis_file: string;
};

export type EducationModel = {
  id: string;
  mahasiswa: StudentModel;
  items: EducationItemModel[];
  skills: string;
  nama_institusi: string;
  gelar: string;
  bidang_studi: string;
  deskripsi: string;
  nilai_akhir: string;
  waktu_mulai: Date;
  waktu_selesai: Date | null;
};

export const EducationFormSchema = () =>
  Yup.object({
    nomor_identitas_mahasiswa: Yup.string().default(''),
    nama_institusi: Yup.string().required(),
    gelar: Yup.string().default(''),
    bidang_studi: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    nilai_akhir: Yup.string().default(''),
    waktu_mulai: Yup.date().nullable().default(null),
    waktu_selesai: Yup.date().nullable().default(null),
    skills: Yup.array(Yup.string().default('')).default([]),
  });

export type EducationFormType = Yup.InferType<
  ReturnType<typeof EducationFormSchema>
> & {
  data?: EducationModel;
};

const items: EducationItemModel[] = [
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '1',
    jenis_file: '',
    pendidikan_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '2',
    jenis_file: '',
    pendidikan_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '3',
    jenis_file: '',
    pendidikan_id: '1',
  },
];

export const educations: EducationModel[] = [
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    id: '1',
    items,
    mahasiswa: students[0],
    nama_institusi: 'STMIK Time',
    skills: 'public speaking|problem solving',
    waktu_mulai: new Date(),
    waktu_selesai: new Date(),
    bidang_studi: 'Teknik Informatika',
    gelar: 'S1',
    nilai_akhir: '3.89',
  },
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    id: '1',
    items,
    mahasiswa: students[0],
    nama_institusi: 'SMA Swasta Budi Utomo Medan',
    skills: 'public speaking|problem solving',
    waktu_mulai: new Date(),
    waktu_selesai: new Date(),
    bidang_studi: 'IPA',
    gelar: '',
    nilai_akhir: '81',
  },
];
