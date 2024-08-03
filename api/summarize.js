import summarizeText from '../summarize.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const text = req.body.text_to_summarize;
    try {
      const summary = await summarizeText(text);
      res.status(200).json({ summary });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
