import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../prisma';
import { ProgramStudiResouceModel } from '../../../../prisma/resource';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const id = req.body.id as string;
  try {
    const studyProgram = await prisma.programStudi.findUnique({
      where: { id },
      select: ProgramStudiResouceModel,
    });
    if (!studyProgram) {
      return res.status(404).json({
        message: 'Program studi tidak dapat ditemukan',
      });
    }
    if (method === 'GET') {
      return res.status(200).json({
        data: decamelizeKeys(studyProgram),
      });
    } else if (method === 'PUT') {
      const currentStudyProgram = await prisma.programStudi.update({
        data: {
          kode: '',
          nama: '',
        },
        where: {
          id,
        },
        select: ProgramStudiResouceModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(currentStudyProgram),
        message: 'Program Studi Berhasil diubah',
      });
    } else if (method === 'DELETE') {
      const mahasiswaLength = studyProgram.Mahasiswa.length;
      if (mahasiswaLength) {
        return res.status(400).json({
          message: `Program studi tidak dapat dihapus, terdapat ${mahasiswaLength} mahasiswa`,
        });
      }

      return res.status(200).json({
        message: 'Program studi berhasil dihapus',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
