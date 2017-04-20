var http = require('http');
var express = require('express');
var mbedCloudSDK = require('../lib/');
var mapping = require("./mapping");

var port = 5000;
var envVarKey = "MBED_CLOUD_API_KEY";
var envVarHost = "MBED_CLOUD_HOST";
var logPrefix = "  \x1b[1m\x1b[34mtestserver\x1b[0m ";

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
    AccountManagementApi: new mbedCloudSDK.AccountManagementApi(config),
    CertificatesApi: new mbedCloudSDK.CertificatesApi(config),
    ConnectApi: new mbedCloudSDK.ConnectApi(config),
    DeviceDirectoryApi: new mbedCloudSDK.DeviceDirectoryApi(config),
    UpdateApi: new mbedCloudSDK.UpdateApi(config)
}

var app = express();
app.get("/_init", (req, res, next) => {
    res.send({});
});

function sendError(res, error) {
    var statusCode = error.status || 500;
    var message;
    if (!error.response) message = error.toString();
    else if (!error.response.error) message = error.response.toString();
    else if (!error.response.error.text) message = error.response.error.toString();
    else message = error.response.error.text.toString();

    console.log(`${logPrefix}${statusCode}: ${message}`);
    res.status(statusCode).send({
        message: message
    });
}

app.get("/:module/:method", (req, res, next) => {

    console.log(`${logPrefix}http://localhost:${port}${req.url}`);

    // Module
    var module = mapping.mapModule(req.params["module"]);

    // Method
    var method = mapping.mapMethod(module, req.params["method"]);

    if (!modules[module] || !modules[module][method]) {
        return sendError(res, `'${method}' not found on '${module}'`);
    }

    // Args
    var args = mapping.mapArgs(module, method, req.query["args"]);

    console.log(`${logPrefix}Calling '${method}' on '${module}'`);
    if (args.length) {
        console.log(`${logPrefix}using args:`, args);
    }

    args.push((error, result) => {
        if (error) {
            return sendError(res, error);
        }
        result = mapping.mapResult(module, method, result);
        res.json(result);
    });

    // Call
    modules[module][method].apply(modules[module], args);
});

// Start server
http.createServer(app)
.listen(port, () => console.log(`Tests server listening on port ${port}`));
