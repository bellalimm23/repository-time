import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

export const AdminThesisSchema = () => Yup.object({});

export type AdminThesisFormType = Yup.InferType<
  ReturnType<typeof AdminThesisSchema>
>;

export type AdminThesisMethodType = ReturnType<
  typeof useForm<AdminThesisFormType>
>;
