import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
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
  const nomor_identitas = req.query.nomor_identitas as string | undefined;

  try {
    if (method === 'GET') {
      const experiences = await prisma.pengalaman.findMany({
        select: PengalamanResouceModel,
        where: {
          nomorIdentitasMahasiswa: nomor_identitas,
        },
      });
      return res.status(200).json({
        data: decamelizeKeys(experiences),
      });
    }
    await middleware(req, res);
    if (method === 'POST') {
      const currentExperience = await ExperienceFormSchema.validate(body);
      const experience = await prisma.pengalaman.create({
        data: {
          id: generateId(),
          deskripsi: currentExperience.deskripsi,
          lokasi: currentExperience.lokasi,
          namaPerusahaan: currentExperience.nama_perusahaan,
          posisi: currentExperience.posisi,
          skills: currentExperience.skills.join('|'),
          nomorIdentitasMahasiswa: currentExperience.nomor_identitas_mahasiswa,
          tanggalMulai: currentExperience.waktu_mulai,
          tanggalSelesai: currentExperience.waktu_selesai,
          LampiranPengalaman: {
            createMany: {
              data: [],
            },
          },
        },
        select: PengalamanResouceModel,
      });

      return res.status(200).json({
        data: decamelizeKeys(experience),
        message: 'Pengalaman berhasil dibuat',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
