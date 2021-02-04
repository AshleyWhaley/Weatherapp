var currentTime = moment().format("LLL");

$(document).ready(function() {
  var apiKey = "e427ecee872c310cdf0c83e634ffa5c5";
  //Event Listener for city input and search history
  $("#search-button").on("click", function (e) {
    e.preventDefault ();
    var cityInputValue = $("#cityInput").val();
    if (cityInputValue != "") {
      var cityButton = $("<button>");
      cityButton.text(cityInputValue);
      cityButton.addClass("city-btn");
      $("#leftCard").append(cityButton);
      $("#leftCard").append("<br>");
      $("#cityInput").focus(function (){
        $(this).val("");
      });
      $(".city-btn").click(function () {
        let cityBtnText = $(this).text();
        fetchWeatherData(cityBtnText);
      });
      fetchWeatherData(cityInputValue);
    } else {
      alert("Provide a City!");
    }
  });

  //AJAX Calls
  function fetchWeatherData(cityInputValue) {
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputValue + "&units=imperial&APPID=" + apiKey,
    method: "GET",
  }).then(forecastData);
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputValue + "&units=imperial&APPID=" + apiKey,
    method: "GET",
    }).then(renderCurrentWeather);
  }

  //Render Forecast
  function forecastData(response) {
    console.log(response);
    var iconCodeDate0 = response.list[1].weather[0].icon;
    var iconCodeDate1 = response.list[7].weather[0].icon;
    var iconCodeDate2 = response.list[15].weather[0].icon;
    var iconCodeDate3 = response.list[24].weather[0].icon;
    var iconCodeDate4 = response.list[35].weather[0].icon;

    //day0
    var forecastDate0 = moment().add(1, "days").format("LL");
    var cityWeatherIcon0 = $("<img>");
    cityWeatherIcon0.attr(
      "src",
      "http://openweathermap.org/img/wn/"+ iconCodeDate0 + ".png"
    );
    var temp0 = response.list[1].main.temp;
    var humidity0 = response.list[1].main.humidity;
    $("#0DayCard").attr("class", "forecastCard");
    $("#0Header").text(forecastDate0);
    $("#0Header").append(cityWeatherIcon0);
    $("#0day-temp").text("Temperature: " + temp0 + "°F");
    $("#0day-humidity").text("Humidity: " + humidity0 + "%");

      //day1
    var forecastDate1 = moment().add(2, "days").format("LL");
    var cityWeatherIcon1 = $("<img>");
    cityWeatherIcon1.attr(
      "src",
      "http://openweathermap.org/img/wn/"+ iconCodeDate1 + ".png"
    );
    var temp1 = response.list[7].main.temp;
    var humidity1 = response.list[7].main.humidity;
    $("#1DayCard").attr("class", "forecastCard");
    $("#1Header").text(forecastDate1);
    $("#1Header").append(cityWeatherIcon1);
    $("#1day-temp").text("Temperature: " + temp1 + "°F");
    $("#1day-humidity").text("Humidity: " + humidity1 + "%");

     //day2
    var forecastDate2 = moment().add(3, "days").format("LL");
    var cityWeatherIcon2 = $("<img>");
    cityWeatherIcon2.attr(
      "src",
       "http://openweathermap.org/img/wn/"+ iconCodeDate2 + ".png"
    );
      var temp2 = response.list[15].main.temp;
      var humidity2 = response.list[15].main.humidity;
      $("#2DayCard").attr("class", "forecastCard");
      $("#2Header").text(forecastDate2);
      $("#2Header").append(cityWeatherIcon2);
      $("#2day-temp").text("Temperature: " + temp2 + "°F");
      $("#2day-humidity").text("Humidity: " + humidity2 + "%");
        
    //day3
    var forecastDate3 = moment().add(3, "days").format("LL");
    var cityWeatherIcon3 = $("<img>");
    cityWeatherIcon3.attr(
      "src",
      "http://openweathermap.org/img/wn/"+ iconCodeDate3 + ".png"
    );
    var temp3 = response.list[24].main.temp;
    var humidity3 = response.list[24].main.humidity;
    $("#3DayCard").attr("class", "forecastCard");
    $("#3Header").text(forecastDate3);
    $("#3Header").append(cityWeatherIcon3);
    $("#3day-temp").text("Temperature: " + temp3 + "°F");
    $("#3day-humidity").text("Humidity: " + humidity3 + "%");

   //day4
    var forecastDate4 = moment().add(4, "days").format("LL");
    var cityWeatherIcon4 = $("<img>");
    cityWeatherIcon4.attr(
      "src",
      "http://openweathermap.org/img/wn/"+ iconCodeDate4 + ".png"
  );
    var temp4 = response.list[35].main.temp;
    var humidity4 = response.list[35].main.humidity;
    $("#4DayCard").attr("class", "forecastCard");
    $("#4Header").text(forecastDate4);
    $("#4Header").append(cityWeatherIcon4);
    $("#4day-temp").text("Temperature: " + temp4 + "°F");
    $("#4day-humidity").text("Humidity: " + humidity4 + "%");
  }

//render Current Day
function renderCurrentWeather(response) {
  resetState();
  var iconCode = response.weather[0].icon;
  var currentWeather = response.weather[0].description;
  var windSpeed = response.wind.speed;
  var cityName = response.name;
  var currentHumidity = response.main.humidity;
  var currentTemperature = response.main.temp;

$("#jumbotron").attr("class", "jumbo-fluid");
$("#city-temp").text("Temperature: " + currentTemperature + "°F");
$("#city-humidity").text("Humidity: " + currentHumidity + "%");
$("#city-weather").text("Description: " + currentWeather);
$("#city-wind").text("Wind Speed: " + windSpeed + "mph");

var cityWeatherIcon = $("<img>");
cityWeatherIcon.attr(
  "src",
  "http://openweathermap.org/img/wn/" + iconCode + ".png"
);
$("#jumbotron").append(cityWeatherIcon);

var displayCityName = $("<h2>");
displayCityName.addClass("jumbo-header");
displayCityName.text(cityName);
$("#jumbotron").append(displayCityName);

var displayCurrentTime = $("<h5>");
displayCurrentTime.addClass("current-time");
displayCurrentTime.text(currentTime);
$("#jumbotron").append(displayCurrentTime);
}

function resetState(){
  $("#jumbotron").empty();
}
});

