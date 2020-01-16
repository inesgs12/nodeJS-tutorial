const express = require("express");
require("./db/mongoose"); // this will ensure that the file runs and that mongoose connects to the database.
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // this will automatically parse incoming json to an object

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(error => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log("Server is up on port");
});
