import React, { FC, useState } from 'react';
import axios from 'axios';
const API_KEY = '6e8c3764ba08fed00822d9c7ba7db712';

type WeatherData = {
  temp: number;
  rain: boolean;
  description: string;
};

type Props = {
  temp: number;
  rain: boolean;
};

const Weather: FC<Props> = ({ temp, rain }) => {

  const [location, setLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      const { main, weather } = response.data;

      const temp = main.temp;
      const rain = weather.some((w: { main: string }) => w.main === 'Rain');
      const description = weather[0].description;

      setWeatherData({ temp, rain, description });
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim() === '') {
      setError('Please enter a location.');
      return;
    }
    fetchWeatherData();
  };

  return (
    <div className="basis-1/3 bg-blue-200 h-calc(100vh-3.75rem) p-4 mt-2 max-w-lg rounded overflow-hidden shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Weather Forecast</h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            placeholder="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-2 focus:outline-none"
          >
            Search
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {weatherData && (
          <div>
            <p>Current Temperature: {weatherData.temp}°C</p>
            <p>Expected Rain: {weatherData.rain ? 'Yes' : 'No'}</p>
            <p className="overflow-auto">
              Today's weather forecast: {weatherData.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
