async function getWeather() {
  const apiKey = "639ad97974b80802cdcf530e90178fa7";
  const city = document.getElementById("city-input").value;
  const result = document.getElementsByClassName("weather-result")[0];

  if (!city) {
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "Please enter a city name";
    result.innerHTML = "";
    result.appendChild(errorMessage);
    setTimeout(() => {
      errorMessage.classList.add("hidden");
      setTimeout(() => {
        result.removeChild(errorMessage);
      }, 1500);
    }, 1500);
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Invalid city name");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = error.message;
    result.innerHTML = "";
    result.appendChild(errorMessage);
    document.getElementById("city-input").value = "";
    setTimeout(() => {
      result.removeChild(errorMessage);
    }, 1500);
  }
}

function displayWeather(data) {
  console.log(data);
  const weatherResult = document.getElementById("weather-result");
  const tempMin = (data.main.temp_min - 273.15).toFixed(2);
  const tempMax = (data.main.temp_max - 273.15).toFixed(2);
  const feelsLike = (data.main.feels_like - 273.15).toFixed(2);

  weatherResult.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <table>
      <tr>
        <th>Weather</th>
        <td>${data.weather[0].description}</td>
      </tr>
      <tr>
        <th>Feels Like</th>
        <td>${feelsLike} °C</td>
      </tr>
      <tr>
        <th>Humidity</th>
        <td>${data.main.humidity}%</td>
      </tr>
      <tr>
        <th>Air Pressure</th>
        <td>${data.main.pressure} hPa</td>
      </tr>
      <tr>
        <th>Min Temperature</th>
        <td>${tempMin} °C</td>
      </tr>
      <tr>
        <th>Max Temperature</th>
        <td>${tempMax} °C</td>
      </tr>
      <tr>
        <th>Wind Speed</th>
        <td>${data.wind.speed} m/s</td>
      </tr>
      <tr>
        <th>Wind Direction</th>
        <td>${data.wind.deg}°</td>
      </tr>
    </table>
  `;

  document
    .getElementById("clear-button")
    .addEventListener("click", clearWeather);

  document.getElementById("clear-button").style.display = "block";
}

function clearWeather() {
  document.getElementById("weather-result").innerHTML = "";
  document.getElementById("city-input").value = "";
  document.getElementById("clear-button").style.display = "none";
}

window.getWeather = getWeather;
