import * as Yup from 'yup';

export enum EmployeeStatusEnum {
  active = 'active',
  inactive = 'inactive',
}

export type EmployeeModel = {
  nomor_identitas: string;
  nama_depan: string;
  nama_tengah: string;
  nama_belakang: string;
  deskripsi: string;
  status: EmployeeStatusEnum;
  password: string;
  photo_url: string;
  waktu_dibuat: Date;
  waktu_diubah: Date;
};

export const EmployeeFormSchema = () =>
  Yup.object({
    nama_depan: Yup.string().required(),
    nama_tengah: Yup.string().default(''),
    nama_belakang: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    password: Yup.string().required(),
    status: Yup.mixed<EmployeeStatusEnum>()
      .oneOf(Object.values(EmployeeStatusEnum))
      .default(EmployeeStatusEnum.active),
  });

export type EmployeeFormType = Yup.InferType<
  ReturnType<typeof EmployeeFormSchema>
> & {
  data?: EmployeeModel;
};

export const employees: EmployeeModel[] = [
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    nama_belakang: 'Lim',
    nama_depan: 'Bella',
    nama_tengah: '',
    nomor_identitas: '112233',
    password: 'secret',
    photo_url: '/assets/photo-profile-example.jpeg',
    status: EmployeeStatusEnum.active,
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    nama_belakang: 'Tan',
    nama_depan: 'Sebastian',
    nama_tengah: 'Alexander',
    nomor_identitas: '223344',
    photo_url: '',
    password: 'secret',
    status: EmployeeStatusEnum.active,
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
  {
    deskripsi: 'Sunt commodo amet elit exercitation sit.',
    nama_belakang: '',
    nama_depan: 'Louis',
    nama_tengah: '',
    nomor_identitas: '445566',
    photo_url: '',
    password: 'secret',
    status: EmployeeStatusEnum.inactive,
    waktu_dibuat: new Date(),
    waktu_diubah: new Date(),
  },
];
