// Constants
const testCity = "Minneapolis";
const iconURL = "http://openweathermap.org/img/wn/";
const base = "https://api.openweathermap.org/data/2.5/";
const apiKey = "fe78b54641e53796124286d599942e78";

// DOM Elements
const article = $('#five-day-forecast');

// Update the page HTML to show the current weather
const renderCurrentWeather = (data) => {
    $("#location").text(data.name);
    $("#todays-date").text(moment().format("(MM/DD/YYYY)"));

    $("#todays-icon").attr("src", `${iconURL + data.weather[0].icon}@2x.png`)

    $("#todays-temp").text(`${data.main.temp}°F`);
    $("#todays-wind").text(`${data.wind.speed}mph`);
    $("#todays-humidity").text(`${data.main.humidity}%`);
}

// Render one of the weather card to be displayed in Forecast
const renderWeatherCard = (data) => {
    return $('<div>').addClass('card column col-2')
      .append($('<h5>').text(data.dt_txt.split(" ")[0]))  // Title / Date
      .append($('<img>').attr("src", `${iconURL + data.weather[0].icon}@2x.png`).addClass("icon")) // Icon
      .append($('<span>').text(`${data.main.temp}°F`))    // Temp
      .append($('<span>').text(`${data.wind.speed}mph`))  // Wind
      .append($('<span>').text(`${data.main.humidity}%`)) // Humidity
}

// Update the page HTML to show the forecasted weather
const renderForecastedWeather = (data) => {
    let forecast = []; // Make empty array

    for (i = 0; i < 40; i+=8) {
        forecast.push(data.list[i]);  // Fill it with every 8th element
    }

    article.empty(); // Delete all rendered forecast data

    // For every day of forecasted data, append a new forecast card
    forecast.forEach(weatherData => {
        article.append(renderWeatherCard(weatherData));
    });
}

// Create the proper URL for our API call
const apiurl = (city, forecast=false) => {
    return `${base + (forecast ? "forecast?q=" : "weather?q=") + city}&units=imperial&appid=${apiKey}`
}

// Get the current weather given a city
const fetchCurrentWeather = (city) => {
    fetch(apiurl(city))
      .then(response => { return response.json(); })
      .then(data => { renderCurrentWeather(data); });
}

// Get the current weather given a city
const fetchForecastWeather = (city) => {
    fetch(apiurl(city, forecast=true))
      .then(response =>  response.json() )
      .then(data => renderForecastedWeather(data) );
}

// We never update one but not the other, so let's tie these together
const fetchAllData = (city) => {
    fetchCurrentWeather(city);
    fetchForecastWeather(city);
}

// Handle the searching for a new city
const citySearch = () => {
    const city = $("#city-search").val(); // Grab our city

    fetchAllData(city); // Fetch and render all the data

    $('#history').append($("<li>").text(city)) // Add it to our list of searches
}

// Handle clicks on recently searched cities
const historyClick = (event) => {
    fetchAllData($(event.target).text());
}

// On page first load
const init = () => {
    fetchAllData(testCity);
}

// Event Listeners
$("#city-search-button").on("click", citySearch);
$("#history").on("click", historyClick);

// Begin the page
init();
