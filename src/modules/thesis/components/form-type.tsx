import { CommonModel } from 'common/constants/api';
import { FileType, fileType } from 'common/constants/file';
import { thesis } from 'modules/admin/admin-thesis/components/form-type';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const ThesisFormSchema = () =>
  Yup.object({
    tipe: Yup.mixed<FileType>().oneOf(Object.values(fileType)),
    nama: Yup.string(), // path
  });

export const UploadThesisFormSchema = () =>
  Yup.object({
    files: Yup.array(ThesisFormSchema()).default([]),
  });

export type ThesisFormType = Yup.InferType<ReturnType<typeof ThesisFormSchema>>;

export type UploadThesisFormType = Yup.InferType<
  ReturnType<typeof UploadThesisFormSchema>
>;

export type UploadThesisMethodType = ReturnType<
  typeof useForm<UploadThesisFormType>
>;

export type ThesisFileType = {
  id: string;
  nama: string;
  tipe: FileType;
  waktu_diubah: Date;
  thesisId: string;
} & CommonModel;

export const files: ThesisFileType[] = [
  {
    id: '1',
    nama: (+new Date()).toString(),
    thesisId: thesis[0].id,
    tipe: 'bagian_awal',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '2',
    nama: (+new Date()).toString(),
    thesisId: thesis[0].id,
    tipe: 'bab_1',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '3',
    nama: (+new Date()).toString(),
    thesisId: thesis[0].id,
    tipe: 'bab_2',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '4',
    nama: (+new Date()).toString(),
    thesisId: thesis[0].id,
    tipe: 'bab_3',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '5',
    nama: (+new Date()).toString(),
    thesisId: thesis[0].id,
    tipe: 'bab_4',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '6',
    nama: (+new Date()).toString(),
    thesisId: thesis[0].id,
    tipe: 'bab_5',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '7',
    nama: (+new Date()).toString(),
    thesisId: thesis[0].id,
    tipe: 'bagian_akhir',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
];
