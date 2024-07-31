# NODE.JS TUTORIAL

## HOW DOES NODE.JS DIFFER FROM VANILLA JS

1. Node runs on a server and not in the browser
2. The console is the terminal window
3. We have the global object instead of the window object
4. It has CommonJS modules that help us iteract with the file system, os etc
5. It misses some JS APIS like fetch => you can use axios

## Node Modules

### nodemon

Nodemon is used to moniter you files and restarts the server when you save the files.
It looks for index.js by default but you can add the filename as a cmd arguement

Global

```sh
npm i nodemon -g
```

Dev dependecy

```sh
npm i nodemon -D
```

How to run nodemon

```sh
nodemon
```

```sh
nodemon server
```

npm install axios mongodb express uuid date-fns
npm install nodemon -D
npm install nodemon -g
