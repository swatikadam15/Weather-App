import React, { useState } from "react";
const api = {
  key: "9e27e108b3f1c8b5678baf3572897f3d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [city, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter")
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setQuery("");
          console.log(data);
        });
  };
  return (
    <div
      className={
        typeof city.main != "undefined"
          ? city.main.temp > 20
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof city.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {city.name},{city.sys.country}
              </div>
            </div>

            <div className="weather-box">
              <div className="temp">{Math.round(city.main.temp)}°c</div>
              <div className="weather">{city.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
