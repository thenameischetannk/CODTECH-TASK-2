async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'fffc48aca5014d974ca35d7a7d54dea7';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            showError('City not found');
            return;
        }

        const weatherInfo = createWeatherInfo(data);
        displayWeatherInfo(weatherInfo);
    } catch (error) {
        console.error('Error:', error);
        showError('An error occurred');
    }
}

function showError(message) {
    document.getElementById('weatherInfo').innerText = message;
}

function createWeatherInfo(data) {
    return `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].main} - ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels like: ${data.main.feels_like}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

function displayWeatherInfo(weatherInfo) {
    document.getElementById('weatherInfo').innerHTML = weatherInfo;
}

