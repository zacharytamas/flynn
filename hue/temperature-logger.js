const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data');
const {temperatureSensors} = require('../streams');

const sensors = {
  5: {location: 'Great Room', file: 'greatroom.tsv'}
};

function recordData(sensorConfig, sensor) {
  fs.appendFileSync(
    `${DATA_PATH}/temp-${sensorConfig.file}`,
    `${sensor.state.lastUpdated.replace('T', ' ')}\t${sensor.state.temperature}\n`
  );
}

function start() {
  temperatureSensors
    .filter(sensor => sensors[sensor.id])
    .subscribe(sensor => {
      const sensorConfig = sensors[sensor.id];
      recordData(sensorConfig, sensor);
      console.log('Recorded temperature for', sensorConfig.location, 'as', sensor.state.temperature);
    });
}

module.exports = {
  start
}
