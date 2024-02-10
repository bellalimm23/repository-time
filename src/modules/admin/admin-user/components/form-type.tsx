import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const AdminUserFormSchema = () =>
  Yup.object({
    username: Yup.string().required().default(''),
    password: Yup.string().required().default(''),
    nama_depan: Yup.string().required().default(''),
    nama_tengah: Yup.string().required().default(''),
    nama_belakang: Yup.string().default(''),
    tipe_user: Yup.string().required().default('admin'),
    jurusan_id: Yup.string().required().default('sistem_informasi'),
  });

export type AdminUserFormType = Yup.InferType<
  ReturnType<typeof AdminUserFormSchema>
>;

export type AdminUserMethodType = ReturnType<typeof useForm<AdminUserFormType>>;
