const fs = require("fs");

// READ DATA AND PARSE IT
const dataBuffer = fs.readFileSync("1-json.json");
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

// CHANGE DATA INFO
data.name = "Ines";
data.age = 32;

// WRITE THE NEW DATA INTO THE FILE
const newData = JSON.stringify(data);
fs.writeFileSync("1-json.json", newData);
