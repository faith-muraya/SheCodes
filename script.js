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
  let iconElement = document.getElementById("icon");

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

  celciusTemp = apiResult.main.temp;
  temperature.innerText = Math.round(apiResult.main.temp);
  humidity.innerText = apiResult.main.humidity + "%";
  wind.innerText = Math.round(apiResult.wind.speed) + "km /h";
  description.innerText = apiResult.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${apiResult.weather[0].icon}@2x.png`
  );
}

function displayFarTemp(event){
event.preventDefault();
let temperature = document.getElementById("temp");
let fahrenheitTemp = (celciusTemp * 9) / 5 +32;
temperature.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitLink = document.getElementById("fahrenheit");
fahrenheitLink.addEventListener("click", displayFarTemp);

function displayCelTemp(){
  event.preventDefault();
  let temperature = document.getElementById("temp");
  temperature.innerHTML = Math.round(celciusTemp)
}

let celciusTemp = null;

let celciusLink =document.getElementById("celcius");
celciusLink.addEventListener("click", displayCelTemp);
