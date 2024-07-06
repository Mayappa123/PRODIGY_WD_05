const apiKey = "639ad97974b80802cdcf530e90178fa7";

async function getWeather() {
  const city = document.getElementById("city-input").value;
  if (!city) {
    showError("Please enter a city name");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(data) {
  const weatherResult = document.getElementById("weather-result");
  weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Latitude: ${data.coord.lat}, Longitude: ${data.coord.lon}</p>
        <table>
            <tr>
                <td><i class="fas fa-thermometer-half"></i> Temperature</td>
                <td>${data.main.temp}°C</td>
            </tr>
            <tr>
                <td><i class="fas fa-cloud"></i> Weather</td>
                <td>${data.weather[0].description}</td>
            </tr>
            <tr>
                <td><i class="fas fa-tint"></i> Humidity</td>
                <td>${data.main.humidity}%</td>
            </tr>
            <tr>
                <td><i class="fas fa-wind"></i> Wind Speed</td>
                <td>${data.wind.speed} m/s</td>
            </tr>
        </table>
    `;
}



function showError(message) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";

  setTimeout(() => {
    errorMessage.style.display = "none";
  }, 2000);
}
