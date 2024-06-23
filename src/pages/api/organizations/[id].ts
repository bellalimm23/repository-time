import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { OrganisasiResouceModel } from '../../../../prisma/resource';

export const OrganizationFormSchema = Yup.object({
  nomor_identitas_mahasiswa: Yup.string().default(''),
  nama_organisasi: Yup.string().required(),
  pengalaman_id: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  posisi: Yup.string().default(''),
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
    const organization = await prisma.organisasi.findUnique({
      where: {
        id,
      },
      select: OrganisasiResouceModel,
    });
    if (!organization) {
      return res.status(404).json({
        message: 'Organisasi tidak dapat ditemukan',
      });
    }
    if (method === 'GET') {
      return res.status(200).json({
        data: decamelizeKeys(organization),
      });
    }
    const user = (await middleware(req, res)) as JwtPayload;
    const isAdmin = user.type === 'admin';

    const nomor_identitas = user.nomor_identitas;

    if (nomor_identitas !== organization.nomorIdentitasMahasiswa && !isAdmin) {
      return res.status(403).json({
        message: 'Anda tidak di-izinkan mengakses fitur ini',
      });
    }

    if (method === 'PUT') {
      const organization = await OrganizationFormSchema.validate(body);

      if (organization.lampiran.length) {
        await prisma.$transaction([
          prisma.lampiranOrganisasi.deleteMany({
            where: { organisasiId: id },
          }),
          prisma.lampiranOrganisasi.createMany({
            data: organization.lampiran.map((file) => {
              return {
                fileUrl: file,
                id: generateId(),
                jenisFile: 'application/pdf',
                organisasiId: id,
              };
            }),
          }),
        ]);
      }

      const currentOrganization = await prisma.organisasi.update({
        data: {
          deskripsi: organization.deskripsi,
          nama: organization.nama_organisasi,
          posisi: organization.posisi,
          skills: organization.skills.join('|'),
          tanggalMulai: organization.waktu_mulai,
          tanggalSelesai: organization.waktu_selesai,
        },
        where: { id },
        select: OrganisasiResouceModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(currentOrganization),
        message: 'Organisasi berhasil diubah',
      });
    } else if (method === 'DELETE') {
      await prisma.organisasi.delete({
        where: {
          id,
          LampiranOrganisasi: {
            every: { organisasiId: id },
          },
        },
      });
      return res.status(200).json({
        message: 'Organisasi berhasil dihapus',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
