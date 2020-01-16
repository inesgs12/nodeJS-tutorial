const mongoose = require("mongoose");

//mongoose uses the mongodb module behind the scenes.
// we provide the database name in the url string
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true // this will ensure that when mongoose works with mongodb the indeces are created
});
