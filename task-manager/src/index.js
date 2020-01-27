const express = require("express");
require("./db/mongoose"); // this will ensure that the file runs and that mongoose connects to the database.
const hbs = require("hbs");
const path = require("path");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const taskSeeds = require("../src/db/taskSeeds");
const userSeeds = require("../src/db/userSeeds");

const app = express();
const port = process.env.PORT || 3000;

// add middleware before any app.use calls

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

// // ----------- Seed Tasks --------------- //
// app.get("/seedTasks", () => {
//   console.log(taskSeeds);
//   // console.log(taskSeeds.seedTasks);
//   taskSeeds.seedTasks;
// });

// // ----------- Seed Users ---------------//
// app.get("/seedUsers", () => {
//   userSeeds.seedUsers;
// });

app.listen(port, () => {
  console.log("Server is up on port");
});

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  // the return value from sign is the authentication token. The third argument can be an expiration time that you want the token to be valid.
  const token = jwt.sign({ _id: "abcd" }, "thisismynewcourse", {
    expiresIn: "1 hour"
  });
  // the first part is the header with meta info about what type of token it is and the algorithm that was used to generate it (jwt token). The second part is the body. The last part is the signature that is used to verify the web token. (www.base64decode.org)
  console.log(token);

  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};

myFunction();
