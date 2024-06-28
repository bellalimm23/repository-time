import { generateAccessToken } from 'common/server';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

export const RegisterFormSchema = Yup.object({
  nama_depan: Yup.string().required(),
  nama_tengah: Yup.string().default(''),
  nama_belakang: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  program_studi_id: Yup.string().required(),
  password: Yup.string().required(),
  nomor_identitas: Yup.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  try {
    if (method === 'POST') {
      const register = await RegisterFormSchema.validate(body);
      const mahasiswa = await prisma.mahasiswa.create({
        data: {
          nomorIdentitas: register.nomor_identitas,
          deskripsi: register.deskripsi,
          namaBelakang: register.nama_belakang,
          namaDepan: register.nama_depan,
          namaTengah: register.nama_tengah,
          password: register.password,
          photoUrl: `https://srxjxwfnbpkiieeyxpux.supabase.co/storage/v1/object/public/repository/photo-profile/${register.nomor_identitas}.png`,
          programStudiId: register.program_studi_id,
        },
      });

      res.status(200).json({
        data: { token: generateAccessToken({ ...mahasiswa, type: 'user' }) },
        message: 'Mahasiswa telah berhasil terdaftar',
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
