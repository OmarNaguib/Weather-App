/* eslint-disable camelcase */
import "./style.css";

const API_KEY = "f778cdcb7c824caabea32221231205";
// state variables
let currentWeather;
let currentUnit;

// fetch and retrieve data
async function getCityData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.toLowerCase()}`
  );
  const data = await response.json();
  console.log(data);
  const { country, name } = data.location;
  const { condition, code } = data.current.condition;
  const { temp_c, temp_f, is_day } = data.current;
  return { country, name, condition, code, temp_c, temp_f, is_day };
}
// Interface
const firstRow = document.querySelector("div.first");
const secondRow = document.querySelector("div.second");
const thirdRow = document.querySelector("div.third");

// main function
async function handleCall(city) {
  currentWeather = await getCityData(city);
  console.log("here", currentWeather);

  const icon = document.createElement("img");
  icon.src = currentWeather.icon;

  secondRow.appendChild(icon);
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
