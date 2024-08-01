const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

const prompt = document.getElementById("text_to_img");
const submitPromptImg = document.getElementById("submit-button-img");
const imgArea = document.getElementById("img");

prompt.addEventListener("input", verifyPromptLength);
submitPromptImg.addEventListener("click", submitPrompt);
submitPromptImg.disabled = true;

// First, we disable the submit button by default when the user loads the website.
submitButton.disabled = true;
textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);


// Next, we define a function called verifyTextLength(). This function will be called when the user enters something in the text area. It receives an event, called ‘e’ here
function verifyTextLength(e) {

  // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called ‘textarea’
  const textarea = e.target;

  // Check if the text in the text area is the right length - between 200 and 100,000 characters
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    // If it is, we enable the submit button.
    submitButton.disabled = false;
  } else {
    // If it is not, we disable the submit button.
    submitButton.disabled = true;
  }
}

function verifyPromptLength(e) {

  // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called ‘textarea’
  const textimg = e.target;

  if (textimg.value.length > 5 && textimg.value.length < 10000) {
    // If it is, we enable the submit button.
    submitPromptImg.disabled = false;
  } else {
    // If it is not, we disable the submit button.
    submitPromptImg.disabled = true;
  }
}

function submitData(e) {

  // This is used to add animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('Authorization', 'Bearer ' + process.env['ACCESS_TOKEN']);

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Send the text to the server using fetch API

  const summarize = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";
  // Note - here we can omit the “baseUrl” we needed in Postman and just use a relative path to “/summarize” because we will be calling the API from our Replit!  
  fetch(summarize, requestOptions)
    .then(response => response.text()) // Response will be summarized text
    .then(summary => {
      // Do something with the summary response from the back end API!

      // Update the output text area with new summary
      summarizedTextArea.value = summary;

      // Stop the spinning loading animation
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log(error.message);
    });
}

function submitPrompt(e) {

  // This is used to add animation to the submit button
  submitPromptImg.classList.add("submit-button--loading");

  const text_to_img = prompt.value;

  // INSERT CODE SNIPPET FROM POSTMAN BELOW
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('Authorization', 'Bearer ' + process.env['ACCESS_TOKEN']);

  const raw = JSON.stringify({
    "inputs": text_to_img
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
   };

  // Send the text to the server using fetch API

  const txt2img = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";
  
  fetch(txt2img, requestOptions)
    .then(response => response.blob()) // Response will be an image
    .then((blob) => {
      // Do something with the image response from the back end API!
      const url = URL.createObjectURL(blob);
      imgArea.src = url;
      // Stop the spinning loading animation
      submitPromptImg.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log(error.message);
    });
}