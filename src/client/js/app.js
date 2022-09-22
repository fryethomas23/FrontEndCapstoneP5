import axios from "axios";
const pixabayApiKey = process.env.PIXABAY_API_KEY;
const pixabayUrl = `https://pixabay.com/api/`;
const apiUrl = "http://localhost:3000/";

export const validateZipCode = (zipCode) => {
  const zipNumber = parseInt(zipCode);
  if (typeof zipNumber !== "number" || zipNumber > 99950 || zipNumber < 501) {
    console.error("invalid date");
    return false;
  }
  return true;
};

export const validateDate = (date) => {
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
    console.error("Invalid date format");
    return false;
  }

  const parts = date.split("/");
  const year = parseInt(parts[2], 10);
  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);

  if (month < 1 || month > 12 || year < 1000 || year > 3000) {
    console.error("Invalid month or year");
    return false;
  }

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  if (!(day > 0 && day <= monthLength[month - 1])) {
    console.error("Invalid day");
    return false;
  }
  return true;
};

export const parseDate = (dateString) => {
  const parts = dateString.split("/");
  const year = parseInt(parts[2], 10);
  const month = parseInt(parts[0], 10);
  const day = parseInt(parts[1], 10);
  const date = new Date(`${year}-${month}-${day}`);
  return date.getTime();
};

export const getForecast = async (zipCode, travelDate) => {
  const { data } = await axios.get(
    `${apiUrl}weather?postalCode=${zipCode}&travelDate=${travelDate}`
  );

  const { data: pictureResults } = await axios.get(
    `${pixabayUrl}?q=${encodeURIComponent(
      data.stateName
    )}&per_page=3&key=${pixabayApiKey}`
  );
  if (pictureResults.hits.length < 1) {
    data.picture =
      "https://globalcastaway.com/wp-content/uploads/2019/11/adventure-quotes-jobs-fill-your-pockets-but-adventure-fill-your-soul.jpg";
  } else {
    data.picture = pictureResults.hits[0].largeImageURL;
  }
  return data;
};
