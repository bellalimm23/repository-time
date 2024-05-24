import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json({ Boom: 'API is Working' });
  const method = req.method;
  if (method === 'GET') {
  } else if (method === 'PUT') {
  } else if (method === 'DELETE') {
  } else if (method === 'POST') {
  }
}
