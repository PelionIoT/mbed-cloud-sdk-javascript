var Devices = require('../index').Devices;
var config = require('./config');

function log(message) {
    console.log(message);
}

var devices = new Devices(config);
devices.listEndpoints()
.then(iterateEndpoints);

function iterateEndpoints(endpoints) {
    var promises = endpoints.map(endpoint => {
        return endpoint.listResources()
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
