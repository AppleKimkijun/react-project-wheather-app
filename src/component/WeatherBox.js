import React from "react";

const WeatherBox = ({weather}) => {
    console.log("weather",weather)
  return (
    <div className="weather_box">
      <div>{weather?.name}</div>
      <h2>{weather?.main.temp}°C</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
