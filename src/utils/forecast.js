const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=2e38c156796d68e1b898ed1968913a99&query=" +
    encodeURIComponent(lat) +
    "," +
    -encodeURIComponent(long);

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      //   console.log("Unable to connect to weather service");
      callback("Unable to connect to weather service");
    } else {
      if (body.error) {
        // console.log(
        //   "Error Code: " +
        //     response.body.error.code +
        //     "\n" +
        //     response.body.error.info
        // );

        callback("Error Code: " + body.error.code + "\n" + body.error.info);
      } else {
        console.log(
          body.current.weather_descriptions[0] +
            "\nThere is a " +
            body.current.temperature +
            " degrees out there.There is a " +
            body.current.precip +
            " chance of rain."
        );

        callback(undefined, {
          weather_descriptions: body.current.weather_descriptions[0],
          temperature: body.current.temperature,
          precip: body.current.precip,
        });
      }
    }
  });
};

module.exports = forecast;
