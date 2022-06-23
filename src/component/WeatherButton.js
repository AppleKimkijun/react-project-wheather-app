import React from "react";

const WeatherButton = ({ cities, setCity ,handleCityChange }) => {
  // console.log(cities)
  return (
    <div className="bt">
      {/* <button variant="warning" onClick={() => handleCityChange("current")}>Current Location</button> */}

      {cities.map((item, index) => (
        <button
        key={index}
        onClick={() => setCity(item)}>
          {item}
        </button>
      ))}
    </div>
  );
};

export default WeatherButton;
