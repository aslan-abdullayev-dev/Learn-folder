const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const WEATHER_API_TOKEN = "51bc53101bf735e98be167d9decc09b5";
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
  const city = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_TOKEN}&units=metric`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIconName = weatherData.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${weatherIconName}@4x.png`;

      res.write(`<p>Weather condition : ${weatherDescription}</p>`);
      res.write(`<img src=${iconUrl} />`);
      res.write(`<h1>The temperature in ${city} is ${temp} Celcius</h1>`);
      res.send();
    });
  });
});

app.listen(PORT, () => console.log("server is running on port " + PORT));
