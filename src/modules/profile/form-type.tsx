import { CommonModel } from 'common/constants/api';
import {
  UserModel,
  users,
} from 'modules/admin/admin-user/components/form-type';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const ChangePasswordFormSchema = () =>
  Yup.object({
    oldPassword: Yup.string().required(),
    currentPassword: Yup.string().required(),
    currentPasswordConfirmation: Yup.string()
      .required()
      .oneOf([Yup.ref('currentPassword'), null], 'Password tidak cocok'),
  });

export type ChangePasswordFormType = Yup.InferType<
  ReturnType<typeof ChangePasswordFormSchema>
>;

export type ChangePasswordMethodType = ReturnType<
  typeof useForm<ChangePasswordFormType>
>;

export const ProfileFormSchema = () =>
  Yup.object({
    photo_url: Yup.string().default(''),
    nomor_identitas: Yup.string().required().default(''),
    nama_depan: Yup.string().required().default(''),
    nama_tengah: Yup.string().required().default(''),
    nama_belakang: Yup.string().default(''),
    jurusan_id: Yup.string().required().default(''),
  });

export type ProfileFormType = Yup.InferType<
  ReturnType<typeof ProfileFormSchema>
>;

export type ProfileMethodType = ReturnType<typeof useForm<ProfileFormType>>;

//document
export const DocumentSertificateFormSchema = () =>
  Yup.object({
    file_url: Yup.string().default(''),
  });

export const DocumentFormSchema = () =>
  Yup.object({
    nama: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    tanggal_berlaku: Yup.date().default(new Date()),
    tanggal_kadaluarsa: Yup.date().nullable(),
    file_sertifikat: Yup.array(DocumentSertificateFormSchema()).default([]),
  });

export type DocumentFormType = Yup.InferType<
  ReturnType<typeof DocumentFormSchema>
>;

export type DocumentSertificateFormType = Yup.InferType<
  ReturnType<typeof DocumentSertificateFormSchema>
>;

const user = users[0];

export type DocumentSertificateModel = {
  file_url: string;
} & CommonModel;

export type DocumentModel = {
  nama: string;
  user: UserModel;
  deskripsi: string;
  tanggal_berlaku: Date;
  tanggal_kadaluarsa: Date | null;
  sertifikat: DocumentSertificateModel[];
} & CommonModel;

export const sertifikat: DocumentSertificateModel[] = [
  {
    file_url: '',
    id: '1',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    file_url: '',
    id: '1',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
];

export const documents: DocumentModel[] = [
  {
    deskripsi: 'Esse do sunt et consequat ullamco.',
    id: '1',
    nama: 'Sertifikat A',
    tanggal_berlaku: new Date(),
    tanggal_kadaluarsa: null,
    user,
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    sertifikat,
  },
  {
    deskripsi: 'Esse do sunt et consequat ullamco.',
    id: '2',
    nama: 'Sertifikat B',
    tanggal_berlaku: new Date(),
    tanggal_kadaluarsa: null,
    user,
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    sertifikat,
  },
  {
    deskripsi: 'Esse do sunt et consequat ullamco.',
    id: '3',
    nama: 'Sertifikat C',
    tanggal_berlaku: new Date(),
    tanggal_kadaluarsa: null,
    user,
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
    sertifikat,
  },
];
