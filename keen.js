
const keenCredentials = require('./keen-credentials.json');

const KeenTracking = require('keen-tracking');
const client = new KeenTracking(keenCredentials);

module.exports = {client};