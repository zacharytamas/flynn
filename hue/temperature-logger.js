const fs = require('fs');

const api = require('./hue').api;
const DATA_PATH = 'data/';

const sensors = [
  {id: 5, location: 'Great Room', file: 'greatroom.tsv'}
];

function recordData() {
  sensors.forEach(sensor =>
    api.client.sensors.getById(sensor.id)
      .then(s => fs.appendFile(
        `${DATA_PATH}temp-${sensor.file}`,
        `${s.state.lastUpdated.replace('T', ' ')}\t${s.state.temperature}\n`
      ))
      .then(_ => console.log('Wrote data for', sensor.location)));
}

recordData();

setInterval(recordData, 15 * 60 * 1000);
