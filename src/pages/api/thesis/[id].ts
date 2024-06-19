import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { ThesisStatusEnum } from 'modules/admin/thesis/components/thesis-form-type';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import {
  MahasiswaResouceLiteModel,
  TugasAkhirResouceModel,
} from '../../../../prisma/resource';

export const ThesisFormSchema = Yup.object({
  judul_tugas_akhir: Yup.string().required(),
  nomor_identitas_mahasiswa: Yup.string().required(),
  abstrak: Yup.string().required(),
  status: Yup.mixed<ThesisStatusEnum>()
    .oneOf(Object.values(ThesisStatusEnum))
    .default(ThesisStatusEnum.pending),
  waktu_terbit: Yup.date().nullable(),
  nomor_identitas_pic: Yup.string().nullable(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  const id = req.query.id as string;

  try {
    const thesis = await prisma.tugasAkhir.findUnique({
      where: {
        id,
      },
      // select: TugasAkhirResouceModel,
      select: {
        abstrak: true,
        id: true,
        judulTugasAkhir: true,
        LampiranTugasAkhir: {
          select: {
            fileUrl: true,
            id: true,
            jenisFile: true,
          },
        },
        mahasiswa: {
          select: MahasiswaResouceLiteModel,
        },
        status: true,
        tanggalDibuat: true,
        nomorIdentitasMahasiswa: true,
        tanggalDiubah: true,
        tanggalTerbit: true,
      },
    });
    if (!thesis) {
      return res.status(404).json({
        message: 'Tugas Akhir tidak dapat ditemukan',
      });
    }

    if (method === 'GET') {
      return res.status(200).json({
        data: decamelizeKeys(thesis),
      });
    }
    const user = (await middleware(req, res)) as JwtPayload;

    const nomor_identitas = user.nomor_identitas;

    if (nomor_identitas !== thesis.nomorIdentitasMahasiswa) {
      return res.status(403).json({
        message: 'Anda tidak di-izinkan mengakses fitur ini',
      });
    }
    if (method === 'PUT') {
      const thesis = await ThesisFormSchema.validate(body);
      const currentTugasAkhir = await prisma.tugasAkhir.update({
        data: {
          abstrak: thesis.abstrak,
          judulTugasAkhir: thesis.judul_tugas_akhir,
          nomorIdentitasMahasiswa: thesis.nomor_identitas_mahasiswa,
          status: thesis.status,
          tanggalTerbit: thesis.waktu_terbit,
        },
        where: { id },
        select: TugasAkhirResouceModel,
      });

      return res.status(200).json({
        data: decamelizeKeys(currentTugasAkhir),
        message: 'Tugas Akhir berhasil diubah',
      });
    } else if (method === 'DELETE') {
      await prisma.tugasAkhir.delete({
        where: {
          id,
          LampiranTugasAkhir: {
            every: { tugasAkhirId: id },
          },
        },
      });
      return res.status(200).json({
        message: 'Tugas Akhir berhasil dihapus',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
