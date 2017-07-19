
// Start logging temperatures in rooms we care about.
const temperatureLogger = require('./hue/temperature-logger');
temperatureLogger.start();