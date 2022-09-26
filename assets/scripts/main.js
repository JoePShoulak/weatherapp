// Constants
var testCity = "Minneapolis";
var endpoint = "https://api.openweathermap.org/data/2.5/";
var apiKey = "fe78b54641e53796124286d599942e78";

// DOM Elements
var article = $('#five-day-forecast');

// Update the page HTML to show the current weather
function renderCurrentWeather(data) {
    $("#location").text(data.name);
    $("#todays-date").text(moment().format("(MM/DD/YYYY)"));

    $("#todays-temp").text(`${data.main.temp}°F`);
    $("#todays-wind").text(`${data.wind.speed}mph`);
    $("#todays-humidity").text(`${data.main.humidity}%`);
}

// Render one of the weather card to be displayed in Forecast
function renderWeatherCard(weatherData) {
    return $('<div>').addClass('card column col-2')
      .append($('<h5>').text(weatherData.dt_txt.split(" ")[0]))  // Title / Date
      .append($('<span>').text(`${weatherData.main.temp}°F`))    // Temp
      .append($('<span>').text(`${weatherData.wind.speed}mph`))  // Wind
      .append($('<span>').text(`${weatherData.main.humidity}%`)) // Humidity
}

// Update the page HTML to show the forecasted weather
function renderForecastedWeather(data) {
    var forecast = [];

    // Grab every 8th time slot
    for (i = 0; i < 40; i+=8) { forecast.push(data.list[i]); } // THIS IS A LIE
  
    article.empty(); // Delete all forecast data

    // For every day of forecasted data, append a new forecast card
    forecast.forEach(weatherData => { article.append(renderWeatherCard(weatherData)); });
}

// Get the current weather given a city
function fetchCurrentWeather(city) {
    fetch(endpoint + "weather?q=" + city + "&units=imperial&appid=" + apiKey)
      .then(response => { return response.json(); })
      .then(data => { renderCurrentWeather(data); });
}

// Get the current weather given a city
function fetchForecastWeather(city) {
    fetch(endpoint + "forecast?q=" + city + "&units=imperial&appid=" + apiKey)
      .then(response => { return response.json(); })
      .then(data => { renderForecastedWeather(data); });
}

// We never update one but not the other, so let's tie these together
function fetchAllData(city) {
    fetchCurrentWeather(city);
    fetchForecastWeather(city);
}

// Handle the searching for a new city
function citySearch() {
    var city = $("#city-search").val(); // Grab our city

    fetchAllData(city); // Fetch and render all the data

    $('#history').append($("<li>").text(city)) // Add it to our list of searches
}

// Handle clicks on recently searched cities
function historyClick(event) {
    fetchAllData($(event.target).text());
}

// On page first load
function init() {
    fetchAllData(testCity);
}

// Event Listeners
$("#city-search-button").on("click", citySearch);
$("#history").on("click", historyClick);

// Begin the page
init();
