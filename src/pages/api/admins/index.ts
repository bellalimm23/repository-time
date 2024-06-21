import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { EmployeeStatusEnum } from 'modules/admin/employee/components/employee-form-type';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import {
  AdminResouceLiteModel,
  AdminResouceModel,
} from '../../../../prisma/resource';

export const EmployeeFormSchema = Yup.object({
  nama_depan: Yup.string().required(),
  nama_tengah: Yup.string().default(''),
  nama_belakang: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  password: Yup.string().required(),
  status: Yup.mixed<EmployeeStatusEnum>()
    .oneOf(Object.values(EmployeeStatusEnum))
    .default(EmployeeStatusEnum.active),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;

  await middleware(req, res, true);

  try {
    if (method === 'GET') {
      const admin = await prisma.admin.findMany({
        select: AdminResouceLiteModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(admin),
      });
    } else if (method === 'POST') {
      const currentAdmin = await EmployeeFormSchema.validate(body);
      const id = generateId();
      const admin = await prisma.admin.create({
        data: {
          deskripsi: currentAdmin.deskripsi,
          namaBelakang: currentAdmin.nama_belakang,
          namaDepan: currentAdmin.nama_depan,
          namaTengah: currentAdmin.nama_tengah,
          nomorIdentitas: id,
          password: currentAdmin.password,
          status: currentAdmin.status,
          photoUrl: `https://srxjxwfnbpkiieeyxpux.supabase.co/storage/v1/object/public/repository/photo-profile/${id}.png`,
        },
        select: AdminResouceModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(admin),
        message: 'Admin berhasil dibuat',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
