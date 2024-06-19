import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

export const StudentFormSchema = Yup.object({
  nama_depan: Yup.string().required(),
  nama_tengah: Yup.string().default(''),
  nama_belakang: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  program_studi_id: Yup.string().required(),
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
      const student = await StudentFormSchema.validate(body);
      const mahasiswa = await prisma.mahasiswa.update({
        where: { nomorIdentitas: user.nomor_identitas },
        data: {
          deskripsi: student.deskripsi,
          namaBelakang: student.nama_belakang,
          namaDepan: student.nama_depan,
          namaTengah: student.nama_belakang,
          programStudiId: student.program_studi_id,
        },
      });

      return res.status(404).json({
        data: decamelizeKeys(mahasiswa),
        message: 'Profil Berhasil diubah',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
