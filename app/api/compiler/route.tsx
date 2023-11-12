import { NextApiRequest, NextApiResponse } from 'next';

const API_HOST = 'http://localhost'; // Ganti dengan host Anda jika berbeda
const API_PORT = 3001;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const code = req.body.code;

    try {
      const response = await fetch(`${API_HOST}:${API_PORT}/api/compiler`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.text();
      res.status(200).send(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan saat mengirim kode ke server Express.');
    }
  } else {
    res.status(405).end();
  }
};