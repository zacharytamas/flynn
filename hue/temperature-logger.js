const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data');
const {temperatureSensors} = require('../streams');
const keenClient = require('../keen').client;

const sensors = {
  5: {location: 'Great Room'}
};

function recordData(sensorConfig, lastUpdated, temperature) {
  keenClient.addEvent('temperature', {
    location: sensorConfig.location,
    temperatureCelsius: temperature,
    temperatureFahrenheit: temperature * 1.8 + 32,
    keen: {
      timestamp: lastUpdated
    }
  }, (err, res) => {
    if (err) {
      console.warn("[TempLogger] There was a problem recording this to Keen.");
    } else {
      console.info('[TempLogger] Recorded temperature for',
        sensorConfig.location, 'as', temperature);
    }
  });
}

function start() {
  temperatureSensors
    .filter(sensor => Boolean(sensors[sensor.id]))
    .subscribe(sensor => {
      const sensorConfig = sensors[sensor.id];
      const {lastUpdated, temperature} = sensor.state;
      recordData(sensorConfig, lastUpdated, temperature);
    });
}

module.exports = {
  start
}
