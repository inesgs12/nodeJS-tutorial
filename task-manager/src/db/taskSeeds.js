const Task = require("../models/task");

function seedTasks(req, res) {
  const tasks = [
    {
      description: "clean house",
      completed: true
    },
    {
      description: "finish project",
      completed: false
    },
    {
      description: "go on holiday",
      completed: false
    },
    {
      description: "make dinner",
      completed: true
    }
  ];

  for (task of tasks) {
    const newTask = new Task(task);
    newTask.save();
  }

  console.log("Tasks seeded!");
}

module.exports = seedTasks;
