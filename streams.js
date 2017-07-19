
const Rx = require('rxjs/Rx');
const hueApi = require('./hue/hue').api;

// TODO Temporarily high during testing
const HUE_SENSOR_POLL_RATE = 5 * 1000;

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