import { userType } from 'common/constants/user';
import * as Yup from 'yup';

export const RegisterFormSchema = () =>
  Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
    nama_depan: Yup.string().required(),
    nama_tengah: Yup.string().default(''),
    nama_belakang: Yup.string().default(''),
    tipe_user: Yup.string().default(userType.user),
    jurusan: Yup.string().default('').required(),
  });

export type RegisterFormType = Yup.InferType<
  ReturnType<typeof RegisterFormSchema>
>;
