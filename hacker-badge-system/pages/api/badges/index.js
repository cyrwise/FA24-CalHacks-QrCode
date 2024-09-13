// pages/api/badges/index.js

import { PrismaClient } from '@prisma/client';
import QRCode from 'qrcode';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fullName, university, major, graduationDate, github } = req.body;

      const qrCodeUrl = await QRCode.toDataURL(`/profile/${fullName.replace(/\s+/g, '-').toLowerCase()}`);
      // Save to database
      const badge = await prisma.badge.create({
        data: {
          fullName,
          university,
          major,
          graduationDate: new Date(graduationDate),
          github,
          qrCodeUrl,
          profile: {
            create: { fullName, university, major, graduationDate: new Date(graduationDate), github }
          }
        }
      });

      res.status(201).json(badge);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
