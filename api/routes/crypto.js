const router = require("express").Router();
const axios = require('axios');


router.get('/', async (req, res) => {
  // Make a GET request to the CoinMarketCap API
  const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': '6b10fb3b-da24-4584-8488-f3221a377ccf' // Replace with your API key
    },
    params: {
        limit: 10
      }
  });

  // Extract the cryptocurrency data from the API response
  const cryptocurrencies = response.data.data.slice(0, 10);
// Iterate over each cryptocurrency and make a separate request to retrieve its icon URL
  const updatedCryptocurrencies = await Promise.all(cryptocurrencies.map(async (crypto) => {
    const iconResponse = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${crypto.id}`, {
      headers: {
        'X-CMC_PRO_API_KEY': '6b10fb3b-da24-4584-8488-f3221a377ccf' // Replace with your API key
      }
    });

    return {
      ...crypto,
      iconUrl: iconResponse.data.data[crypto.id].logo
    };
  }));

  // Send the updated cryptocurrency data as the response
  res.json(updatedCryptocurrencies);
});

module.exports = router;
