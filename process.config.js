const path = require('path');

module.exports = {
  apps : [
    {
      name: "temperature-logger",
      script: "./hue/temperature-logger.js",
      cron_restart: "0 15 * * *",
      cwd: path.join(__dirname, 'hue')
    }
  ]
};