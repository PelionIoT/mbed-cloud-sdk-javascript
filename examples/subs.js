var Devices = require('../dist/node/').Devices;
var config = require('./config');

function log(message) {
    console.log(message);
}

var devices = new Devices(config);

 devices.startNotifications({
            requestCallback: function(stuff) {
            //    log("cb:");
            }
        });

        devices.getConnected(function(err, devices) {
            devices.forEach(function(device) {
                log(device.name);
                if (device.name === "015968f39ae900000000000100100120") {
                    device.getResources(function(err, resources) {
                        resources.forEach(function(resource) {
                            resource.getValue(function(err, value) {
                                var res = resource.uri + " - ";
                                res += err ? "Error (" + err + ")" : value;
                                log(res);
                               
                            });
                        });
                    });
                }
            });
        });