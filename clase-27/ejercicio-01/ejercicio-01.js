const minimist = require("minimist");

const optionalArgs = {
  alias: {
    m: "modo",
    p: "puerto",
    d: "debug",
  },
  default: {
    modo: "prod",
    puerto: 6100,
    debug: false,
  },
};

const args = minimist(process.argv, optionalArgs);

console.log(args);
