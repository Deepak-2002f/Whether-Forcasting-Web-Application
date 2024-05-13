function getWeather(){
    const apikey = '5560ffb97bf6fefefc3a24641f4b4c38';
    const city = document.getElementById('city').value;

    if (!city){
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`; // Corrected the URL

    fetch(currentWeatherUrl)
        .then(response  => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => { // Corrected the variable name
            console.error('Error fetching current weather data:', error); // Corrected the variable name
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl) 
        .then(response => response.json()) // Corrected .than to .then
        .then(data =>{
            displayHourlyForecast(data.list);
        })
        .catch(error =>{
            console.error('Error fetching hourly forecast data:', error); // Corrected the variable name
            alert('Error fetching hourly forecast data. Please try again');
        });
}

function displayWeather(data){
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast'); // Corrected variable name

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404'){
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`; // Corrected backticks
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description; // Corrected variable name
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; // Corrected backticks

        const temperatureHTML = `<p>${temperature}°C</p>`; // Corrected backticks
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`; // Corrected backticks

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        // Removed showImage() call as it's not defined in the provided code
    }
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item =>{
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; // Corrected backticks
        
        const hourlyItemHtml = `<div class="hourly-item"><span>${hour}:00</span><img src="${iconUrl}" alt="Hourly Weather Icon"><span>${temperature}°C</span></div>`; // Corrected backticks
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}
