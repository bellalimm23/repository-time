import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { MahasiswaResouceModel } from '../../../../prisma/resource';

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
  const id = req.query.id as string;
  const body = req.body;
  try {
    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: { nomorIdentitas: id },
      select: MahasiswaResouceModel,
    });

    if (!mahasiswa) {
      return res.status(404).json({
        message: 'Data tidak ditemukan',
      });
    }
    if (method === 'GET') {
      return res.status(200).json({
        data: decamelizeKeys(mahasiswa),
      });
    }
    await middleware(req, res, true);
    if (method === 'PUT') {
      const currentMahasiswa = await StudentFormSchema.validate(body);
      const mahasiswa = await prisma.mahasiswa.update({
        where: { nomorIdentitas: id },
        data: {
          deskripsi: currentMahasiswa.deskripsi,
          namaBelakang: currentMahasiswa.nama_belakang,
          namaDepan: currentMahasiswa.nama_depan,
          namaTengah: currentMahasiswa.nama_tengah,
          programStudiId: currentMahasiswa.program_studi_id,
        },
        select: MahasiswaResouceModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(mahasiswa),
        message: 'Mahasiswa Berhasil diubah',
      });
    } else if (method === 'DELETE') {
      return res.status(200).json({
        message: 'Mahasiswa Berhasil dihapus',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
