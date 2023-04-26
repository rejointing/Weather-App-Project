//imports
const request = require("request");

//variables
const accessToken = "89e65f582be54f499187ae88bca9743e";

const forecast = (latitude, Longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

  request({ url, json: true }, (error, { body }) => {
    //Handling errors
    if (error) {
      return callback("There was an error with location servers.", undefined);
    }
    //Handing missing data
    if (body.error) {
      return callback("Unable to find location", undefined);
    }
    //Returning Data
    callback(undefined, {
      temperature: body.currently.temperature,
      humidity: body.currently.humidity,
      pressure: body.currently.pressure,
    });
  });
};

//Exports
module.exports = forecast;
