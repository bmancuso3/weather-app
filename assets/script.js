var cityInput = document.querySelector('#city-input');
console.log(cityInput);

function handleCityInput(event) {
    event.preventDefault();
    
}

// API call for latitude and longitude from city name
var cityURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=5&appid=012dcd8608fee5e0f427404e5ffe5eba';
fetch(cityURL)
    .then(function(results) {
        return results.json();
    })
    .then(function(data) {
        console.log(data);
    });


var latitude = ;
var longitude = ;
// API call for weather using latitude and longitude
var latlongURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=012dcd8608fee5e0f427404e5ffe5eba';
fetch(latlongURL)
    .then(function(results) {
        return results.json();
    })
    .then(function(data) {
        console.log(data);
    });