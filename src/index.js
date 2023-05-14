/* eslint-disable camelcase */
import "./style.css";

const API_KEY = "f778cdcb7c824caabea32221231205";
// state variables
let currentWeather;
let currentUnit = "c";

// fetch and retrieve data
async function getCityData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.toLowerCase()}`
  );
  const data = await response.json();
  console.log(data);
  const { country, name } = data.location;
  const { text, icon } = data.current.condition;
  const { temp_c, temp_f, is_day } = data.current;
  return {
    country,
    name,
    text,
    icon,
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

function populateContainer() {
  firstRow.textContent = `${currentWeather.name}, ${currentWeather.country}`;

  secondRow.textContent = `${currentWeather.getTemp()}°${currentUnit.toLocaleUpperCase()}`;

  thirdRow.textContent = currentWeather.text;
  const icon = document.createElement("img");
  icon.src = currentWeather.icon;
  thirdRow.appendChild(icon);
}

function switchUnit() {
  currentUnit = currentUnit === "c" ? "f" : "c";
  if (currentWeather) {
    secondRow.textContent = `${currentWeather.getTemp()}°`;
  }
}

const switchButton = document.querySelector("button.switch");
switchButton.addEventListener("click", () => {
  switchUnit();
});

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
