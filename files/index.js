const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

fs.readFile(path.join(__dirname, "text.txt"), "utf-8", (error, data) => {
  if (error) throw error;

  //console.log(data);
});

fs.writeFile(path.join(__dirname, "notes.txt"), "Nice to meet you", (error) => {
  if (error) throw error;

  console.log("File writing complete");
});

fs.appendFile(
  path.join(__dirname, "notes.txt"),
  "\nHow is programming taking you",
  (error) => {
    if (error) throw error;

    console.log("File appending complete");
  }
);

process.on("unCaughtException", (err) => {
  console.error(`There was an uncaught error:${err}`);
  process.exit(1);
});

const fileOperations = async () => {
  try {
    //Read Files
    const data = await fsPromises.readFile(
      path.join(__dirname, "text.txt"),
      "utf-8"
    );
    console.log(data);

    //Writes Files
    await fsPromises.writeFile(path.join(__dirname, "asycfs.txt"), data);

    //Delete Files
    await fsPromises.unlink(path.join(__dirname, "notes.txt"));

    //appends exiting file and create a new one if their isnt one
    await fsPromises.appendFile(
      path.join(__dirname, "asycfs.txt"),
      "\nNyce to meet you"
    );

    //renames files
    await fsPromises.rename(
      path.join(__dirname, "asycfs.txt"),
      path.join(__dirname, "asycfile.txt")
    );
  } catch (err) {
    console.error(err);
  }
};

fileOperations();
