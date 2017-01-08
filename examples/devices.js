var Devices = require('../dist/node/').Devices;
var config = require('./config');

function log(message) {
    console.log(message);
}

var devices = new Devices(config);

devices.getConnected(function(err, devices) {
    devices.forEach(function(device) {
        device.getResources(function(err, resources) {
            log(device.name);
            resources.forEach(function(resource) {
                resource.getValue(function(err, value) {
                    log(resource.uri);
                    log(value);
                });
            });
        });
    });
});

devices.getConnected()
.then(iterateDevices);

function iterateDevices(devices) {
    var promises = devices.map(device => {
        return device.getResources()
        .then(resources => {
            log(device.name);
            return iterateResources(resources);
        });
    });

    return Promise.all(promises);
}

function iterateResources(resources) {
    var promises = resources.map(resource => {
        return resource.getValue()
        .then(value => {
            log(resource.uri);
            log(value);
        });
    });

    return Promise.all(promises);
}
