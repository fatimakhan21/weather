import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function Weather() {
  const [weatherData, setWeatherData] = useState({
    city: "San Francisco",
    time: "Loading...",
    conditions: "Loading...",
    humidity: 0,
    wind: 0,
    temperature: 0,
    forecast: [],
  });

  useEffect(() => {
    const apiKey = "ef5c282521e544537bfb522d048f133f";
    const city = "Alberton";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then((response) => {
      const data = response.data;
      setWeatherData({
        city: data.name,
        time: new Date(data.dt * 1000).toLocaleString(),
        conditions: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.round(data.main.temp),
        forecast: [
          { day: "Sun", max: 18, min: 14 },
          { day: "Mon", max: 17, min: 14 },
          { day: "Tue", max: 18, min: 14 },
          { day: "Wed", max: 18, min: 14 },
          { day: "Thu", max: 16, min: 12 },
        ],
      });
    });
  }, []);

  return (
    <div className="Weather">
      <h1>{weatherData.city}</h1>
      <ul>
        <li>{weatherData.time}</li>
        <li>{weatherData.conditions}</li>
        <li>Humidity: {weatherData.humidity}%</li>
        <li>Wind: {weatherData.wind} km/h</li>
        <li>{weatherData.temperature}°C</li>
      </ul>
      <div className="forecast">
        {weatherData.forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <strong>{day.day}</strong>
            <p>
              {day.max}°/{day.min}°
            </p>
          </div>
        ))}
      </div>
      <p>
        This project was coded by Fatima Nazreen Khan and is{" "}
        <a
          href="https://github.com/fatimakhan21"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-sourced on GitHub
        </a>{" "}
        and hosted on{" "}
        <a href="https://app.netlify.com/teams/fatimakhan21/sites">Netlify</a>.
      </p>
    </div>
  );
}
