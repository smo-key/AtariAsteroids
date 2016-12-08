// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var SerialPort = require("serialport");
const SERIALPORT = "COM6"; ///dev/tty-usbserial1
var port = new SerialPort(SERIALPORT,
{
   baudRate: 9600,
   parser: SerialPort.parsers.readline('\n')
});

port.on('open', function() {
  console.log("Port open!");
});
port.on('data', function (data) {
  console.log('Data: ' + data);
});
port.on('error', function(err) {
  console.error('Error: ', err.message);
})
