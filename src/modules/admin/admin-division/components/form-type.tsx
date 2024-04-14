import { CommonModel } from 'common/constants/api';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const AdminDivisionFormSchema = () =>
  Yup.object({
    nama: Yup.string().required(),
  });

export type AdminDivisionFormType = Yup.InferType<
  ReturnType<typeof AdminDivisionFormSchema>
>;

export type AdminDivisionMethodType = ReturnType<
  typeof useForm<AdminDivisionFormType>
>;

export type DivisionModel = {
  nama: string;
} & CommonModel;

export const divisions: DivisionModel[] = [
  {
    id: '1',
    nama: 'Fakultas Informatika',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
];
