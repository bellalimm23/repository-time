import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  try {
    if (method === 'GET') {
    } else if (method === 'POST') {
    }
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}
