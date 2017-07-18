
const huejay = require('huejay');


let hueCredentials;

try {
  hueCredentials = require("./hue-credentials.json");
} catch (error) {
  console.error("Could not find Hue credentials, you must declare them in hue-credentials.json.");
}

class HueAPIWrapper {

  constructor({hostname, username}) {
    this.client = new huejay.Client({host: hostname, username: username });
  }

  getAllLights() {
    return this.client.lights.getAll();
  }

}

const api = new HueAPIWrapper(hueCredentials);

module.exports = {api};
