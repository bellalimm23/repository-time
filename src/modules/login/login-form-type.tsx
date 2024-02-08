import * as Yup from 'yup';

export const LoginFormSchema = () =>
  Yup.object({
    username: Yup.string().default('').required(),
    password: Yup.string().default('').required(),
  });

export type LoginFormType = Yup.InferType<ReturnType<typeof LoginFormSchema>>;
