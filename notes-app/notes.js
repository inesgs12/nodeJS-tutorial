const fs = require("fs");
const chalk = require("chalk");

const addNote = function(title, body) {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => {
    return note.title === title;
  });

  if (duplicateNote.length === 0) {
    notes.push({
      title: title,
      body: body
    });

    savenotes(notes);
    console.log("new note added");
  } else {
    console.log("note title taken");
  }
};

const removeNote = title => {
  const notes = loadNotes();

  const notesToKeep = notes.filter(note => {
    return note.title !== title;
  });

  if (notesToKeep.length < notes.length) {
    savenotes(notesToKeep);
    console.log(chalk.bgGreen("Note removed!"));
  } else {
    console.log(chalk.bgRed("Note not found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.red("Your notes:"));
  notes.forEach(note => {
    console.log(chalk.cyan(note.title));
  });
};

const savenotes = function(notes) {
  // to save it, stringify it and then write it to the file
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = function() {
  try {
    // read file, convert to string, parse it
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const readNote = title => {
  const notes = loadNotes();
  const noteToRead = notes.find(note => {
    return note.title === title;
  });

  if (noteToRead) {
    console.log(chalk.blue(noteToRead.title + "\n" + noteToRead.body));
  } else {
    console.log(chalk.red("No note found!"));
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};
