import React, { useState, useEffect } from 'react';
import './index.css';
import Forecast from './Forecast';


const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [city, setCity] = useState('Lucknow');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const fetchForecast = async () => {
    setError('');
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== '200' || !data.list || data.list.length === 0) {
        setError('City not found or no forecast data available.');
        setForecast(null);
      } else {
        setForecast(data);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setForecast(null);
    }
  };

  useEffect(() => {
    fetchForecast();
  });

  return (
    <>
      <div className="sun"></div>
      <div className="mountains"></div>
      <div className="cloud"></div>
      <div className="cloud" style={{ top: '25%', animationDelay: '10s' }}></div>

      <div className="app">
        <h2 className="title">🌦️ WEATHER FORECAST</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchForecast}>Get Forecast</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  );
}

export default App;
