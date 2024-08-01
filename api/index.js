import express from 'express';
import summarizeText from '../summarize.js';
import txt2img from '../txt2img.js';

const app = express();

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Handle POST requests to the '/summarize' endpoint
app.post('/api/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  summarizeText(text)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('Error summarizing text');
    });
});

// Handle POST requests to the '/txt2img' endpoint
app.post('/api/txt2img', (req, res) => {
  const text = req.body.input;
  console.log("Received data at /txt2img:", text);

  txt2img(text)
    .then(imageUrl => {
      res.send({ imageUrl });
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('Error generating image');
    });
});

export default app;