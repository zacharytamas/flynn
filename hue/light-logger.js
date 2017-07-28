const fs = require('fs');
const path = require('path');

const {lightLevelSensors} = require('../streams');
const keenClient = require('../keen').client;

const sensors = {
  7: {location: 'Great Room'}
};

function recordData(sensorConfig, state) {

  const {lightLevel, dark, daylight, lastUpdated} = state;

  keenClient.addEvent('lightLevel', {
    location: sensorConfig.location,
    lightLevel,
    dark,
    daylight,
    keen: {
      timestamp: lastUpdated
    }
  }, (err, res) => {
    if (err) {
      console.warn("[LightLogger] There was a problem recording this to Keen.");
    } else {
      console.info('[LightLogger] Recorded light levels for',
        sensorConfig.location, 'as', lightLevel);
    }
  });
}

function start() {
  console.info('[LightLogger] Started listening');

  lightLevelSensors
    .filter(sensor => Boolean(sensors[sensor.id]))
    .subscribe(sensor => {
      const sensorConfig = sensors[sensor.id];
      recordData(sensorConfig, sensor.state);
    });
}

module.exports = {
  start
}
