import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../prisma';
import { AdminResouceModel } from '../../../../prisma/resource';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const id = req.query.id as string;
  const body = req.body;

  try {
    const admin = await prisma.admin.findUnique({
      where: { nomorIdentitas: id },
      select: AdminResouceModel,
    });
    if (!admin) {
      return res.status(404).json({
        message: 'Admin tidak ditemukan',
      });
    }
    if (method === 'GET') {
      return res.status(200).json({
        data: decamelizeKeys(admin),
      });
    } else if (method === 'PUT') {
      const currentAdmin = await prisma.admin.update({
        where: { nomorIdentitas: id },
        data: {
          deskripsi: '',
          namaBelakang: '',
          namaDepan: '',
          namaTengah: '',
          photoUrl: '',
          status: 'active',
          tanggalDibuat: '',
          tanggalDiubah: '',
        },
        select: AdminResouceModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(currentAdmin),
        message: 'Admin berhasil diubah',
      });
    } else if (method === 'DELETE') {
      await prisma.admin.delete({ where: { nomorIdentitas: id } });
      return res.status(200).json({
        message: 'Admin berhasil dihapus',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
