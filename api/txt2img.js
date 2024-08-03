import txt2img from '../txt2img.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const text = req.body.input;
    try {
      const imageUrl = await txt2img(text);
      res.status(200).json({ imageUrl });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}