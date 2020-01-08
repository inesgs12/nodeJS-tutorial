// CRUD operations to manage data successfully

// const mongodb = require("mongodb"); //npm library
// const MongoClient = mongodb.MongoClient; // this will give us access to the necessary function to connect to the database.
// const ObjectID = mongodb.ObjectID; // will allow us to interact with the IDs

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017"; // better to use 127 than localhost - localhost sometimes slows processes down.
const databaseName = "task-manager";

const id = new ObjectID(); // This function will generate a new ID for us
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database");
    }

    // -----------  CREATE ---------------------//
    //------------------------------------------//
    const db = client.db(databaseName); // you don't have to create it, if it does not exist, it will create it for you.
    // db.collection("users").insertOne(
    //   {
    //     _id: id, // Not necessary, mongo does it for us, but if we needed to do it, this is the way.
    //     name: "Oliver",
    //     age: 31
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops); // ops is an array of document
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Luke",
    //       age: 28
    //     },
    //     {
    //       name: "Dom",
    //       age: 36
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops); // ops is an array of document
    //   }
    // );

    // db.collection("tasks").insertMany(
    //   [
    //     {
    //       description: "clean house",
    //       completed: true
    //     },
    //     {
    //       description: "eat healthy",
    //       completed: false
    //     },
    //     {
    //       description: "plant trees",
    //       completed: false
    //     }
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert tasks");
    //     }

    //     console.log(result.ops);
    //   }
    // );

    // ------------ READ -------------------------//
    //--------------------------------------------//
    db.collection("users").findOne(
      {
        name: "Dom"
      },
      (error, user) => {
        if (error) {
          return console.log("Unable to fetch");
        }

        console.log(user);
      }
    ); // find One will return the first one that it finds.
    // I can't search by the string ID, I need to search 'new ObjectID("string")'

    // ---- find ------- //
    // find doesn't take the normal callback function. What you get back is a cursor which is a pointer to data, you can limit, count, aggregate, toArray, amongst others.

    // db.collection("users")
    //   .find({ age: 33 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 33 })
    //   .count((error, users) => {
    //     console.log(users);
    //   });


  }
);
