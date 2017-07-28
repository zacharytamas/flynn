
// Start logging temperatures in rooms we care about.
const temperatureLogger = require('./hue/temperature-logger');
temperatureLogger.start();

// Start logging light levels in rooms we care about.
const lightLogger = require('./hue/light-logger');
lightLogger.start();