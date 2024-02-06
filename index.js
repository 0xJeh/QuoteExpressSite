// index.js

const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/quote', (req, res) => {

  const options = {
    hostname: 'api.quotable.io',
    port: 80,
    path: '/random',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const request = http.request(options, (apiResponse) => {
    let data = '';

    apiResponse.on('data', (chunk) => {
      data += chunk;
    });

    apiResponse.on('end', () => {
      try {
        const { content, author } = JSON.parse(data);
        res.json({ content, author });
      } catch (error) {
        console.error('Error parsing quote:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  });

  request.on('error', (error) => {
    console.error('Error fetching quote:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  request.end();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
