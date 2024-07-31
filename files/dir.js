const fs = require("fs");
const path = require("path");

if (!fs.existsSync(path.join(__dirname, "new"))) {
  fs.mkdir(path.join(__dirname, "new"), (error) => {
    if (error) throw error;

    console.log("file created");
  });
} else {
  console.log("The file already exists");
}

if (fs.existsSync(path.join(__dirname, "new"))) {
  fs.rmdir(path.join(__dirname, "new"), (error) => {
    if (error) throw error;

    console.log("file removed");
  });
}
