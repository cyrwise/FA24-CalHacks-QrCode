import QRCode from 'qrcode';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { badgeId } = req.body;

    try {
      const qrCodeUrl = await QRCode.toDataURL(`http://localhost:3000/profile/${badge.id}`);
      res.status(200).json({ qrCodeUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate QR code' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
