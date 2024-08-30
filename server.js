const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const OPENWEATHERMAP_API_KEY = "bd5e378503939ddaee76f12ad7a97608";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;

  if (!city) {
    return res.status(400).json({ error: "Please provide a city name." });
  }

  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    if (response.status !== 200) {
      return res
        .status(response.status)
        .json({ error: "Error fetching weather data." });
    }

    const weatherInfo = {
      location: data.name,
      temperature: data.main.temp,
      weather_descriptions: data.weather[0].description,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
    };

    res.json(weatherInfo);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong while fetching weather data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
