// update the current time 
let time = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satursday"
];
days = days[time.getDay()];
let hour = time.getHours();
if (hour < 10){
  hour = `0${hour}`;
}
let minutes = time.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = `${days} ${hour}:${minutes}`;


// Search current Location 
function getWeather(respone){
  let temperature = Math.round(respone.data.main.temp);
  let temperatureElement = document.querySelector(".today-weather");
  temperatureElement.innerHTML = `${temperature}`;
  let currentCity = respone.data.name;
  let cityElement = document.querySelector(".city-name");
  cityElement.innerHTML = `${currentCity}`;
  let humidity = respone.data.main.humidity;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `${humidity}`;
   let windSpeed = Math.round(respone.data.wind.speed);
  let windSpeedElement = document.querySelector(".wind-speed");
  windSpeedElement.innerHTML = `${windSpeed}`;
  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML =`${respone.data.weather[0].description}`;
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${respone.data.weather[0].icon}@2x.png`);
// celsiusTemperature = null
celsiusTemperature = respone.data.main.temp;
}

function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d6f30d80a523e717fc077ff19806dd79";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(getWeather);
}

function currentPosition(){
navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click",currentPosition);

// Search Weather
function searchWeather(respone){
  let cityTemperature = document.querySelector(".today-weather");
  cityTemperature.innerHTML = Math.round(respone.data.main.temp);
let cityHumidity = document.querySelector(".humidity");
cityHumidity.innerHTML = Math.round(respone.data.main.humidity);
let cityWindSpeed = document.querySelector(".wind-speed");
cityWindSpeed.innerHTML = Math.round(respone.data.wind.speed);
let cityWeatherDescription = document.querySelector(".weather-description");
cityWeatherDescription.innerHTML = `${respone.data.weather[0].description}`;
let weatherIcon = document.querySelector("#weather-icon");
weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${respone.data.weather[0].icon}@2x.png`);
// celsiusTemperature = null
celsiusTemperature = respone.data.main.temp;
}

// Search engine sync with the city name
function searchCity(event) {
event.preventDefault();
let cityInput = document.querySelector("#city-input");
let cityName = document.querySelector(".city-name");
cityName.innerHTML= `${cityInput.value}`;
let apiKey = "d6f30d80a523e717fc077ff19806dd79";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(searchWeather);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", searchCity);


// Change celsius to fahrenheit
function changeToFahrenheit(event){
  event.preventDefault();
  let temperatureElement = document.querySelector(".today-weather");
  clickCelsius.classList.remove("active");
  clickFahrenheit.classList.add("active");
  let toFahrenheit= (celsiusTemperature * 9) /5 + 32;
  temperatureElement.innerHTML = Math.round(toFahrenheit);
}

let celsiusTemperature = null;

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click",changeToFahrenheit);

// Change fahrenheit to celsius

function changeToCelsius(event){
  event.preventDefault();
  clickCelsius.classList.add("active");
  clickFahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector(".today-weather");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let clickCelsius = document.querySelector("#celsius");
clickCelsius.addEventListener("click",changeToCelsius);
