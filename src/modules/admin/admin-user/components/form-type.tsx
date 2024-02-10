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

export type UserModel = {
  id: string;
  username: string;
  password: string;
  nama_depan: string;
  nama_belakang: string;
  nama_tengah: string;
  jurusan: string;
  tipe_user: string;
};

export const users: UserModel[] = [
  {
    id: '1',
    username: '2044009',
    password: 'secret123',
    nama_depan: 'Bella',
    nama_belakang: '',
    nama_tengah: '',
    jurusan: 'sistem_informasi',
    tipe_user: 'user',
  },
  {
    id: '2',
    username: 'admin',
    password: 'admin',
    nama_depan: 'Frieren',
    nama_belakang: '',
    nama_tengah: '',
    jurusan: 'teknik_informatika',
    tipe_user: 'admin',
  },
  {
    id: '3',
    username: '2044010',
    password: 'pass456',
    nama_depan: 'Rafael',
    nama_belakang: 'Santos',
    nama_tengah: '',
    jurusan: 'sistem_informasi',
    tipe_user: 'user',
  },
  {
    id: '4',
    username: '2044011',
    password: 'helloWorld',
    nama_depan: 'Alya',
    nama_belakang: 'Putri',
    nama_tengah: '',
    jurusan: 'teknik_informatika',
    tipe_user: 'user',
  },
  {
    id: '5',
    username: 'moderator',
    password: 'mod123',
    nama_depan: 'Kevin',
    nama_belakang: 'Tan',
    nama_tengah: '',
    jurusan: 'sistem_informasi',
    tipe_user: 'admin',
  },
  {
    id: '6',
    username: '2044012',
    password: 'qwerty',
    nama_depan: 'Luna',
    nama_belakang: '',
    nama_tengah: 'Maya',
    jurusan: 'teknik_informatika',
    tipe_user: 'user',
  },
  {
    id: '6',
    username: '2044013',
    password: '123abc',
    nama_depan: 'Marco',
    nama_belakang: 'Polo',
    nama_tengah: '',
    jurusan: 'teknik_informatika',
    tipe_user: 'user',
  },
  {
    id: '7',
    username: 'superuser',
    password: 'superuser',
    nama_depan: 'Diana',
    nama_belakang: '',
    nama_tengah: '',
    jurusan: 'teknik_informatika',
    tipe_user: 'admin',
  },
];
