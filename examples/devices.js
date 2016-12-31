var Devices = require('../dist/node/').Devices;
var config = require('./config');

function log(message) {
    console.log(message);
}

var devices = new Devices(config);

devices.getEndpoints(function(err, endpoints) {
    endpoints.forEach(function(endpoint) {
        endpoint.getResources(function(err, resources) {
            log(endpoint.name);
            resources.forEach(function(resource) {
                resource.getValue(function(err, value) {
                    log(resource.uri);
                    log(value);
                });
            });
        });
    });
});

devices.getEndpoints()
.then(iterateEndpoints);

function iterateEndpoints(endpoints) {
    var promises = endpoints.map(endpoint => {
        return endpoint.getResources()
        .then(resources => {
            log(endpoint.name);
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
