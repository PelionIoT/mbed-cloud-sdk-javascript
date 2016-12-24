var Devices = require('../dist/node/main').Devices;
var config = require('./config');

function log(message) {
    console.log(message);
}

var devices = new Devices(config);
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
