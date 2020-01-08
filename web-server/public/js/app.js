console.log("JavaScript client side file loaded");

const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messageTwo = document.querySelector("#messageTwo");

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = searchInput.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  getWeather(location);
});

// fetch is a client side function - it does not work in node

function getWeather(location) {
  fetch("http://localhost:3000/weather?address=" + location)
    .then(response => response.json())
    .then(parsedData => {
      if (parsedData.error) {
        messageOne.textContent = parsedData.error;
      } else {
        messageOne.textContent = parsedData.location;
        messageTwo.textContent = parsedData.forecast;
      }
    });
}
