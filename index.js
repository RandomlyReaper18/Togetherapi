const express = require('express');
const path = require('path')
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
})

app.get('/together', async (req, res) => {
  const { text } = req.query;
  const payload = {
    "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
    "stop": ["</s>"],
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "min_p": 0.9,
    "messages": [
        {
            "role": "user",
            "content": text
        }
    ]
  }
  const url = 'https://api.together.xyz/v1/chat/completions';
  const headers = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'Authorization': 'Bearer f8e14cded8df9123031c88eb44dac5ec191e60334a657484e741af83b56a9f67'
  };

  try {
    const response = await axios.post(url, payload, { headers });
    res.json({response:response.data.choices[0].message.content});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});