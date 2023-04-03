const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const apiKey = '1d0dec285adf4970bf8998e9034d8807'; // replace with your own API key
  const url = `https://newsapi.org/v2/everything?q=apple&from=2023-04-02&to=2023-04-02&sortBy=popularity&apiKey=${apiKey}`;
  try { 
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting news API');
  }
});

module.exports = router;
