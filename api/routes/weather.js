const axios = require('axios');
const router = require("express").Router();

// Weather API route
router.get('/', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = 'b741dcfebd8b3d2bcc857777cf2ff622';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl);
    
    // Extract the list of forecasted weather data from the response
    const forecastData = response.data.list.map((forecast) => ({
      date: forecast.dt_txt,
      temperature: forecast.main.temp,
      humidity: forecast.main.humidity,
      description: forecast.weather[0].description
    }));

    // Extract the current weather data from the first item in the forecast data array
    const currentData = forecastData.length > 0 ? forecastData[0] : null;

    res.json({ currentData, forecastData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Unable to fetch weather forecast' });
  }
});

module.exports = router;
