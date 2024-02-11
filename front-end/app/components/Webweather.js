import React, { useState, useEffect } from 'react';

const WeatherComponent = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);

  console.log(city);

  useEffect(() => {''
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e93c77502c1ddc4802a0937111ae25b`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    const updateCurrentDateTime = () => {
      const now = new Date();
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString(undefined, dateOptions);
      setCurrentDateTime(`${formattedDate} `);
    };

    fetchWeatherData();
    updateCurrentDateTime();
  }, [city]); // Trigger useEffect whenever 'city' prop changes

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

  return (
    <div className="bg-blue-500 rounded-lg p-2 text-white ml-auto w-56 h-72">
      {weatherData && (
        <>
          <h2 className="font-bold text-center">{weatherData.name}</h2>
          <div className="flex justify-between">
            <p className="text-sm mt-2 mr-4">{currentDateTime}</p>
          </div>
          <div className="flex flex-wrap justify-center mt-4">
            <div className="flex flex-col items-center mr-6">
              <span className="mr-2 text-4xl">&#x1F321;</span>
              <p className="text-sm">Temperature</p>
              <p className="text-sm">{kelvinToCelsius(weatherData.main.temp)} °C</p>
            </div>
            <div className="flex flex-col items-center mr-6">
              <span className="mr-2 text-4xl">&#9729;</span>
              <p className="text-sm">Clouds</p>
              <p className="text-sm">{weatherData.clouds.all}%</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="mr-2 text-4xl">&#x1F4A7;</span>
              <p className="text-sm">Humidity</p>
              <p className="text-sm">{weatherData.main.humidity}%</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherComponent;
