import { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash'; // import debounce function from lodash library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudShowersHeavy, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import './weather.css';
export default function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  // Debounced function to update location when user moves
  const debouncedSetLocation = debounce((newLocation) => setLocation(newLocation), 1000);

  useEffect(() => {
    // Get the user's location using the browser's geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // Use debounced function to update location state
          debouncedSetLocation(newLocation);
        },
        (error) => {
          console.error(error.message);
        }
      );
    }
  }, [debouncedSetLocation]);

  useEffect(() => {
    if (location) {
      async function fetchWeatherData() {
        try {
          const response = await axios.get(`/weather?lat=${location.latitude}&lon=${location.longitude}`);
          setWeatherData(response.data.currentData);
        } catch (error) {
          console.error(error.message);
        }
      }

      fetchWeatherData();
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
    <div>
      {location ? (
        <>
          <p>Your location: {location.latitude}, {location.longitude}</p>
          {weatherData ? (
            <div className="forecast-item">
                <p>{getWeatherIcon(weatherData.description)}</p>
              <p className="description">Description: {weatherData.description}</p>
              <p className="temperature">Temperature: {weatherData.temperature} °C</p>
              <p className="humidity">Humidity: {weatherData.humidity}%</p>
              
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
