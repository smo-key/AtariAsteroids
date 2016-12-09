// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var SerialPort = require("serialport");
const SERIALPORT = "COM7"; ///dev/tty-usbserial1
var port = new SerialPort(SERIALPORT,
{
   baudRate: 9600,
   parser: SerialPort.parsers.readline('\n')
});

port.on('open', function() {
  console.log("Port open!");
});
port.on('data', function (line) {
  var data = line.split(" ");
  processKey(32, data[2].startsWith('1') ? 1 : 0);
  processKey(13, data[3].startsWith('1') ? 1 : 0);
  var x = (data[0] / 2048)-1;
  var y = (data[1] / 2048)-1;
  x = Math.abs(x) <= 0.1 ? 0 : x;
  y = Math.abs(y) <= 0.1 ? 0 : y;
  left = x < -0.5;
  right = x > 0.5;
  up = y > 0.5;
  processKey(37, left ? 1 : 0);
  processKey(39, right ? 1 : 0);
  processKey(38, up ? 1 : 0);
});
port.on('error', function(err) {
  console.error('Error: ', err.message);
  alert(err.message);
});
