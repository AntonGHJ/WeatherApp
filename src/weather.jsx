import React, { useState } from "react";
import "../src/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSearch,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const APIKey = "974b51be3ddcbfe31470985770052831";

  const handleSearch = () => {
    if (city === "") return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          setError(true);
          setWeatherData(null);
        } else {
          setError(false);
          setWeatherData(json);
        }
      });
  };

  const weatherImages = {
    Clear: "./clear.png",
    Rain: "./rain.png",
    Snow: "./snow.png",
    Clouds: "./cloud.png",
    Haze: "./mist.png",
  };

  const getWeatherImage = (weather) => {
    return weatherImages[weather] || "?";
  };

  return (
    <div className="container">
      <div className="search-box">
        <FontAwesomeIcon icon={faLocationDot} fontSize={"28px"} />

        <input
          type="text"
          value={city}
          placeholder="Enter your location"
          onChange={(e) => setCity(e.target.value)}
        />

        <button class="fa-solid fa-magnifying-glass" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
        </button>
      </div>
      {error && (
        <>
          <img src="./404.png" />
          <div className="not-found">City not found :/</div>
        </>
      )}
      {weatherData && (
        <>
          <div className="weather-box">
            <img src={getWeatherImage(weatherData.weather[0].main)} alt="" />
            <div className="temperature">
              {parseInt(weatherData.main.temp)}
              <span>°C</span>
            </div>
            <div className="description">
              {weatherData.weather[0].description}
            </div>
          </div>
          <div className="weather-details">
            <div className="humidity">
              <FontAwesomeIcon icon={faWater} />
              <span style={{ margin: "10px" }}>Humidity: </span>
              <span>{weatherData.main.humidity}%</span>
            </div>
            <div className="wind">
              <FontAwesomeIcon icon={faWind} />
              <span style={{ margin: "10px" }}>Wind: </span>{" "}
              <span>{parseInt(weatherData.wind.speed)}Km/h</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
