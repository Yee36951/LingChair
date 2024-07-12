const { pino } = require("pino")
const { default: PinoPretty } = require('pino-pretty')

const logger = pino(PinoPretty())

module.exports = logger
