
const Rx = require('rxjs/Rx');
const hueApi = require('./hue/hue').api;

const HUE_SENSOR_POLL_RATE = 5 * 60 * 1000;  // five minutes

const hueSensorData = new Rx.Subject();

Rx.Observable.interval(HUE_SENSOR_POLL_RATE)
  .subscribe(() => {
    hueApi.client.sensors.getAll()
      .then(sensors => sensors.forEach(s => hueSensorData.next(s)));
  });

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