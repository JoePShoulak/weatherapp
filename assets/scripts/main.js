var testCity = "Minneapolis";
var endpoint = "https://api.openweathermap.org/data/2.5/";
var currentApiKey = "fe78b54641e53796124286d599942e78";

// Because the API returns in Kelvin because...... I don't know
function kelvinTofahrenheit(temp) {
    return Math.round(((temp - 273.15) * 9/5 + 32)*100)/100;
}

// Update the page HTML to show the current weather
function renderCurrentWeather(data) {
    $("#location").text(data.name);
    $("#todays-date").text(moment().format("(MM/DD/YYYY)"));

    $("#todays-temp").text(kelvinTofahrenheit(data.main.temp));
    $("#todays-wind").text(data.wind.speed);
    $("#todays-humidity").text(data.main.humidity);
}

// Get the current weather given a city
function fetchCurrentWeather(city) {
    fetch(endpoint + "weather?q=" + city + "&appid=" + currentApiKey)
    .then(response => {
        return response.json();
    })
    .then(data => {
        renderCurrentWeather(data);
    });
}

// Get the current weather given a city
function fetchForecastWeather(city) {
    fetch(endpoint + "forecast?q=" + city + "&appid=" + currentApiKey)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    });
}

// On page first load
function init() {
    fetchCurrentWeather(testCity);
    fetchForecastWeather(testCity);
}

// Begin the page
init();


