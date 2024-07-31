const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const { logEvents } = require("./logEvents");
const EventEmitter = require("events");

class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
myEmitter.on("log", (msg, filename) => {
  logEvents(msg, filename);
});

const PORT = process.env.PORT || 8080;

const serverFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(rawData) : rawData;
    response.writeHead(filePath.includes("404.html") ? 400 : 200, {
      "Content-Type": contentType,
    });
    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (error) {
    console.log(error);
    myEmitter.emit("log", `${error.name}\t${error.message}`, "errorLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((request, response) => {
  console.log(request.url, request.method);
  myEmitter.emit("log", `${request.url}\t${request.method}`, "reqlog.txt");

  const extension = path.extname(request.url);
  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/jpeg";
      break;
    case ".text":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && request.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && request.url.slice(-1) === "/"
      ? path.join(__dirname, "views", request.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", request.url)
      : path.join(__dirname, "data", request.url);

  //makes the .html extension not required in the browser
  if (!extension && request.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  const fileExits = fs.existsSync(filePath);

  if (fileExits) {
    //serve the file
    console.log("file exits");
    serverFile(filePath, contentType, response);
  } else {
    switch (path.parse(filePath).base) {
      case "old-page.html":
        response.writeHead(301, { Location: "/new-page.html" });
        response.end();
        break;
      case "www-page.html":
        response.writeHead(301, { Location: "/" });
        response.end();
        break;
      default:
        //serve a 404 response
        serverFile(
          path.join(__dirname, "views", "404.html"),
          "text/html",
          response
        );
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
