import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../prisma';
import {
  AdminResouceLiteModel,
  AdminResouceModel,
} from '../../../../prisma/resource';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  console.log(body);

  try {
    if (method === 'GET') {
      const admin = await prisma.admin.findMany({
        select: AdminResouceLiteModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(admin),
      });
    } else if (method === 'POST') {
      const admin = await prisma.admin.create({
        data: {
          deskripsi: '',
          namaBelakang: '',
          namaDepan: '',
          namaTengah: '',
          nomorIdentitas: '',
          password: '',
          photoUrl: '',
          status: 'active',
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
