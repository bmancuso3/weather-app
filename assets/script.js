var searchFormEl = document.querySelector('#search-form');
var searchBtn = document.querySelector('#search-button');
var cityInput = document.querySelector('#city-input');
var msgDiv = document.querySelector('#msg');
var searchCity = document.querySelector('#search-city')
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
            // console.log(data);
            // Assigns values to current weather data and displays it on the page under current weather
            var cityName = data.city.name;
            var currentIcon = data.list[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/"+currentIcon+".png";
            // console.log("Icon URL: " + iconURL);
            icon.setAttribute("src", iconURL);
            var currentTemp = data.list[0].main.temp;
            var currentWind = data.list[0].wind.speed;
            var currentHumidity = data.list[0].main.humidity;

            searchCity.innerText = cityName;
            temp.innerText = 'Temperature: '+currentTemp+' *F';
            wind.innerText = 'Wind Speed: '+currentWind+' mph';
            humidity.innerText = 'Humidity: '+currentHumidity+'%';
            
            forecastEl.innerHTML = '';

            for (var i = 6; i < data.list.length; i += 8) {             
                
                var forecast = document.createElement('li');
                forecast.classList.add('list-group-item');
                
                forecast.innerText = 
                    'Date: ' +
                    data.list[i].dt_txt +
                    ' Temperature: ' +
                    data.list[i].main.temp +
                    ' Wind Speed: ' +
                    data.list[i].wind.speed +
                    ' Humidity: ' +
                    data.list[i].main.humidity;
                forecastEl.appendChild(forecast);
            }
        })      
}

searchFormEl.addEventListener('submit', handleCityInput);

