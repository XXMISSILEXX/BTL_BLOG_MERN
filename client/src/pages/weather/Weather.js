import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudShowersHeavy, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import './weather.css';

export default function WeatherComponent() {
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error.message);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location) {
      async function fetchForecastData() {
        try {
          const response = await axios.get(`/weather?lat=${location.latitude}&lon=${location.longitude}`);
          const forecastList = response.data.forecastData;
          const forecastData = forecastList.map((item) => ({
            date: item.date,
            description: item.description,
            temperature: item.temperature,
            humidity: item.humidity,
          }));
      
          setForecastData(forecastData);
        } catch (error) {
          console.error(error.message);
        }
      }

      fetchForecastData();
    }
  }, [location]);

  const getWeatherIcon = (description) => {
    switch (description) {
      case 'clear sky':
        return <FontAwesomeIcon icon={faSun} className="weather-icon" />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'overcast clouds':
        return <FontAwesomeIcon icon={faCloud} className="weather-icon" />;
      case 'light rain':
        return <FontAwesomeIcon icon={faCloudRain} className="weather-icon" />; 
      case 'shower rain':
      case 'rain':
      case 'thunderstorm':
        return <FontAwesomeIcon icon={faCloudShowersHeavy} className="weather-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="weather-container">
      {location ? (
        <>
          <p className="location">Your location: {location.latitude}, {location.longitude}</p>
          {forecastData ? (
            <div>
              <h2>Weather Forecast</h2>
              <ul className="forecast-list">
                {forecastData.map((forecast) => (
                  <li key={forecast.date} className="forecast-item">
                    <p className="date-time">Date and time: {forecast.date}</p>
                    <p className="description">{getWeatherIcon(forecast.description)} {forecast.description}</p>
                    <p className="temperature">Temperature: {forecast.temperature} °C</p>
                    <p className="humidity">{forecast.humidity}%</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      ) : (
        <p>Loading your location...</p>
      )}
    </div>
  );
}
