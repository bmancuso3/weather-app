var searchFormEl = document.querySelector('#search-form');
var cityInput = document.querySelector('#city-input');
var msgDiv = document.querySelector('#msg');


function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute('class', type);
}

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
        });
    // callWeatherAPI();
}


// API call for weather using latitude and longitude
function callWeatherAPI() {
    var latitude = localStorage.getItem('latitude');
    var longitude = localStorage.getItem('longitude');
    var latlongURL = 'api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=012dcd8608fee5e0f427404e5ffe5eba';
    fetch(latlongURL)
        .then(function(results) {
            return results.json();
        })
        .then(function(data) {
            console.log(data);
        });

}


searchFormEl.addEventListener('submit', handleCityInput);

