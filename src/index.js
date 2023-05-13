const API_KEY = "f778cdcb7c824caabea32221231205";
// state variables
let currentWeather;
let currentUnit;

async function getCityData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.toLowerCase()}`
  );
  const data = await response.json();
  console.log(data);
  const { country, name } = data.location;
  const { condition, icon } = data.current.condition;
  const { tempC, tempF } = data.current;
  return { country, name, condition, icon, tempC, tempF };
}
async function handleCall(city) {
  currentWeather = await getCityData(city);
  console.log("here", currentWeather);
}

handleCall("cairo");

const form = document.querySelector("form.area");
const areaInput = document.querySelector("input#area");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleCall(areaInput.value);
});
