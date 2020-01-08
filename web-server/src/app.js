const path = require("path");
const express = require("express");
const hbs = require("hbs");
// use this to start the server with hbs and js files: nodemon src/app.js -e js,hbs
// we want one directory for the views and one for the partials

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// we call express to create a new node application
// express does not take in any arguments
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// --------- SETUP HANDLEBARS ENGINE AND VIEWS LOCATION ----//
// set tells express which templeting engine we installed.
// hbs uses handlebars on the background but it's easier to work with express. Express expects all the views to live in the folder called 'views'
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// -----------SETUP STATIC DIRECTORY TO SERVE ----------------//
// app.use is a way to customize the server
app.use(express.static(publicDirectoryPath));

// app.get takes in 2 arguments: 1. the route; 2. function where we describe what we want to do when someone visits the route.
// We will always send back HTML or JSON(when we want to send back data). We provide an object or an array as the value to send
// app.get("/", (req, res) => {
//   res.send("<h1>Weather App</h1>");
// });

// the name of the document needs to match up with the name of the views document we created
app.get("/", (req, res) => {
  res.render("index", {
    // object which contains all of the values that we want that view to access
    title: "Weather App",
    name: "Ines Guerrero"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Ines Guerrero Sirker"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "this is the message"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide an address"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term"
    });
  } else {
    console.log(req.query);
    res.send({
      products: []
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ines",
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ines",
    errorMessage: "Page not found"
  });
});

// wildcard matches everything that hasn't been matched so far
app.get("*", (req, res) => {
  res.send("My 404 page");
});

//We need to start the server, passing a port and optionally, passing a function that runs once we start the server
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
