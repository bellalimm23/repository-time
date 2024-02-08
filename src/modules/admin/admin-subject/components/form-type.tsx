import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const AdminSubjectFormSchema = () => Yup.object({});

export type AdminSubjectFormType = Yup.InferType<
  ReturnType<typeof AdminSubjectFormSchema>
>;

export type AdminSubjectMethodType = ReturnType<
  typeof useForm<AdminSubjectFormType>
>;
