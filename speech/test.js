
const Sonos = require('sonos').Sonos;
const sonos = new Sonos(process.env.SONOS_HOST || '192.168.86.199')
const AWS = require('aws-sdk');
const Fs = require('fs');
const path = require('path');
const express = require('express');
const md5 = require('md5');

const FLYNN_VOICE = 'Brian';
const FLYNN_HOSTNAME = '192.168.86.107';
const FLYNN_SPEECH_PORT = 8010;

AWS.config.loadFromPath('./credentials.json');

var app = express();

app.use('/speech', express.static(path.join(__dirname, 'mp3')));
app.listen(FLYNN_SPEECH_PORT, () => {
  console.info('Flynn Speech Server listening on ', FLYNN_SPEECH_PORT);
})

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
});

function say(Text, speakers) {
  // TODO Since we store the mp3s based on the hash of their content,
  // if we say something we've said before, we can possibly use the same
  // MP3 and not incur the Amazon cost.
  Polly
    .synthesizeSpeech({Text, OutputFormat: 'mp3', VoiceId: FLYNN_VOICE})
    .promise()
    .then(data => {
      if (data.AudioStream instanceof Buffer) {
        const fileName = `${md5(Text)}.mp3`;
        Fs.writeFileSync(`${path.join(__dirname, 'mp3')}/${fileName}`, data.AudioStream);
        return fileName;
      }
    })
    .then(fileName => {
      sonos.play(`http://${FLYNN_HOSTNAME}:${FLYNN_SPEECH_PORT}/speech/${fileName}`);
    });
}

exports.say = say;