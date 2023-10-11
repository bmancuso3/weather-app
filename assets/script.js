var searchFormEl = document.querySelector('#search-form');
var cityInput = document.querySelector('#city-input');
var msgDiv = document.querySelector('#msg');
var icon = document.querySelector('#current-icon');
var temp = document.querySelector('#current-temp');
var wind = document.querySelector('#current-wind');
var humidity = document.querySelector('#current-humidity');
var forecastEl = document.querySelector('#forecast');

// Establishes basis to display error message for blank city input held within handleCityInput function
function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute('class', type);
}

// Sends error if blank input, begins API calls if city entered
function handleCityInput(event) {
    event.preventDefault();

    var searchCity = cityInput.value;

    if (searchCity === '') {
        displayMessage('error', 'Please enter a city name');
    }
    else {
        localStorage.setItem('City', searchCity);
        callGeoAPI();
    }
}

// API call for latitude and longitude from city name
function callGeoAPI() {
    city = localStorage.getItem('City');
    var cityURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=012dcd8608fee5e0f427404e5ffe5eba';
    fetch(cityURL)
        .then(function(results) {
            return results.json();
        })
        .then(function(data) {
            console.log(city);
            console.log(data[0].lat, data[0].lon);
            localStorage.setItem('latitude', data[0].lat);
            localStorage.setItem('longitude', data[0].lon);
        })
        .then(function () {
            callWeatherAPI();
        })

}


// API call for weather using latitude and longitude generated from GeoAPI
function callWeatherAPI() {
    var latitude = localStorage.getItem('latitude');
    var longitude = localStorage.getItem('longitude');
    var latlongURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=012dcd8608fee5e0f427404e5ffe5eba&units=imperial';
    fetch(latlongURL)
        .then(function(results) {
            return results.json();
        })
        .then(function(data) {
            console.log(data);
            // Assigns values to current weather data and displays it on the page under current weather
            var cityName = data.city.name;
            var currentIcon = data.list[0].weather.icon;
            var currentTemp = data.list[0].main.temp;
            var currentWind = data.list[0].wind.speed;
            var currentHumidity = data.list[0].main.humidity;
            // localStorage.setItem('currentIcon', currentIcon);
            // localStorage.setItem('currentTemp', currentTemp);
            // localStorage.setItem('currentWind', currentWind);
            // localStorage.setItem('currentHumidity', currentHumidity);
            icon.innerHTML = cityName +' '+ currentIcon;
            temp.innerHTML = 'Temperature: '+currentTemp+' *F';
            wind.innerHTML = 'Wind Speed: '+currentWind+' mph';
            humidity.innerHTML = 'Humidity: '+currentHumidity+'%';
        
            // function forecast() {
            // for (i=0; i < 50; i+8) {
            //     var forecast = document.createElement('li');
            //     forecast.textContent = 'Date: '+data.list[i].dt_txt+'<br/>Temperature: '+data.list[i].main.temp+'<br/>Wind Speed: '+data.list[i].wind.speed+'<br/>Humidity: '+data.list[i].main.humidity;
            //     forecastEl.append(forecast);
            // }}
            // forecast(data);
        })

            

}


searchFormEl.addEventListener('submit', handleCityInput);

