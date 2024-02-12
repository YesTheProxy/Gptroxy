const express = require('express');
const request = require('request');

const app = express();

// Serve the HTML form with a personalized welcome message
app.get('/', (req, res) => {
  const welcomeMessage = "Welcome to My Proxy Website! Enter the URL you want to access below:";
  
  res.send(`
    <html>
      <head>
        <style>
          body {
            background-color: #f2f2f2;
            font-family: Arial, sans-serif;
            text-align: center;
          }
          
          h1 {
            color: #333;
            margin-top: 40px;
          }
          
          form {
            margin-top: 20px;
          }
          
          input[type="text"] {
            padding: 10px;
            font-size: 16px;
          }
          
          button[type="submit"] {
            padding: 10px 20px;
            font-size: 16px;
            background-color: #333;
            color: #fff;
            border: none;
            cursor: pointer;
          }
          
          button[type="submit"]:hover {
            background-color: #555;
          }
        </style>
      </head>
      <body>
        <h1>${welcomeMessage}</h1>
        <form action="/proxy" method="post">
          <input type="text" name="url" placeholder="Enter URL">
          <br>
          <button type="submit">Go</button>
        </form>
      </body>
    </html>
  `);
});

// Handle the proxy request
app.post('/proxy', (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).send('Missing target URL');
  }

  // Forward the request to the target URL
  req.pipe(request(url)).pipe(res);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
