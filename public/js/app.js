let locationData = "";

async function getLocation() {
  let response = await fetch("/js/location.json");
  locationData = await response.json();
  getCountry(locationData);
}
let countrySelect = document.querySelector("#country-select");
let citySelect = document.querySelector("#city-select");

function getCountry(locationData) {
  for (const key in locationData) {
    let option = document.createElement("option");
    option.classList.add = "option";
    option.innerText = key;
    option.value = key;
    countrySelect.append(option);
  }
}

function getCity(selectedCountry) {
  citySelect.innerHTML = `<option class="option" value="--select city name--">--select city name-- </option>`;
  let cities = locationData[`${selectedCountry}`];
  for (const city of cities) {
    let option = document.createElement("option");
    option.classList.add = "option";
    option.innerText = city;
    option.value = city;
    citySelect.append(option);
  }
}

countrySelect.addEventListener("change", () => {
  let selectedCountry =
    countrySelect.options[countrySelect.selectedIndex].innerText;
  getCity(selectedCountry);
});

getLocation();

// Displaying Data on city selected
// const APIKEY = "d0f9fd76cbb8eefddae0d54849110657";

// Get Latitude & Longitude of city
let APIKEY = "";
(async function () {
  let response = await fetch("../../api");
  APIKEY = await response.json();
})();

async function geoCoding(APIKEY) {
  const selectedCity = citySelect.value;
  const geoCodingURL = `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&appid=${APIKEY}`;
  let response = await fetch(geoCodingURL);
  let data = await response.json();
  let lat = data[0].lat;
  let lon = data[0].lon;
  getWeather(lat, lon);
}

// Get Weather Information of city
let weatherIcon = document.querySelector(".icon");
let container1 = document.querySelector(".card");
let container2 = document.querySelector(".card-2");
let tempContainer = document.querySelector("#temp");
let humidityContainer = document.querySelector("#humidity");
let visibilityContainer = document.querySelector("#visibility");
let weatherContainer = document.querySelector("#weather-description");

async function getWeather(lat, lon) {
  const getWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`;
  let response = await fetch(getWeatherURL);
  let data = await response.json();
  let temp = Math.round(data.main.temp - 273.15);
  let humidity = data.main.humidity;
  let visibility = data.visibility / 1000;
  let weather = data.weather[0].main;
  let weatherDescription = data.weather[0].description;
  let icon = data.weather[0].icon;
  let iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
  tempContainer.innerText = `${temp}°C`;
  humidityContainer.innerText = `${humidity}%`;
  visibilityContainer.innerText = `${visibility}km`;
  weatherContainer.innerText = `${weatherDescription}`;
  weatherIcon.setAttribute("src", `${iconURL}`);
}

// Get Weather Data on clicking button
const button = document.querySelector("button");
const form = document.querySelector("form");
button.addEventListener("click", async (e) => {
  e.preventDefault();
  await geoCoding(APIKEY);
  container1.style.display = "none";
  container2.style.display = "block";
  container2.style.animation = "containerAnime";
  container2.style.animationDuration = "1s";
  container2.style.top = "0px";
  form.reset();
});
