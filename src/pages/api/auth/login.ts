import { generateAccessToken } from 'common/server';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

export const loginFormSchema = Yup.object({
  nomor_identitas: Yup.string().default('').required(),
  password: Yup.string().default('').required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  try {
    const login = await loginFormSchema.validate(body);
    if (method === 'POST') {
      const mahasiswa = await prisma.mahasiswa.findUnique({
        where: { nomorIdentitas: login.nomor_identitas },
      });

      if (mahasiswa) {
        if (mahasiswa.password === login.password) {
          res.status(200).json({
            data: {
              token: generateAccessToken({ ...mahasiswa, type: 'user' }),
            },
            message: 'Mahasiswa Berhasil Login',
          });

          return res.end();
        }

        res.status(400).json({
          message: 'Nomor Identitas atau Password Salah',
        });

        return res.end();
      }

      const admin = await prisma.admin.findUnique({
        where: { nomorIdentitas: login.nomor_identitas },
      });
      if (admin) {
        if (admin.password === login.password) {
          if (admin.status === 'inactive') {
            res.status(400).json({
              message: 'akun tidak di-nonaktifkan, silahkan hubungi admin!',
            });

            return res.end();
          }
          res.status(200).json({
            data: { token: generateAccessToken({ ...admin, type: 'admin' }) },
            message: 'Admin Berhasil Login',
          });

          return res.end();
        }

        res.status(400).json({
          message: 'Nomor Identitas atau Password Salah',
        });

        return res.end();
      }

      res.status(404).json({
        message: 'User belum didaftarkan',
      });

      return res.end();
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });

    return res.end();
  }
}
