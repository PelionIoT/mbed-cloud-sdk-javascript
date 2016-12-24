var Devices = require('../dist/node/main').Devices;
var config = require('./config');

function log(message) {
    console.log(message);
}

var devices = new Devices(config);
devices.getEndpoints(null, function(err, endpoints) {
    endpoints.forEach(function(endpoint) {
        endpoint.getResources(function(err, resources) {
            log(endpoint.name);
            resources.forEach(function(resource) {
                resource.getValue(null, function(err, value) {
                    log(resource.uri);
                    log(value);
                });
            });
        });
    });
});
