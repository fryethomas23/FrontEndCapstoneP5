const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const getForecast = require("./getForecast");

dotEnv.config();
const port = 3000;
const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.get("/weather", async (req, res, next) => {
  try {
    let { postalCode, travelDate } = req.query;
    const forecast = await getForecast(postalCode, travelDate);
    res.send(forecast);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
