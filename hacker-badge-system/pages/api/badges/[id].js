import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const badge = await prisma.badge.findUnique({
        where: { id: Number(id) },
      });

      if (badge) {
        res.status(200).json(badge);
      } else {
        res.status(404).json({ error: 'Badge not found' });
      }
    } catch (error) {
      console.error('Error retrieving badge:', error);
      res.status(500).json({ error: 'Error retrieving badge' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
