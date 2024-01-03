const pino = require("pino");
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "dd-MM-yyyy HH-MM-ss",
      colorize: true,
    },
  },
});

module.exports = logger;
