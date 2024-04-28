import {
  EmployeeModel,
  employees,
} from 'modules/admin/employee/components/employee-form-type';
import * as Yup from 'yup';

export type StudyProgramModel = {
  id: string;
  nama_program_studi: string;
  kode_program_studi: string;
  pembuat: EmployeeModel;
  pengubah: EmployeeModel;
  waktu_dibuat: Date;
  waktu_diubah: Date;
};

export const StudyProgramFormSchema = () =>
  Yup.object({
    nama_program_studi: Yup.string().required(),
    kode_program_studi: Yup.string().required(),
  });

export type StudyProgramFormType = Yup.InferType<
  ReturnType<typeof StudyProgramFormSchema>
> & {
  data?: StudyProgramModel;
};

export const studyPrograms: StudyProgramModel[] = [
  {
    id: '1',
    kode_program_studi: 'TI',
    nama_program_studi: 'Teknik Informatika',
    pembuat: employees[0],
    pengubah: employees[0],
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '1',
    kode_program_studi: 'SI',
    nama_program_studi: 'Sistem Informasi',
    pembuat: employees[1],
    pengubah: employees[2],
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
];
