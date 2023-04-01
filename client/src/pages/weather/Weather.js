import { useState, useEffect } from 'react';
import axios from 'axios';

export default function WeatherComponent() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Get the user's location using the browser's geolocation API
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

    // Make API request when location is set
    if (location) {
      async function fetchWeatherData() {
        try {
          const response = await axios.get(`/weather?lat=${location.latitude}&lon=${location.longitude}`);
          setWeatherData(response.data);
        } catch (error) {
          console.error(error.message);
        }
      }
      fetchWeatherData();
    }
  }, [location]);

  return (
    <div>
      {location ? (
        <>
          <p>Your location: {location.latitude}, {location.longitude}</p>
          {weatherData ? (
            <div>
              <p>Temperature: {weatherData.temperature} °C</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Description: {weatherData.description}</p>
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
