const express = require('express');
const app = express();
const path = require('path')

const summarizeText = require('./summarize.js');

// Parses JSON bodies (as sent by API clients)
app.use(express.json());

// Serves static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
 // get the text_to_summarize property from the request body
  const text = req.body.text_to_img;

 // call your txt2img function, passing in the text from the request
  txt2img(text) 
    .then(response => {
       res.send(response); // Send the image data as a response to the client
    })
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = app;