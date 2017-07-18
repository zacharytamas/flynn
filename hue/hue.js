
const hue = require('node-hue-api'),
      HueApi = hue.HueApi,
      lightState = hue.lightState;

let hueCredentials;

try {
  hueCredentials = require("./hue-credentials.json");
} catch (error) {
  console.error("Could not find Hue credentials, you must declare them in hue-credentials.json.");
}

class HueAPIWrapper {

  constructor({hostname, username}) {
    this.api = HueApi(hostname, username);
  }

  listLights() {
    this.api.lights().then(result => {
      console.log(result);
    })
  }

  turnOn(lightId) {
    this.api.setLightState(lightId,
      lightState.create().on()).done();
  }

  turnOff(lightId) {
    this.api.setLightState(lightId,
      lightState.create().off()).done();
  }

}

const api = new HueAPIWrapper(hueCredentials);
api.listLights();

api.turnOn('6');

exports = {api};
