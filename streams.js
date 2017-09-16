
const Rx = require('rxjs/Rx');
const hueApi = require('./hue/hue').api;

const HUE_SENSOR_POLL_RATE = 0.5 * 60 * 1000;  // 30 seconds

const hueSensorData = Rx.Observable.interval(HUE_SENSOR_POLL_RATE)
  .startWith(1)
  .flatMap(() => Rx.Observable.fromPromise(hueApi.client.sensors.getAll()))
  .flatMap(sensors => sensors)

const distinctSensorData = hueSensorData
  .distinct(sensor => sensor.state.lastUpdated);

const temperatureSensors = distinctSensorData
  .filter(sensor => sensor.type == 'ZLLTemperature');

const presenceSensors = distinctSensorData
  .filter(sensor => sensor.type == 'ZLLPresence');

const lightLevelSensors = distinctSensorData
  .filter(sensor => sensor.type == 'ZLLLightLevel');

module.exports = {
  hueSensorData,
  temperatureSensors,
  presenceSensors,
  lightLevelSensors
};