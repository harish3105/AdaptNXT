const getWeatherBtn = document.getElementById("get-weather-btn");

getWeatherBtn.addEventListener("click", async () => {
  const city = document.getElementById("city-input").value;
  const weatherInfoDiv = document.getElementById("weather-info");


  weatherInfoDiv.textContent = "";

  if (!city) {
    const errorParagraph = document.createElement("p");
    errorParagraph.textContent = "Please enter a city name.";
    weatherInfoDiv.appendChild(errorParagraph);
    return;
  }

  try {
    const response = await fetch(`/weather/${city}`);
    const data = await response.json();
    const {
      location,
      temperature,
      weather_descriptions,
      humidity,
      wind_speed,
      error,
      message,
    } = data;

    if (response.ok) {
      const locationHeading = document.createElement("h2");
      locationHeading.textContent = `Weather in ${location}`;
      weatherInfoDiv.appendChild(locationHeading);

      const temperatureParagraph = document.createElement("p");
      temperatureParagraph.textContent = `Temperature: ${temperature}°C`;
      weatherInfoDiv.appendChild(temperatureParagraph);

      const weatherParagraph = document.createElement("p");
      weatherParagraph.textContent = `Weather: ${weather_descriptions}`;
      weatherInfoDiv.appendChild(weatherParagraph);

      const humidityParagraph = document.createElement("p");
      humidityParagraph.textContent = `Humidity: ${humidity}%`;
      weatherInfoDiv.appendChild(humidityParagraph);

      const windSpeedParagraph = document.createElement("p");
      windSpeedParagraph.textContent = `Wind Speed: ${wind_speed} km/h`;
      weatherInfoDiv.appendChild(windSpeedParagraph);
    } else {
      const errorParagraph = document.createElement("p");
      errorParagraph.textContent = error || "An error occurred.";
      weatherInfoDiv.appendChild(errorParagraph);
    }
  } catch (error) {
    const errorParagraph = document.createElement("p");
    errorParagraph.textContent = `Something went wrong: ${error.message}`;
    weatherInfoDiv.appendChild(errorParagraph);
  }
});
