var Devices = require('./index').Devices;

var key = "<mbed_cloud_key>";
var domain = "https://api.mbedcloud.com";

function log(message) {
    console.log(message);
}

var devices = new Devices(key, domain);
devices.listEndpoints(function(err, endpoints) {
    endpoints.forEach(function(endpoint) {
        log(endpoint.name);
        endpoint.listResources(function(err, resources) {
            resources.forEach(function(resource) {
                log(resource.uri);
            });
        });
    });
});
