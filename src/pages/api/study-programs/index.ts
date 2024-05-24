import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../../prisma';
import {
  ProgramStudiResouceLiteModel,
  ProgramStudiResouceModel,
} from '../../../../prisma/resource';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  try {
    if (method === 'GET') {
      const studyPrograms = await prisma.programStudi.findMany({
        select: ProgramStudiResouceLiteModel,
      });
      return res.status(200).json({
        data: decamelizeKeys(studyPrograms),
      });
    } else if (method === 'POST') {
      const studyProgram = await prisma.programStudi.create({
        data: {
          id: '',
          kode: '',
          nama: '',
        },
        select: ProgramStudiResouceModel,
      });

      return res.status(200).json({
        data: decamelizeKeys(studyProgram),
        message: 'Program studi berhasil dibuat',
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
