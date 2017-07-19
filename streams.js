
const Rx = require('rxjs/Rx');
const hueApi = require('./hue/hue').api;

const HUE_SENSOR_POLL_RATE = 10 * 60 * 1000;  // ten minutes

const hueSensorData = new Rx.Subject();

Rx.Observable.interval(HUE_SENSOR_POLL_RATE)
  .subscribe(() => {
    hueApi.client.sensors.getAll()
      .then(sensors => sensors.forEach(s => hueSensorData.next(s)));
  });

const temperatureSensors = hueSensorData.filter(sensor =>
  sensor.type == 'ZLLTemperature');

module.exports = {
  hueSensorData,
  temperatureSensors
}