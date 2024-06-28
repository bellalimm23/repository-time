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
      res.status(404).json({
        message: 'Data tidak ditemukan',
      });
      return res.end();
    }
    if (method === 'GET') {
      res.status(200).json({
        data: decamelizeKeys(mahasiswa),
      });
      return res.end();
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
      res.status(200).json({
        data: decamelizeKeys(mahasiswa),
        message: 'Mahasiswa Berhasil diubah',
      });
      return res.end();
    } else if (method === 'DELETE') {
      const deleteData = { nomorIdentitasMahasiswa: id };
      await prisma.$transaction([
        prisma.lampiranOrganisasi.deleteMany({
          where: { organisasi: deleteData },
        }),
        prisma.lampiranPendidikan.deleteMany({
          where: { pendidikan: deleteData },
        }),
        prisma.lampiranPengalaman.deleteMany({
          where: { pengalaman: deleteData },
        }),
        prisma.lampiranSertifikasi.deleteMany({
          where: { sertifikasi: deleteData },
        }),
        prisma.lampiranTugasAkhir.deleteMany({
          where: { tugasAkhir: deleteData },
        }),
        prisma.organisasi.deleteMany({
          where: deleteData,
        }),
        prisma.pendidikan.deleteMany({
          where: deleteData,
        }),
        prisma.pengalaman.deleteMany({
          where: deleteData,
        }),
        prisma.sertifikasi.deleteMany({
          where: deleteData,
        }),
        prisma.tugasAkhir.deleteMany({
          where: deleteData,
        }),
        prisma.mahasiswa.delete({
          where: { nomorIdentitas: id },
        }),
      ]);
      res.status(200).json({
        message: 'Mahasiswa Berhasil dihapus',
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
