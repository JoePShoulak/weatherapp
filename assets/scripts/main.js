var testCity = "Minneapolis";
var endpoint = "https://api.openweathermap.org/data/2.5/";
var apiKey = "fe78b54641e53796124286d599942e78";

// Because the API returns in Kelvin because...... I don't know
function kelvinTofahrenheit(temp) {
    return Math.round(((temp - 273.15) * 9/5 + 32)*100)/100;
}

// Update the page HTML to show the current weather
function renderCurrentWeather(data) {
    $("#location").text(data.name);
    $("#todays-date").text(moment().format("(MM/DD/YYYY)"));

    $("#todays-temp").text(`${data.main.temp}°F`);
    $("#todays-wind").text(`${data.wind.speed}mph`);
    $("#todays-humidity").text(`${data.main.humidity}%`);
}

// Update the page HTML to show the forecasted weather
function renderForecastedWeather(data) {
    var forecast = [];

    // Grab every 8th time slot
    // THIS IS A LIE
    for (i = 0; i < 40; i+=8) { forecast.push(data.list[i]); }

    // Delete all forecast data
    var article = $('#five-day-forecast') 
    article.empty();

    // For every day of forecasted data
    forecast.forEach(weatherDay => {
        // Make a holder card
        var card = $('<div>').addClass('card');

        // Make a title of the date
        var title = $('<h4>').text(weatherDay.dt_txt.split(" ")[0]);

        // Make our spans with data
        var temp = $('<span>').text(`${weatherDay.main.temp}°F`);
        var wind = $('<span>').text(`${weatherDay.wind.speed}mph`);
        var humidity = $('<span>').text(`${weatherDay.main.humidity}%`);

        // Put everything into the holder card
        card.append(title);
        card.append(temp);
        card.append(wind);
        card.append(humidity);
        
        // Put the card into the DOM
        article.append(card);
    });
}

// Get the current weather given a city
function fetchCurrentWeather(city) {
    fetch(endpoint + "weather?q=" + city + "&units=imperial&appid=" + apiKey)
    .then(response => {
        return response.json();
    })
    .then(data => {
        renderCurrentWeather(data);
    });
}

// Get the current weather given a city
/* This is currently the wrong query, this returns the future weather in 3-hour
   chunks for the next 5 days (40 elements in total). We're trying to return daily
   forecasts, which could technically be partially aggregated from this data,
   but that is not what the assignment is going for */
function fetchForecastWeather(city) {
    // https://api.openweathermap.org/data/2.5/onecall?lat=38.7267&lon=-9.1403&exclude=current,hourly,minutely,alerts&units=metric&appid=fe78b54641e53796124286d599942e78
    fetch(endpoint + "forecast?q=" + city + "&units=imperial&appid=" + apiKey)
    .then(response => {
        return response.json();
    })
    .then(data => {
        renderForecastedWeather(data);
    });
}

// On page first load
function init() {
    fetchCurrentWeather(testCity);
    fetchForecastWeather(testCity);
}

// Begin the page
init();


