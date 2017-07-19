const path = require('path');

module.exports = {
  apps : [
    {
      name: "hue-bootstrap",
      script: "./hue-bootstrap.js",
      cron_restart: "0 15 * * *"
    }
  ]
};