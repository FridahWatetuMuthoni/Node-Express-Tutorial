const { logEvents } = require("./logEvents");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

//initialize the object

const myEmitter = new MyEmitter();

//add listener for log event

myEmitter.on("log", (msg) => {
  logEvents(msg);
});

myEmitter.emit("log", "log event emitted");
