const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Set up the authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismynewcourse");

    
  } catch (e) {
    res.status(401).send(e);
  }
};

module.exports = auth;
