const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const mockAPIResponse = require("./mockAPI.js");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const FormData = require("form-data");

dotenv.config();
const app = express();

app.use(express.static("dist"));

console.log(__dirname);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.info(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.post("/test", async (req, res) => {
  try {
    const { text } = req.body;
    const form = new FormData();
    form.append("key", process.env.MeaningCloudApiKey);
    form.append("txt", text);
    form.append("lang", "en");
    const response = await axios.post(
      "https://api.meaningcloud.com/sentiment-2.1",
      form
    );
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
