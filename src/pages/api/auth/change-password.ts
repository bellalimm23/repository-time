import { middleware } from 'common/server';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

export const ChangePasswordFormSchema = Yup.object({
  oldPassword: Yup.string().required(),
  currentPassword: Yup.string().required(),
  currentPasswordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('currentPassword'), null], 'Password tidak cocok'),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  const user = (await middleware(req, res)) as JwtPayload;
  try {
    if (method === 'PUT') {
      const changePassword = await ChangePasswordFormSchema.validate(body);
      const mahasiswa = await prisma.mahasiswa.findUnique({
        where: { nomorIdentitas: user.nomor_identitas },
      });

      if (mahasiswa) {
        if (mahasiswa.password === changePassword.oldPassword) {
          await prisma.mahasiswa.update({
            where: { nomorIdentitas: user.nomor_identitas },
            data: { password: changePassword.currentPassword },
          });
          return res.status(200).json({
            message: 'Password Berhasil diubah',
          });
        }

        return res.status(400).json({
          message: 'Nomor Identitas atau Password Salah',
        });
      }

      const admin = await prisma.admin.findUnique({
        where: { nomorIdentitas: user.nomor_identitas },
      });
      if (admin) {
        if (admin.password === changePassword.oldPassword) {
          await prisma.admin.update({
            where: { nomorIdentitas: user.nomor_identitas },
            data: { password: changePassword.currentPassword },
          });
          return res.status(200).json({
            message: 'Password Berhasil diubah',
          });
        }

        return res.status(400).json({
          message: 'Password Anda Salah',
        });
      }

      return res.status(404).json({
        message: 'User belum didaftarkan',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
