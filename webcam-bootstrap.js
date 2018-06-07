
const NodeWebcam = require( "node-webcam" );

let opts = {
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  output: 'jpeg',
  device: 'HD Pro Webcam C920'
};

function fileName(location) {
  const now = new Date();
  return [
    location,
    now.toISOString().split('.')[0].replace('T', '--').replace(/\:/g, '-')
  ].join('-');
  return `${location}-${now.getFullYear()}`
}

function takePhoto(location = 'desk') {
  NodeWebcam.capture(fileName(location), opts, (err, data) => {
    if (!err) console.log('Photo taken:', data);
  })
}

setInterval(takePhoto, 1000 * 60);
takePhoto();
