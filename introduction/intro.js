const os = require("os");
const path = require("path");
const math = require("./math");
const { add, subtract, multiply, division } = require("./math");

console.log(os.type()); // eg mac, windows, linux
console.log(os.version()); //os version eg windows 10
console.log(os.homedir()); //home directory

console.log(__dirname); //directory name
console.log(__filename); //filename
console.log();
console.log(path.dirname(__filename)); // the current directory name
console.log(path.basename(__filename)); // the current file name
console.log(path.extname(__filename)); //the current file extension name

/*
Returns an object that contains the following properties:
1. The root directory
2. The current directory
3. The current file name
4. The current file extension
5. The name of the current file
*/
console.log(path.parse(__filename));

/*Importing and using our own files */
console.log(math.add(20, 30));
console.log(multiply(20, 30));
console.log(subtract(40, 30));
console.log(division(60, 30));
