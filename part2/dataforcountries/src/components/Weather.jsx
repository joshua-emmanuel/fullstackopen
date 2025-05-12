import { useEffect, useState } from "react";

export default function Weather({ city }) {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const WEATHER_API_KEY = import.meta.env.VITE_API_KEY;
  const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(function () {
    async function getWeather() {
      try {
        const url = `${WEATHER_API_URL}/?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
        const res = await fetch(url);
        if (!res.ok)
          throw new Error(
            "Something went wrong with fetching the weather details..."
          );
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    setIsLoading(true);
    getWeather();
  }, []);

  if (!weather && !error && !isLoading) return null;

  const weatherIcon = weather?.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <>
      {isLoading && <p>Loading weather details...</p>}
      {error && <p>📛 {error}</p>}
      {!isLoading && !error && (
        <div>
          <h2>Weather in {city}</h2>
          <p>Temperature {weather.main.temp} celsius</p>
          <img
            src={weatherIconUrl}
            alt={`Weather icon of ${weather.weather[0].description}`}
          />
          <p>Wind {weather.wind.speed}m/s</p>
        </div>
      )}
    </>
  );
}
