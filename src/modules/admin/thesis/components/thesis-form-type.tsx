import {
  EmployeeModel,
  employees,
} from 'modules/admin/employee/components/employee-form-type';
import {
  StudentModel,
  students,
} from 'modules/admin/students/components/student-form-type';
import * as Yup from 'yup';

export enum ThesisStatusEnum {
  pending = 'pending',
  reject = 'reject',
  approve = 'approve',
}

export type ThesisItemModel = {
  id: string;
  tugas_akhir_id: string;
  file_url: string;
  jenis_file: string;
};

export type ThesisModel = {
  id: string;
  mahasiswa: StudentModel;
  judul_tugas_akhir: string;
  abstrak: string;
  status: ThesisStatusEnum;
  waktu_terbit: Date | null;
  pic: EmployeeModel | null;
  items: ThesisItemModel[];
};

export const ThesisFormSchema = () =>
  Yup.object({
    judul_tugas_akhir: Yup.string().required(),
    nomor_identitas_mahasiswa: Yup.string().required(),
    abstrak: Yup.string().required(),
    status: Yup.mixed<ThesisStatusEnum>()
      .oneOf(Object.values(ThesisStatusEnum))
      .default(ThesisStatusEnum.pending),
    waktu_terbit: Yup.date().nullable(),
    nomor_identitas_pic: Yup.string().nullable(),
  });

export type ThesisFormType = Yup.InferType<
  ReturnType<typeof ThesisFormSchema>
> & {
  data?: ThesisModel;
};

export const items: ThesisItemModel[] = [
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '1',
    jenis_file: '',
    tugas_akhir_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '2',
    jenis_file: '',
    tugas_akhir_id: '1',
  },
  {
    file_url:
      'https://lib.ui.ac.id/file?file=digital/2019-10/20490420-S-pdf-Alfaizs%20Vi%20Afkara.pdf',
    id: '3',
    jenis_file: '',
    tugas_akhir_id: '1',
  },
];

export const thesis: ThesisModel[] = [
  {
    id: '1',
    mahasiswa: students[0],
    judul_tugas_akhir:
      'PERANCANGAN WEBSITE REPOSITORY MAHASISWA DI STMIK TIME MENGGUNAKAN METODE ITERATIVE INCREMENTAL',
    abstrak:
      'Reprehenderit incididunt eiusmod ullamco mollit velit velit ullamco consectetur. Nulla sint reprehenderit elit fugiat quis. Excepteur ad duis commodo ut exercitation voluptate. Cupidatat sint laboris qui magna cillum voluptate non aute est nostrud.',
    pic: null,
    status: ThesisStatusEnum.pending,
    waktu_terbit: null,
    items,
  },
  {
    id: '2',
    mahasiswa: students[0],
    judul_tugas_akhir:
      'PERANCANGAN WEBSITE REPOSITORY MAHASISWA DI STMIK TIME MENGGUNAKAN METODE ITERATIVE INCREMENTAL',
    abstrak:
      'Quis proident mollit aliquip consequat irure sit dolore dolore culpa mollit est est occaecat. Mollit consequat veniam enim in. Proident in consequat elit ex sint laborum. Nostrud ea mollit dolor officia. Dolore ipsum veniam reprehenderit dolore. Minim do ullamco aliquip cillum in ea magna dolore veniam.',
    pic: employees[1],
    status: ThesisStatusEnum.reject,
    waktu_terbit: null,
    items,
  },
  {
    id: '3',
    mahasiswa: students[0],
    judul_tugas_akhir:
      'PERANCANGAN WEBSITE REPOSITORY MAHASISWA DI STMIK TIME MENGGUNAKAN METODE ITERATIVE INCREMENTAL',
    abstrak:
      'Id cupidatat ullamco cillum esse proident irure incididunt pariatur. Sint consectetur deserunt dolor sint sit incididunt. In enim dolore veniam tempor. Labore amet irure proident Lorem enim. Commodo tempor mollit quis anim nisi cillum dolore ea minim non est qui.',
    pic: employees[1],
    status: ThesisStatusEnum.approve,
    waktu_terbit: new Date(),
    items,
  },
];
