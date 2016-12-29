var mbedSDK = require('../dist/node/');
var config = require('./config');

function log(message) {
    console.log(message);
}

var devices = new mbedSDK.Devices(config);
var access = new mbedSDK.Access(config);

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

access.getUsers(null, null, null, null, null, function(err, users) {
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
