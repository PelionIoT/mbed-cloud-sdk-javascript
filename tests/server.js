var http = require('http');
var express = require('express');
var mbedSDK = require('../lib/');
var mapping = require("./mapping");
var functions = require('../lib/common/functions');

var port = 5000;
var envVarKey = "MBED_CLOUD_API_KEY";
var envVarHost = "MBED_CLOUD_HOST";
var line = "------------------------------------------\n";


// Environment configuration
var config = {
    apiKey: process.env[envVarKey],
    host: process.env[envVarHost]
};

if (!config.apiKey) {
    console.log(`Unable to find ${envVarKey} environment variable`);
    process.exit();
}

var modules = {
    AccessApi: new mbedSDK.AccessApi(config),
    LoggingApi: new mbedSDK.LoggingApi(config),
    CertificatesApi: new mbedSDK.CertificatesApi(config)
}

var app = express();
app.get("/:module/:method", (req, res, next) => {

    // Module
    var module = req.params["module"];
    module = module[0].toUpperCase() + module.slice(1);
    module = `${module}Api`;

    // Method
    var method = req.params["method"];
    method = functions.snakeToCamel(method);

    // Args
    var args = req.query["args"] || null;
    try {
        var jsonString = '{"' + decodeURI(args).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}';
        args = JSON.parse(jsonString);
    } catch(e) {}

    args = mapping(module, method, args);

    console.log(`${line}Calling '${method}' on '${module}'...`);
    if (args) {
        console.log("using args:", args, "...");
    }

    modules[module][method](args, result => {
        console.log(`done`);
        res.send(result);
    });
});

// Start server
http.createServer(app)
.listen(port, () => console.log(`Tests server listening on port ${port}`));
