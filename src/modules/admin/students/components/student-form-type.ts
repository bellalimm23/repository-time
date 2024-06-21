import { MeModel } from 'api-hooks/auth/model';
import { StudentModel } from 'api-hooks/student/model';
import * as Yup from 'yup';

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
  data?: MeModel | StudentModel;
};
