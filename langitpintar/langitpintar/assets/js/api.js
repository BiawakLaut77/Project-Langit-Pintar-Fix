"use strict";

const apiKey = "984740315bcac48233e130f9aa8240e4";

export const fetchData = async function (URL, callback) {
  try {
    const response = await fetch(`${URL}&appid=${apiKey}`);
    const data = await response.json();
    callback(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
  },
  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
  },
  airPollution(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
  },
  reverseGeo(lat, lon) {
    return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
  },
  geo(query) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  },
};
