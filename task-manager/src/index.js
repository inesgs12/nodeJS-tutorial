const express = require("express");
require("./db/mongoose"); // this will ensure that the file runs and that mongoose connects to the database.
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // this will automatically parse incoming json to an object

// ----------- GET ALL USERS ------------//
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ----------- GET SINGLE USER ------------//

app.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.send(500).send(e);
  }
});

// ----------- CREATE USER ------------//

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ----------- UPDATE USER ------------//

app.patch("/users/:id", async (req, res) => {
  console.log(req.body);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operator" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
      runValidators: true
    }); // new: true will return the updated user, not the initial one that was found.
    if (!user) {
      return res.status(400).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ----------- GET ALL TASKS ------------//
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ----------- GET SINGLE TASK ------------//

app.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.send(500).send(e);
  }
});

// ----------- CREATE TASK ------------//

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ----------- UPDATE TASK ------------//

app.patch("/tasks/:id", async (req, res) => {
  console.log(req.body);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "invalid updates!"
    });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.params.body, {
      new: true,
      runValidators: true
    });
    if (!task) {
      res.status(404).send();
    } else {
      res.status(200).send(task);
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log("Server is up on port");
});
