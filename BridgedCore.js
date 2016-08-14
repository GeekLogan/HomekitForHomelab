var fs = require('fs');
var path = require('path');
var storage = require('node-persist');
var uuid = require('./').uuid;
var Bridge = require('./').Bridge;
var Accessory = require('./').Accessory;
var accessoryLoader = require('./lib/AccessoryLoader');

console.log( "[System]\tHAP Bridge Starting..." );

// Initialize our storage system
storage.initSync();

var name = 'TEST Bridge B';
console.log( "[System]\t\tUsing Name: %s", name );

// Start by creating our Bridge which will host all loaded Accessories
var bridge = new Bridge(name, uuid.generate( name ));

bridge.on('identify', function(paired, callback) {
  console.log( "[System]\tIdentifying Bridge: " + name );
  callback();
});

var dir = path.join(__dirname, "accessories");
var accessories = accessoryLoader.loadDirectory(dir);

accessories.forEach(function(accessory) {
  bridge.addBridgedAccessory(accessory);
});

bridge.publish({
  username: "CC:22:3D:E3:CE:F6",
  port: 51826,
  pincode: "000-00-000",
  category: Accessory.Categories.BRIDGE
});
