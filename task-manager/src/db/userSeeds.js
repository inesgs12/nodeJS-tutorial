const User = require("../models/user");

function seedUsers(req, res) {
  const users = [
    {
      name: "Ines",
      age: 20,
      email: "ines@email.com",
      password: "hello.world"
    },
    {
      name: "Oliver",
      age: 21,
      email: "oliver@email.com",
      password: "whatAPass"
    },
    {
      name: "Dom",
      age: 22,
      email: "dom@email.com",
      password: "superStrongPassYeah"
    },
    {
      name: "Michael",
      age: 23,
      email: "michael@mail.com",
      password: "hello.again"
    }
  ];

  for (user of users) {
    const newTask = new User(user);
    newTask.save();
  }

  res.send("Users seeded!");
}

module.exports = seedUsers;
