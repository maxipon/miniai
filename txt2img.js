// This is the function where the call to the API is made. Returns the image as blob.
const axios = require('axios');

async function txt2img(text) {

  // INSERT CODE SNIPPET FROM POSTMAN BELOW
  let data = JSON.stringify({
    "inputs": text,  // <-- use the text passed into the function
  });
  console.log("Data sent to API:", data);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + process.env.ACCESS_TOKEN
    },
    responseType: 'arraybuffer', // Important to handle binary data
    data : data,
  };

  console.log(process.env.ACCESS_TOKEN);

    try {
      const response = await axios.request(config);
      const buffer = Buffer.from(response.data, 'binary');
      const base64Image = buffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;
      return imageUrl;
    }
    catch (error) {
      console.log(error);
    }
}

// Allows for txt2img() to be called outside of this file

module.exports = txt2img;