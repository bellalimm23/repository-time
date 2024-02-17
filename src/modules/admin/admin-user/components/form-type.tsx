import { CommonModel } from 'common/constants/api';
import { UserType } from 'common/constants/user';
import {
  SubjectModel,
  subjects,
} from 'modules/admin/admin-subject/components/form-type';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const AdminUserFormSchema = () =>
  Yup.object({
    nomor_identitas: Yup.string().required().default(''),
    password: Yup.string().required().default(''),
    nama_depan: Yup.string().required().default(''),
    nama_tengah: Yup.string().required().default(''),
    nama_belakang: Yup.string().default(''),
    tipe_user: Yup.string().required().default('admin'),
    jurusan_id: Yup.string().required().default(''),
  });

export type AdminUserFormType = Yup.InferType<
  ReturnType<typeof AdminUserFormSchema>
>;

export type AdminUserMethodType = ReturnType<typeof useForm<AdminUserFormType>>;

export type UserModel = {
  nomor_identitas: string;
  password: string;
  nama_depan: string;
  nama_belakang: string;
  nama_tengah: string;
  jurusan: SubjectModel;
  tipe_user: UserType;
} & CommonModel;

export const users: UserModel[] = [
  {
    id: '1',
    nomor_identitas: '2044009',
    password: 'secret123',
    nama_depan: 'Bella',
    nama_belakang: '',
    nama_tengah: '',
    jurusan: subjects[0],
    tipe_user: 'user',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '2',
    nomor_identitas: 'admin',
    password: 'admin',
    nama_depan: 'Frieren',
    nama_belakang: '',
    nama_tengah: '',
    jurusan: subjects[0],
    tipe_user: 'admin',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '3',
    nomor_identitas: '2044010',
    password: 'pass456',
    nama_depan: 'Rafael',
    nama_belakang: 'Santos',
    nama_tengah: '',
    jurusan: subjects[0],
    tipe_user: 'user',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '4',
    nomor_identitas: '2044011',
    password: 'helloWorld',
    nama_depan: 'Alya',
    nama_belakang: 'Putri',
    nama_tengah: '',
    jurusan: subjects[0],
    tipe_user: 'user',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '5',
    nomor_identitas: 'moderator',
    password: 'mod123',
    nama_depan: 'Kevin',
    nama_belakang: 'Tan',
    nama_tengah: '',
    jurusan: subjects[0],
    tipe_user: 'admin',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '6',
    nomor_identitas: '2044012',
    password: 'qwerty',
    nama_depan: 'Luna',
    nama_belakang: '',
    nama_tengah: 'Maya',
    jurusan: subjects[0],
    tipe_user: 'user',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '7',
    nomor_identitas: '2044013',
    password: '123abc',
    nama_depan: 'Marco',
    nama_belakang: 'Polo',
    nama_tengah: '',
    jurusan: subjects[0],
    tipe_user: 'user',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '8',
    nomor_identitas: 'superuser',
    password: 'superuser',
    nama_depan: 'Diana',
    nama_belakang: '',
    nama_tengah: '',
    jurusan: subjects[0],
    tipe_user: 'admin',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
];

export const UserTab = {
  information: 'information',
  thesis: 'thesis',
} as const;

export type UserTabType = (typeof UserTab)[keyof typeof UserTab];
