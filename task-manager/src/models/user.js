const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password'");
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// ----------- Set Up JWT Token ------------ //

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// ----------- setUpValue for findByCredentials ------------ //

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  // console.log(user);

  if (!user) {
    console.log("no user found");
    throw new Error("Unable to log in");
  }
  console.log(email, password);
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log("It's not a match");
    throw new Error("Unable to login");
  }

  return user;
};

// ----------- HASH PLAIN TEXT PASSWORD BEFORE SAVING ------------ //
// this needs to be a function not an arrow function
userSchema.pre("save", async function(next) {
  const user = this;
  // Here is where we want to hash our password. We will only hash the password if it has been modified by the user.
  // isModified will be true when the user is first created and also when the password is actually modified via a patch request.
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // if we never call next it will hang forever and never save the user
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
