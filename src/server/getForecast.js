const axios = require("axios");
const dotEnv = require("dotenv");

dotEnv.config();
const geoNamesUsername = process.env.GEONAMES_USERNAME;
const geoNamesUrl = `http://api.geonames.org/postalCodeSearchJSON`;
const weatherBitApiKey = process.env.WEATHER_BIT_API_KEY;
const weatherBitUrl = `http://api.weatherbit.io/v2.0/`;
const weatherBitForecast = `forecast/daily`;
const weatherBitCurrent = `current`;
const pixabayApiKey = process.env.PIXABAY_API_KEY;
const pixabayUrl = `https://pixabay.com/api/`;
const date = new Date();
const oneWeek = 604800 * 1000; //milliseconds

const getForecast = async (postalCode, travelDate) => {
  if (!postalCode) throw new Error("No postal code was provided.");

  travelDate = parseInt(travelDate);
  const currentDayStartTimestamp = new Date(
    `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
  ).getTime();
  if (typeof travelDate !== "number")
    throw new Error("Invalid travel date provided.");
  if (travelDate - currentDayStartTimestamp < 0)
    throw new Error("travel date is in the past.");

  const { data: geoResults } = await axios.get(
    `${geoNamesUrl}?postalcode=${postalCode}&country=US&maxRows=1&username=${geoNamesUsername}`
  );
  if (!geoResults?.postalCodes || geoResults.postalCodes.length < 1)
    res.status(400).send(`${postalCode} is an invalid postal code`);
  const { lng, lat, adminName1: stateName } = geoResults.postalCodes[0];

  let weatherExtension = weatherBitCurrent;
  if (travelDate - currentDayStartTimestamp > oneWeek)
    weatherExtension = weatherBitForecast;
  const { data: weatherResults } = await axios.get(
    `${weatherBitUrl}${weatherExtension}?units=I&lon=${lng}&lat=${lat}&key=${weatherBitApiKey}`
  );
  let { data: weather, city_name: cityName, timezone } = weatherResults;
  weather = weather.length === 1 ? weather[0] : weather[7];

  // const { data: pictureResults } = await axios.get(
  //   `${pixabayUrl}?q=${encodeURIComponent(
  //     stateName
  //   )}&editors_choice=true&per_page=3&key=${pixabayApiKey}`
  // );
  // if (pictureResults.hits.length < 1)
  //   res.status(500).send(`There are no available images for ${stateName}`);
  // const picture = pictureResults.hits[0];
  return {
    cityName,
    timezone,
    stateName,
    postalCode,
    weather,
    // picture,
  };
};

module.exports = getForecast;
