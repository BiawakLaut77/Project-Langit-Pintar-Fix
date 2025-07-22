"use strict";

import { updateWeather, error404 } from "./app.js";

const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474";

const currentLocation = async function () {
  try {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    updateWeather(`lat=${latitude}`, `lon=${longitude}`);
  } catch (error) {
    window.location.hash = defaultLocation;
  }
};

const searchedLocation = function (query) {
  updateWeather(...query.split("&"));
};

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation],
]);

const checkHash = function () {
  const requestURL = window.location.hash.slice(1);

  const [route, query] = requestURL.includes("?")
    ? requestURL.split("?")
    : [requestURL];

  const routeHandler = routes.get(route);
  routeHandler ? routeHandler(query) : error404();
};

const getCurrentPosition = function () {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
  if (!window.location.hash) {
    window.location.hash = "#/current-location";
  } else {
    checkHash();
  }
});
