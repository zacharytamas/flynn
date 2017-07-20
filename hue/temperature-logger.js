const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data');
const {temperatureSensors} = require('../streams');

const sensors = {
  5: {location: 'Great Room', file: 'greatroom'}
};

function recordData(sensorConfig, lastUpdated, temperature) {
  fs.appendFileSync(
    `${DATA_PATH}/${lastUpdated.split('T')[0]}-${sensorConfig.file}.tsv`,
    `${lastUpdated.replace('T', ' ')}\t${temperature}\n`
  );
}

function start() {
  temperatureSensors
    .filter(sensor => sensors[sensor.id])
    .subscribe(sensor => {
      const sensorConfig = sensors[sensor.id];
      recordData(sensorConfig, sensor.state.lastUpdated, sensor.state.temperature);
      console.log('Recorded temperature for', sensorConfig.location, 'as', sensor.state.temperature);
    });
}

module.exports = {
  start
}
