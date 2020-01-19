const express = require("express");
require("./db/mongoose"); // this will ensure that the file runs and that mongoose connects to the database.
const hbs = require("hbs");
const path = require("path");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // this will automatically parse incoming json to an object

app.use(userRouter, taskRouter);

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

app.get("/", (req, res) => {
  res.render("index", {
    title: "Task Manager",
    name: "Ines Guerrero"
  });
});

app.listen(port, () => {
  console.log("Server is up on port");
});
