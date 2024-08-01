const app = require('./app');

const port = process.env.PORT || 3000;

require('dotenv').config();

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

