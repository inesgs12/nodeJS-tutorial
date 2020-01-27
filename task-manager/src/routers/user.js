const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/authentication");
const router = new express.Router();

// ----------- CREATE USER / SIGN UP ------------//

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// ----------- VALIDATE USER / LOGIN -----------//

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// ----------- GET ALL USERS ------------//
router.get("/users", auth, async (req, res) => {
  // this function will first call the middleware
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ----------- GET SINGLE USER ------------//

router.get("/users/:id", async (req, res) => {
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

// ----------- UPDATE USER ------------//

router.patch("/users/:id", async (req, res) => {
  console.log(req.body); // returns empty object
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Operator" });
  }

  try {
    const user = await User.findById(req.params.id);

    updates.forEach(update => (user[update] = req.body[update]));

    // This is where the middleware will get called.
    await user.save();

    // findByIdAndReplace bypases the middleware.
    // const user = await User.findOneAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    //   useFindAndModify: false
    // });
    // console.log("Id: " + req.params.id, " body: " + req.body);
    // console.log("User: " + user);
    if (!user) {
      return res.status(400).send();
    } else {
      res.status(200).send(user);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// ----------- DELETE USER ------------//

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
