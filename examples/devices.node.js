var Devices = require('../index').Devices;

var key = "<mbed-cloud-app-key>";
var domain = "https://api.mbedcloud.com";

function log(message) {
    console.log(message);
}

var devices = new Devices(key, domain);

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

devices.listEndpoints()
.then(iterateEndpoints);
