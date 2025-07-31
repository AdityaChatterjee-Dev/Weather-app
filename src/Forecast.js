import React from 'react';

function Forecast({ data }) {
  if (!data || !data.list || data.list.length === 0) {
    return <p>No forecast data available.</p>;
  }

  const current = data.list[0];
  const dailyData = data.list.filter((_, index) => index % 8 === 0);

  const getIcon = (weather) => {
    const icons = {
      Rain: '🌧️',
      Clouds: '☁️',
      Clear: '☀️',
      Snow: '❄️',
      Thunderstorm: '⛈️',
    };
    return icons[weather] || '🌈';
  };

  return (
    <>
      <div className="main-card">
        <h3>{data.city?.name || "Unknown City"}</h3>
        <p>{new Date(current.dt * 1000).toLocaleDateString()}</p>
        <p className="weather">{getIcon(current.weather?.[0]?.main)} {current.weather?.[0]?.main || "N/A"}</p>
        <p className="temp">{Math.round(current.main?.temp ?? 0)}°C</p>
        <p>💧 Humidity: {current.main?.humidity ?? 0}%</p>
        <p>💨 Wind: {current.wind?.speed ?? 0} m/s</p>
        <p>🧭 Direction: {current.wind?.deg ?? 0}°</p>
        <p>🌡️ Feels like: {Math.round(current.main?.feels_like ?? 0)}°C</p>
        <p>🌦️ Precipitation: {current.pop !== undefined ? Math.round(current.pop * 100) : 0}%</p>
      </div>

      <div className="forecast-row">
        {dailyData.slice(1, 6).map((day, index) => (
          <div className="small-card" key={index}>
            <p>{new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}</p>
            <p>{getIcon(day.weather?.[0]?.main)} {day.weather?.[0]?.main || "N/A"}</p>
            <p>{Math.round(day.main?.temp ?? 0)}°C</p>
            <p>💧 {day.main?.humidity ?? 0}%</p>
            <p>💨 {day.wind?.speed ?? 0} m/s</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Forecast;
