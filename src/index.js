const API_KEY = "f778cdcb7c824caabea32221231205";

fetch("url.url.com/api", {
  mode: "cors",
});

async function getCityData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.toLowerCase()}`
  );
  const data = await response.json();
  console.log(data);
}

getCityData("London");
