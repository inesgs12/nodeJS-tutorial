const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/adbad5c91a502a3ffb3950f8848dfb86/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, response.body.daily.data[0].summary);
    }
  });
};

module.exports = forecast;
