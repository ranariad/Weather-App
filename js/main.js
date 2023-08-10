// todo: declare global variables
let dayBox = document.querySelector(".Weathers.row"),
WeatherDate; // store weather data get from api


// todo: create a function that converts day number to string
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// todo: create a function that converts month number to string
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//todo: create a function that gets weather data from the weather Api
let apiResponse
async function getWeatherDate( location = "alexandria") {
   apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=bd62e4fcc6ba4a5aa3a61518230708&q=${location}&days=3&aqi=yes&alerts=no`)
   WeatherDate = await apiResponse.json()
  console.log(WeatherDate);
  displayCurrentDay() 
  displayFutureForecast();
}


//todo: create a function that display weather data of current day
function displayCurrentDay() {
  dayBox.innerHTML = `
  <div class="col-lg-4">
  <div id="day1Box" class="rounded-3">
    <div
      class="weatherDate d-flex justify-content-between align-items-center px-4 py-3 rounded-3"
    >
      <p class="day w-50 text-capitalize mb-0">${
        weekDays[new Date(WeatherDate.forecast.forecastday[0].date).getDay()]
      }</p>
      <p class="date w-50 text-capitalize text-end mb-0">
      ${new Date(WeatherDate.forecast.forecastday[0].date).getDate()} 
      ${
        months[new Date(WeatherDate.forecast.forecastday[0].date).getMonth()]
      }</p>
    </div>
    <div class="weatherInfo px-4 py-3">
      <p class="weatherLocation fw-medium fs-5 text-capitalize">
         ${WeatherDate.location.region} </p>
      <div
        class="weatherForcast d-flex justify-content-between align-items-center"
      >
        <p class="weatherDeg text-light fw-bolder mb-0 w-75">${
          WeatherDate.current.temp_c
        }&deg;C</p>
        <div class="weatherIcon w-25">
          <img src='${
            WeatherDate.current.condition.icon
          }' alt="weather condition icon" class="sunImg w-100" />
        </div>
      </div>
      <p id="weatherDesc" class="text-capitalize fs-5">${
        WeatherDate.current.condition.text
      }</p>
      <div class="weatherIndications my-4 d-flex   gap-3">
        <div class="weatherIndicator humadity me-3 text-capitalize">
          <img
            src="./imgs/icon-umberella.png"
            alt="ubmrella"
            class="me-2"
          />
          <span> ${WeatherDate.current.humidity}%</span>
        </div>
        <div class="weatherIndicator wind me-3">
          <img
            src="./imgs/icon-wind.png"
            alt="wind image"
            class="me-2"
          /><span> ${WeatherDate.current.wind_kph}km/h</span>
        </div>
        <div class="weatherIndicator compass me-3">
          <img
            src="./imgs/icon-compass.png"
            alt="wind image"
            class="me-2 "
          /><span > ${WeatherDate.location.country}km/h</span>
        </div>
        
      </div>
    </div>
  </div>
</div>
  `;
}

//todo: create a function that display future weatherForcast
function displayFutureForecast() {
  for (let i = 1; i < 3; i++) {
    dayBox.innerHTML += `
    <div class="col-lg-4">
    <div id="futureForecast" class="child-${i} rounded-3">
      <div class="weatherDate px-4 py-3 rounded-3">
        <p class="tomorrow text-capitalize mb-0 text-center">
          ${
            weekDays[
              new Date(WeatherDate.forecast.forecastday[i].date).getDay()
            ]
          }
        </p>
      </div>
      <div
        class="day2Info px-4 py-3 d-flex justify-content-between align-items-center"
      >
        <div class="w-100">
          <div
            class="d-flex flex-column align-items-center"
          >
            <div class="w-25 weatherIcon">
            <img
              src="${WeatherDate.forecast.forecastday[i].day.condition.icon}"
              alt="sun image"
              class="sunPhoto text-center mb-2 w-100"
            />
            </div>
            <div class="w-75 mb-3 text-center">
              <p class="tomDegree text-light fs-4 fw-bolder mb-0">${
                WeatherDate.forecast.forecastday[i].day.maxtemp_c
              }&deg;C</p>
              <p class="tomInfo fs-5 mt-0 mb-3 ps-3">${
                WeatherDate.forecast.forecastday[i].day.mintemp_c
              }&deg;C</p>
            </div>
           
          </div>
          <p class="tomDesc text-center text-capitalize fs-5">
          ${WeatherDate.forecast.forecastday[i].day.condition.text}
          </p>
          
        </div>
      </div>
    </div>
  </div>
    `;
  }
}

//todo: search for a city
let searchInput = document.querySelector(".searchField");
searchInput.addEventListener("keyup", searchCity);
document.querySelector(".searchBtn").addEventListener("click", searchCity);


//todo: craete a function taht search for a city
function searchCity() {
  // make a condition to make sure that when user delete search value, the weather data of his current location will be displayed
  if (searchInput.value === "") {
    getCurrentWeather();
  } else if (searchInput.value !== "") {
    getWeatherDate(searchInput.value);
  }
}

//todo: get wather data of current user
function getCurrentWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      // getcurrentposition needs callback function, position parametr retun data about current position of user
      getWeatherDate(
        [position.coords.latitude, position.coords.longitude].join(",") // put latitude and longitude in an array then convert them to string, to prevent the js to interpret them as two different parameters if they were not used in an array
      );
    });
  }
}

//todo: create async function that displays all weather data in the correct order
async function displayAllData() {
  // display alexandria as a default location untill user respond to the location allowance message
  await getWeatherDate();
  //get weather of current location of user
  getCurrentWeather();
}

displayAllData();