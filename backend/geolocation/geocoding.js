//Imports:
const request = require("request");

//Variables:
const accessToken =
  "pk.eyJ1IjoicGF0ZnVnMyIsImEiOiJjbGd0cGZycTIwN3l2M2RxbWsxYWpjMHN2In0.KlgK-F79Eds0DeVyJD2U6A";

//Geocoding:
const geocoding = (address, callback) => {
  request(
    {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${accessToken}`,
      json: true,
    },
    (error, response) => {
      //Handling errors
      if (error) {
        return callback("There was an error with location servers.", undefined);
      }
      //Handing missing data
      if (response.body.features.length === 0) {
        return callback("Unable to find location", undefined);
      }

      //Returning Data
      return callback(undefined, {
        location: response.body.features[0].place_name,
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
      });
    }
  );
};

//Exports
module.exports = geocoding;
