import {
  StudentModel,
  students,
} from 'modules/admin/students/components/student-form-type';
import {
  ExperienceModel,
  experiences,
} from 'modules/experience/experience-form-type';
import * as Yup from 'yup';

export type OrganizationItemModel = {
  id: string;
  organisasi_id: string;
  file_url: string;
  jenis_file: string;
};

export type OrganizationModel = {
  id: string;
  mahasiswa: StudentModel;
  nama_organisasi: string;
  posisi: string;
  deskripsi: string;
  waktu_mulai: Date | null;
  waktu_selesai: Date | null;
  skills: string;
  items: OrganizationItemModel[];
  pengalaman: ExperienceModel | null;
};

export const OrganizationFormSchema = () =>
  Yup.object({
    nomor_identitas_mahasiswa: Yup.string().default(''),
    nama_organisasi: Yup.string().required(),
    pengalaman_id: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    posisi: Yup.string().default(''),
    waktu_mulai: Yup.date().nullable().default(null),
    waktu_selesai: Yup.date().nullable().default(null),
    skills: Yup.array(Yup.string().default('')).default([]),
  });

export type OrganizationFormType = Yup.InferType<
  ReturnType<typeof OrganizationFormSchema>
> & {
  data?: OrganizationModel;
};

const items: OrganizationItemModel[] = [
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '1',
    jenis_file: '',
    organisasi_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '2',
    jenis_file: '',
    organisasi_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '3',
    jenis_file: '',
    organisasi_id: '1',
  },
];

export const organizations: OrganizationModel[] = [
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    id: '1',
    items,
    mahasiswa: students[0],
    nama_organisasi: 'AAA Club',
    posisi: 'Sekertaris',
    pengalaman: experiences[0],
    skills: 'public speaking|problem solving',
    waktu_mulai: new Date(),
    waktu_selesai: null,
  },
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    id: '1',
    items,
    mahasiswa: students[0],
    nama_organisasi: 'CCC Club',
    posisi: 'Team Leader',
    pengalaman: null,
    skills: 'leadership',
    waktu_mulai: new Date(),
    waktu_selesai: new Date(),
  },
];
