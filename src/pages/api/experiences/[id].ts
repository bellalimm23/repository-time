import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { PengalamanResouceModel } from '../../../../prisma/resource';

export const ExperienceFormSchema = Yup.object({
  nomor_identitas_mahasiswa: Yup.string().required(),
  posisi: Yup.string().default(''),
  nama_perusahaan: Yup.string().required(),
  lokasi: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  waktu_mulai: Yup.date().nullable().default(null),
  waktu_selesai: Yup.date().nullable().default(null),
  skills: Yup.array(Yup.string().default('')).default([]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  const id = req.query.id as string;

  try {
    const pengalaman = await prisma.pengalaman.findUnique({
      where: {
        id,
      },
      select: PengalamanResouceModel,
    });
    if (!pengalaman) {
      return res.status(404).json({
        message: 'Pengalaman tidak dapat ditemukan',
      });
    }
    if (method === 'GET') {
      return res.status(200).json({
        data: decamelizeKeys(pengalaman),
      });
    }
    const user = (await middleware(req, res)) as JwtPayload;

    const nomor_identitas = user.nomor_identitas;

    if (nomor_identitas !== pengalaman.nomorIdentitasMahasiswa) {
      return res.status(403).json({
        message: 'Anda tidak di-izinkan mengakses fitur ini',
      });
    }

    if (method === 'PUT') {
      const pengalaman = await ExperienceFormSchema.validate(body);

      await prisma.lampiranPengalaman.deleteMany({
        where: { pengalamanId: id },
      });

      const currentExperience = await prisma.pengalaman.update({
        data: {
          posisi: pengalaman.posisi,
          lokasi: pengalaman.lokasi,
          deskripsi: pengalaman.deskripsi,
          nomorIdentitasMahasiswa: pengalaman.nomor_identitas_mahasiswa,
          skills: pengalaman.skills.join('|'),
          tanggalMulai: pengalaman.waktu_mulai,
          tanggalSelesai: pengalaman.waktu_selesai,
          LampiranPengalaman: {
            createMany: {
              data: [],
            },
          },
        },
        where: { id },
        select: PengalamanResouceModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(currentExperience),
        message: 'Pengalaman berhasil diubah',
      });
    } else if (method === 'DELETE') {
      await prisma.pengalaman.delete({
        where: {
          id,
          LampiranPengalaman: {
            every: { pengalamanId: id },
          },
        },
      });
      return res.status(200).json({
        message: 'Pengalaman berhasil dihapus',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
