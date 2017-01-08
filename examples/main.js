var mbedCloudSDK = require('../dist/node/');
var config = require('./config');

function log(message) {
    console.log(message);
}

var devices = new mbedCloudSDK.Devices(config);
var access = new mbedCloudSDK.Access(config);

devices.on(mbedCloudSDK.Devices.EVENT_UPDATE, update => {
    log("up:" + update.ep);
});

devices.startNotifications();

devices.getConnected(function(err, devices) {
    devices.forEach(function(device) {
        device.getResources(function(err, resources) {
            log(device.name);
            resources.forEach(function(resource) {
                resource.getValue(function(err, value) {
                    if (err) {
                        log(err);
                        return;
                    }
                    log(resource.uri);
                    log("val:" + value);
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
            log("val:" + value);
        })
        .catch(err => {
            log(err);
        });
    });

    return Promise.all(promises);
}

access.getUsers(function(err, users) {
    users.forEach(user => {
        log(user.full_name);
    });
});

access.getUsers()
.then(users => {
    users.forEach(user => {
        log(user.full_name);
    });
});

setTimeout(function() {
    devices.stopNotifications();
}, 10000);