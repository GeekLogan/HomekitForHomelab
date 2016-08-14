var path = require('path');
var storage = require('node-persist');
var uuid = require('./').uuid;
var Accessory = require('./').Accessory;
var accessoryLoader = require('./lib/AccessoryLoader');

console.log("Starting Homekit Sensor Server!");

storage.initSync();
var targetPort = 51826;
var dir = path.join(__dirname, "accessories");
var accessories = accessoryLoader.loadDirectory(dir);

accessories.forEach(function(accessory) {
  if (!accessory.username)
    throw new Error("Username not found on accessory '" + accessory.displayName + 
                    "'. Core.js requires all accessories to define a unique 'username' property.");
  if (!accessory.pincode)
    throw new Error("Pincode not found on accessory '" + accessory.displayName + 
                    "'. Core.js requires all accessories to define a 'pincode' property.");

  accessory.publish({
    port: targetPort++,
    username: accessory.username,
    pincode: accessory.pincode
  });
});
