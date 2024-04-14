import { CommonModel } from 'common/constants/api';
import {
  DivisionModel,
  divisions,
} from 'modules/admin/admin-division/components/form-type';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const AdminSubjectFormSchema = () =>
  Yup.object({
    nama: Yup.string().required(),
    kode: Yup.string().required(),
    fakultas_id: Yup.string().required(),
  });

export type AdminSubjectFormType = Yup.InferType<
  ReturnType<typeof AdminSubjectFormSchema>
>;

export type AdminSubjectMethodType = ReturnType<
  typeof useForm<AdminSubjectFormType>
>;

export type SubjectModel = {
  nama: string;
  kode: string;
  fakultas: DivisionModel;
} & CommonModel;

export const subjects: SubjectModel[] = [
  {
    id: '1',
    nama: 'Teknik Informatika',
    fakultas: divisions[0],
    kode: 'TI',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    id: '2',
    nama: 'Sistem Informasi',
    fakultas: divisions[0],
    kode: 'SI',
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
];

export function generateSubjectName(subject: SubjectModel) {
  return [subject.kode, subject.nama].join(' - ');
}
