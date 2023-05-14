/* eslint-disable camelcase */
import "./style.css";

const API_KEY = "f778cdcb7c824caabea32221231205";
// state variables
let currentWeather;
const currentUnit = "c";

// fetch and retrieve data
async function getCityData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.toLowerCase()}`
  );
  const data = await response.json();
  console.log(data);
  const { country, name } = data.location;
  const { text, code } = data.current.condition;
  const { temp_c, temp_f, is_day } = data.current;
  return {
    country,
    name,
    text,
    code,
    temp_c,
    temp_f,
    is_day,
    getTemp() {
      return currentUnit === "c" ? this.temp_c : this.temp_f;
    },
  };
}
// Interface
const firstRow = document.querySelector("div.first");
const secondRow = document.querySelector("div.second");
const thirdRow = document.querySelector("div.third");

function getImagePath() {
  let path = "../assets/weather/64x64/";
  if (currentWeather.is_day) path += "day/";
  else path += "night/";
  path += `${currentWeather.code}.png`;
  return path;
}

function populateContainer() {
  firstRow.textContent = `${currentWeather.name}, ${currentWeather.country}`;

  secondRow.textContent = `${currentWeather.getTemp()}°`;

  const icon = document.createElement("img");
  icon.src = getImagePath();
  secondRow.appendChild(icon);

  thirdRow.textContent = currentWeather.text;
}

// main function
async function handleCall(city) {
  currentWeather = await getCityData(city);

  populateContainer();
}

// call on page load
handleCall("cairo");
// call on input
const form = document.querySelector("form.area");
const areaInput = document.querySelector("input#area");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleCall(areaInput.value);
});
