// YARGS ***************************************
const yargs = require("yargs")(process.argv.slice(2));

const args = yargs.default({ port: 8080 }).argv;

console.log("\n\nArgumentos de YARGS");
console.log(args);
console.log(args.port);
// **********************************************
