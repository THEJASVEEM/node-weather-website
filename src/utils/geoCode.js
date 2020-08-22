const request = require("postman-request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/+" +
    encodeURIComponent(address) +
    "+.json?access_token=pk.eyJ1IjoidGhlamFzdmVlIiwiYSI6ImNrYW56eDBzdjFqYWEyenRkZzIzeHQwdzEifQ.t8EEGZZ13lHQVf0FW_8jZQ&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      // console.log("Unable to connect to location service");
      callback("Unable to connect to internet");
    } else {
      if (body.message) {
        console.log(body.message);
      } else if (body.features[0]) {
        // console.log(
        //   "Longitude: " +
        //     response.body.features[0].center[0] +
        //     "\n" +
        //     "Latitude: " +
        //     response.body.features[0].center[1]
        // );
        callback(undefined, {
          longitude: body.features[0].center[0],
          latitude: body.features[0].center[1],
          location: body.features[0].place_name,
        });
      } else {
        // console.log("No location found");
        callback("No location found");
      }
    }
  });
};

module.exports = geoCode;
