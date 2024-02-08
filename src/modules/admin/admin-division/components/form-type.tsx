import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const AdminDivisionFormSchema = () => Yup.object({});

export type AdminDivisionFormType = Yup.InferType<
  ReturnType<typeof AdminDivisionFormSchema>
>;

export type AdminDivisionMethodType = ReturnType<
  typeof useForm<AdminDivisionFormType>
>;
