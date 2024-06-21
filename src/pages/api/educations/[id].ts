import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { PendidikanResouceModel } from '../../../../prisma/resource';

export const EducationFormSchema = Yup.object({
  nomor_identitas_mahasiswa: Yup.string().default(''),
  nama_institusi: Yup.string().required(),
  gelar: Yup.string().default(''),
  bidang_studi: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  nilai_akhir: Yup.string().default(''),
  waktu_mulai: Yup.date().nullable().default(null),
  waktu_selesai: Yup.date().nullable().default(null),
  skills: Yup.array(Yup.string().default('')).default([]),
  lampiran: Yup.array(Yup.string().default('')).default([]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  const id = req.query.id as string;

  try {
    const pendidikan = await prisma.pendidikan.findUnique({
      where: {
        id,
      },
      select: PendidikanResouceModel,
    });
    if (!pendidikan) {
      return res.status(404).json({
        message: 'Pendidikan tidak dapat ditemukan',
      });
    }
    if (method === 'GET') {
      return res.status(200).json({
        data: decamelizeKeys(pendidikan),
      });
    }
    const user = (await middleware(req, res)) as JwtPayload;
    const isAdmin = user.type === 'admin';

    const nomor_identitas = user.nomor_identitas;

    if (nomor_identitas !== pendidikan.nomorIdentitasMahasiswa && !isAdmin) {
      return res.status(403).json({
        message: 'Anda tidak di-izinkan mengakses fitur ini',
      });
    }

    if (method === 'PUT') {
      const pendidikan = await EducationFormSchema.validate(body);

      if (pendidikan.lampiran.length) {
        await prisma.$transaction([
          prisma.lampiranPendidikan.deleteMany({
            where: { pendidikanId: id },
          }),
          prisma.lampiranPendidikan.createMany({
            data: pendidikan.lampiran.map((file) => {
              return {
                fileUrl: file,
                id: generateId(),
                jenisFile: 'application/pdf',
                pendidikanId: id,
              };
            }),
          }),
        ]);
      }

      const currentEducation = await prisma.pendidikan.update({
        data: {
          bidangStudi: pendidikan.bidang_studi,
          deskripsi: pendidikan.deskripsi,
          gelar: pendidikan.gelar,
          namaInstitusi: pendidikan.nama_institusi,
          nilaiAkhir: pendidikan.nilai_akhir,
          nomorIdentitasMahasiswa: pendidikan.nomor_identitas_mahasiswa,
          skills: pendidikan.skills.join('|'),
          tanggalMulai: pendidikan.waktu_mulai,
          tanggalSelesai: pendidikan.waktu_selesai,
        },
        where: { id },
        select: PendidikanResouceModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(currentEducation),
        message: 'Pendidikan berhasil diubah',
      });
    } else if (method === 'DELETE') {
      await prisma.pendidikan.delete({
        where: {
          id,
          LampiranPendidikan: {
            every: { pendidikanId: id },
          },
        },
      });
      return res.status(200).json({
        message: 'Pendidikan berhasil dihapus',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
