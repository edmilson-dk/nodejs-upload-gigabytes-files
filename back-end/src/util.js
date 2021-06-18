const logger = require("pino")({
  prettyPrint: {
    ignore:"pid,hostname",
  }
});

module.exports = {
  logger,
};