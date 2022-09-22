import "./styles/resets.scss";
import "./styles/style.scss";
import {
  validateDate,
  validateZipCode,
  parseDate,
  getForecast,
} from "./js/app.js";

const generateButton = document.getElementById("generate");

generateButton.addEventListener("click", () => {
  const zipCode = document.getElementById("zip").value;
  const date = document.getElementById("date").value;
  if (!validateZipCode(zipCode) || !validateDate(date)) {
    return;
  }
  getForecast(zipCode, parseDate(date))
    .then((data) => {
      document
        .getElementById("forecast")
        .setAttribute("style", "background-color: #9e9e9e");
      document.getElementById("title").innerHTML = "Weather Forecast";
      document.getElementById(
        "tempHigh"
      ).innerHTML = `High temperature: ${Math.round(
        parseInt(data.weather.high_temp)
      )} degrees`;
      document.getElementById(
        "tempLow"
      ).innerHTML = `Low temperature: ${Math.round(
        parseInt(data.weather.low_temp)
      )} degrees`;
      document.getElementById("city").innerHTML = `City: ${data.cityName}`;
      document.getElementById("state").innerHTML = `State: ${data.stateName}`;
      document.getElementById(
        "timezone"
      ).innerHTML = `Timezone: ${data.timezone}`;
      document.getElementById("photo").src = data.picture;
    })
    .catch((err) => {
      console.log(err);
    });
});
