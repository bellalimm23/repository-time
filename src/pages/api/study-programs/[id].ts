import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { ProgramStudiResouceModel } from '../../../../prisma/resource';

export const StudyProgramFormSchema = Yup.object({
  nama_program_studi: Yup.string().required(),
  kode_program_studi: Yup.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const id = req.query.id as string;

  const body = req.body;
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
    }

    await middleware(req, res, true);

    if (method === 'PUT') {
      const studyProgram = await StudyProgramFormSchema.validate(body);
      const currentStudyProgram = await prisma.programStudi.update({
        data: {
          kode: studyProgram.kode_program_studi,
          nama: studyProgram.nama_program_studi,
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

      await prisma.programStudi.delete({
        where: { id },
      });

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
