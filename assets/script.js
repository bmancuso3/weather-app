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
        renderCity();
    }
}

function renderCity() {
    city = localStorage.getItem('City');
    console.log(city);
}


// API call for latitude and longitude from city name
// var cityURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=5&appid=012dcd8608fee5e0f427404e5ffe5eba';
// fetch(cityURL)
//     .then(function(results) {
//         return results.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     });


// var latitude = ;
// var longitude = ;
// API call for weather using latitude and longitude
// var latlongURL = 'api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=012dcd8608fee5e0f427404e5ffe5eba';
// fetch(latlongURL)
//     .then(function(results) {
//         return results.json();
//     })
//     .then(function(data) {
//         console.log(data);
//     });

searchFormEl.addEventListener('submit', handleCityInput);

