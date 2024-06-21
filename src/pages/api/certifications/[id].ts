import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { SertifikasiResouceModel } from '../../../../prisma/resource';

export const CertificationFormSchema = Yup.object({
  nomor_identitas_mahasiswa: Yup.string().default(''),
  nama_sertifikasi: Yup.string().default(''),
  nama_institusi: Yup.string().required(),
  deskripsi: Yup.string().default(''),
  nilai_akhir: Yup.string().default(''),
  waktu_terbit: Yup.date().nullable().default(null),
  waktu_kadaluarsa: Yup.date().nullable().default(null),
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
    const certification = await prisma.sertifikasi.findUnique({
      where: { id },
      // select: SertifikasiResouceModel,
      select: SertifikasiResouceModel,
    });
    if (!certification) {
      return res.status(404).json({
        message: 'Sertifikasi tidak dapat ditemukan',
      });
    }
    if (method === 'GET') {
      return res.status(200).json({
        data: decamelizeKeys(certification),
      });
    }

    const user = (await middleware(req, res)) as JwtPayload;
    const isAdmin = user.type === 'admin';
    const nomor_identitas = user.nomor_identitas;

    if (nomor_identitas !== certification.nomorIdentitasMahasiswa && !isAdmin) {
      return res.status(403).json({
        message: 'Anda tidak di-izinkan mengakses fitur ini',
      });
    }

    if (method === 'PUT') {
      const certification = await CertificationFormSchema.validate(body);

      if (certification.lampiran.length) {
        await prisma.$transaction([
          prisma.lampiranSertifikasi.deleteMany({
            where: { sertifikasiId: id },
          }),
          prisma.lampiranSertifikasi.createMany({
            data: certification.lampiran.map((file) => {
              return {
                fileUrl: file,
                id: generateId(),
                jenisFile: 'application/pdf',
                sertifikasiId: id,
              };
            }),
          }),
        ]);
      }

      const currentCertification = await prisma.sertifikasi.update({
        data: {
          namaInstitusi: certification.nama_institusi,
          deskripsi: certification.deskripsi,
          namaSertifikasi: certification.nama_sertifikasi,
          nilaiAkhir: certification.nilai_akhir,
          nomorIdentitasMahasiswa: certification.nomor_identitas_mahasiswa,
          skills: certification.skills.join('|'),
          tanggalKadaluarsa: certification.waktu_kadaluarsa,
          tanggalTerbit: certification.waktu_terbit,
        },
        where: { id },
        select: SertifikasiResouceModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(currentCertification),
        message: 'Sertifikasi berhasil diubah',
      });
    } else if (method === 'DELETE') {
      await prisma.sertifikasi.delete({
        where: {
          id,
          LampiranSertifikasi: {
            every: { sertifikasiId: id },
          },
        },
      });
      return res.status(200).json({
        message: 'Sertifikasi berhasil dihapus',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
