const axios = require('axios');
const router = require("express").Router();

// Weather API route
router.get('/', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = '3988241cbc46aad348899d51e1852bc7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    
    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description
    };
    
    res.json(weatherData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Unable to fetch weather data' });
  }
});

module.exports = router;
