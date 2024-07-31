const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    //checking if the log folder exists if not create it
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    //append to the log text file
    await fsPromises.appendFile(path.join(__dirname, "logs", logName), logItem);
    console.log("file appended");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { logEvents };
