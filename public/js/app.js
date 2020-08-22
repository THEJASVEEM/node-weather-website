const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "From Javascript";

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;

  //   console.log(location);

  messageTwo.textContent = "Loading...";
  messageOne.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      console.log(data);
      if (data.error) {
        // console.log(data.error);
        messageTwo.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.forecast);
        messageOne.textContent = data.location;

        messageTwo.textContent =
          data.forecast.weather_descriptions +
          ". There is a " +
          data.forecast.temperature +
          " degrees out there" +
          "There is a " +
          data.forecast.precip +
          " chance of rain.";
      }
    });
  });
});
