const express = require('express');
const app = express();
const path = require('path')

const summarizeText = require('./summarize.js');
const txt2img = require('./txt2img.js');

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

// Handle POST requests to the '/summarize' endpoint
app.post('/summarize', (req, res) => {
 // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

 // call your summarizeText function, passing in the text from the request
  summarizeText(text) 
    .then(response => {
       res.send(response); // Send the summary text as a response to the client
    })
    .catch(error => {
      console.log(error.message);
    });
});

app.post('/txt2img', (req, res) => {
 // get the text_to_img property from the request body
  const text = req.body.input;
  console.log("Received data at /txt2img:", text);

 // call your txt2img function, passing in the text from the request
  txt2img(text) 
    .then(imageUrl => {
       res.send({ imageUrl }); // Send the image URL as a response to the client
    })
    .catch(error => {
      console.log(error.message);
      res.status(500).send('Error generating image');
    });
});

module.exports = app;