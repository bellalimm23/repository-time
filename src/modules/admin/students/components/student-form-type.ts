import {
  StudyProgramModel,
  studyPrograms,
} from 'modules/admin/study-programs/components/study-program-form-type';
import * as Yup from 'yup';

export type StudentModel = {
  nomor_identitas: string;
  nama_depan: string;
  nama_tengah: string;
  nama_belakang: string;
  deskripsi: string;
  password: string;
  program_studi: StudyProgramModel;
  photo_url: string;
};

export const StudentFormSchema = () =>
  Yup.object({
    nomor_identitas: Yup.string().default(''),
    nama_depan: Yup.string().required(),
    nama_tengah: Yup.string().default(''),
    nama_belakang: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    program_studi_id: Yup.string().required(),
  });

export type StudentFormType = Yup.InferType<
  ReturnType<typeof StudentFormSchema>
> & {
  data?: StudentModel;
};

export const students: StudentModel[] = [
  {
    nomor_identitas: '2044009',
    nama_depan: 'Bella',
    nama_tengah: '',
    nama_belakang: 'Lim',
    deskripsi:
      'Lorem in tempor ullamco nostrud laboris. Id sit velit proident culpa sit cupidatat nostrud sit consequat ex proident. Aute dolor nostrud proident labore. Ipsum consequat ad ea cillum aliqua eu labore cillum. Lorem sint incididunt velit Lorem elit laborum ad sit nulla esse in velit voluptate.',
    photo_url: '/assets/photo-profile-example.jpeg',
    program_studi: studyPrograms[0],
    password: 'secret',
  },
  {
    nomor_identitas: '2044010',
    nama_depan: 'Alexander',
    nama_tengah: '',
    nama_belakang: 'Lim',
    deskripsi:
      'Lorem in tempor ullamco nostrud laboris. Id sit velit proident culpa sit cupidatat nostrud sit consequat ex proident. Aute dolor nostrud proident labore. Ipsum consequat ad ea cillum aliqua eu labore cillum. Lorem sint incididunt velit Lorem elit laborum ad sit nulla esse in velit voluptate.',
    photo_url: '',
    program_studi: studyPrograms[1],
    password: 'secret',
  },
  {
    nomor_identitas: '2044011',
    nama_depan: 'Christine',
    nama_tengah: '',
    nama_belakang: 'Lim',
    deskripsi:
      'Lorem in tempor ullamco nostrud laboris. Id sit velit proident culpa sit cupidatat nostrud sit consequat ex proident. Aute dolor nostrud proident labore. Ipsum consequat ad ea cillum aliqua eu labore cillum. Lorem sint incididunt velit Lorem elit laborum ad sit nulla esse in velit voluptate.',
    photo_url: '',
    program_studi: studyPrograms[0],
    password: 'secret',
  },
];
