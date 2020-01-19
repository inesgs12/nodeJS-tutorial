const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

// ----------- GET ALL TASKS ------------//
router.get("/tasks", async (req, res) => {
  try {
    const allTasks = await Task.find({});
    // res.send(tasks);
    res.render("tasks", {
      title: "Tasks",
      tasks: allTasks
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

// ----------- GET SINGLE TASK ------------//

router.get("/tasks/:id", async (req, res) => {
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

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ----------- UPDATE TASK ------------//

router.patch("/tasks/:id", async (req, res) => {
  console.log(req.body);
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid updates!" });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    // console.log("Id: " + req.params.id, " body: " + req.body);
    // console.log("Task: " + task);
    if (!task) {
      return res.status(400).send();
    } else {
      res.status(200).send(task);
    }
  } catch (e) {
    console.log(e);
  }
});

// ----------- DELETE TASK ------------//

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
