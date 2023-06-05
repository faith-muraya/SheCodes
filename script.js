let searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", function () {
  search();
});

async function search() {
  let dateElement = document.getElementById("par3");
  let currentTime = new Date();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  dateElement.textContent = `${days[day]} ${""} ${hours}:${minutes}`;

  var inputValue = document.getElementById("myInput");

  var heading = document.getElementById("heading");
  heading.textContent = inputValue.value;

  let temperature = document.getElementById("temp");
  let description = document.getElementById("desc");
  let humidity = document.getElementById("humid");
  let wind = document.getElementById("wind");
  const apiKey = "23d4f073904d24d4299a5a10c7ca094b";
  let apiResult = {};

  let completeUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    inputValue.value +
    "&appid=" +
    apiKey +
    "&units=metric";

  await fetch(completeUrl)
    .then((response) => response.json())
    .then((data) => {
      apiResult = data;
    })
    .catch((error) => {
      console.log("Error: " + error);
    });

  console.log(apiResult);

  temperature.innerText = apiResult.main.temp + "°C";
  humidity.innerText = apiResult.main.humidity + "%";
  wind.innerText = apiResult.wind.speed + "km /h";
  description.innerText = apiResult.weather[0].description;
}
