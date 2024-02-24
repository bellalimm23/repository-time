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

export const DocumentFormSchema = () =>
  Yup.object({
    path: Yup.string().required(),
    nama: Yup.string().required(),
  });

export const UploadDocumentFormSchema = () =>
  Yup.object({
    documents: Yup.array(DocumentFormSchema()).default([]),
  });

export type DocumentFormType = Yup.InferType<
  ReturnType<typeof DocumentFormSchema>
>;

export type UploadDocumentFormType = Yup.InferType<
  ReturnType<typeof UploadDocumentFormSchema>
>;

export type UploadDocumentMethodType = ReturnType<
  typeof useForm<UploadDocumentFormType>
>;

export type DocumentModel = {
  user: UserModel;
  nama: string;
  path: string;
} & CommonModel;

const user = users[0];

export const documents: DocumentModel[] = [
  {
    id: '1',
    nama: 'Portfolio',
    path: `${user.id}/portfolio.pdf`,
    user,
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '2',
    nama: 'Sertifikat',
    path: `${user.id}/sertifikat.pdf`,
    user,
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
];
