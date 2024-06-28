import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import {
  MahasiswaResouceLiteModel,
  MahasiswaResouceModel,
} from '../../../../prisma/resource';

export const StudentFormSchema = Yup.object({
  nomor_identitas: Yup.string().default(''),
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

  try {
    if (method === 'GET') {
      const mahasiswa = await prisma.mahasiswa.findMany({
        select: MahasiswaResouceLiteModel,
      });
      res.status(200).json({
        data: decamelizeKeys(mahasiswa),
      });
      return res.end();
    }
    await middleware(req, res, true);
    if (method === 'POST') {
      const currentMahasiswa = await StudentFormSchema.validate(body);
      const mahasiswa = await prisma.mahasiswa.create({
        data: {
          deskripsi: currentMahasiswa.deskripsi,
          namaBelakang: currentMahasiswa.nama_belakang,
          namaDepan: currentMahasiswa.nama_depan,
          namaTengah: currentMahasiswa.nama_tengah,
          programStudiId: currentMahasiswa.program_studi_id,
          nomorIdentitas: currentMahasiswa.nomor_identitas,
          password: '123456',
          photoUrl: `https://srxjxwfnbpkiieeyxpux.supabase.co/storage/v1/object/public/repository/photo-profile/${currentMahasiswa.nomor_identitas}.png`,
        },
        select: MahasiswaResouceModel,
      });
      res.status(200).json({
        data: decamelizeKeys(mahasiswa),
        message:
          'Mahasiswa Berhasil Ditambah, untuk default passwordnya 123456',
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
