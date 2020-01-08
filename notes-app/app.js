const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");
// //node.js does not support [import validator from "validator"]

//--------------- Yargs --------------------
//------------------------------------------

// add, remove, read, list notes

// add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Note content",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

//remove command
// argv is where we get access to all of our arguments in our handler

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv) {
    notes.removeNote(argv.title);
  }
});

//list command
yargs.command({
  command: "list",
  describe: "List a note",
  handler() {
    notes.listNotes();
  }
});

//read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

yargs.parse(); // this goes through the process of parsing the arguments with all the configurations stated.

// console.log(process.argv);
// console.log(yargs.argv);

//------------------------------------------
