import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const AdminUserFormSchema = () => Yup.object({});

export type AdminUserFormType = Yup.InferType<
  ReturnType<typeof AdminUserFormSchema>
>;

export type AdminUserMethodType = ReturnType<typeof useForm<AdminUserFormType>>;
