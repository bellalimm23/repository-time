import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../prisma';
import {
  AdminResouceLiteModel,
  MahasiswaResouceLiteModel,
} from '../../../../prisma/resource';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const user = (await middleware(req, res)) as JwtPayload;
  try {
    if (method === 'GET') {
      if (user.type === 'user') {
        const mahasiswa = await prisma.mahasiswa.findUnique({
          where: { nomorIdentitas: user.nomor_identitas },
          select: MahasiswaResouceLiteModel,
        });

        return res.status(200).json({
          data: decamelizeKeys(mahasiswa),
        });
      } else if (user.type === 'admin') {
        const admin = await prisma.admin.findUnique({
          where: { nomorIdentitas: user.nomor_identitas },
          select: AdminResouceLiteModel,
        });

        return res.status(200).json({
          data: decamelizeKeys(admin),
        });
      }
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
