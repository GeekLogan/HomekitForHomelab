var Accessory = require('../').Accessory;
var Service = require('../').Service;
var Characteristic = require('../').Characteristic;
var uuid = require('../').uuid;

var sys = require('util')
var exec = require('child_process').exec;

//----------CONFIG----------------
var name = "SERVER";
var pin = "000-00-000";
//----------CONFIG----------------

var temp;

var sensorUUID = uuid.generate( 'generic:server:' + name );
var sensor = exports.accessory = new Accessory( 'CPU of ' + name, sensorUUID );

function getTemp(error, stdout, stderr) {
	temp = parseFloat( stdout + "" );
	console.log( "Temperature Checked (" + temp + " degC)" );
}

sensor.username = "C1:5D:3A:AE:5E:FA";
sensor.pincode = pin;

sensor.addService(Service.TemperatureSensor)
  .getCharacteristic(Characteristic.CurrentTemperature)
  .on('get', function(callback) {
    var cmd = "sensors | fgrep --color=never Core | head - -n 1 | cut -d'+' -f 2";
    exec( cmd, getTemp );

    callback(null, temp);
  });

sensor.getService(Service.TemperatureSensor)
  .getCharacteristic(Characteristic.Displ)
