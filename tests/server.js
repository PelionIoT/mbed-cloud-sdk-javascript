var http = require('http');
var express = require('express');
var MbedCloudSDK = require('../lib/');
var mapping = require("./mapping");

var port = 5000;
var logPrefix = "  \x1b[1m\x1b[34mtestserver\x1b[0m ";
var envVarKey = "MBED_CLOUD_API_KEY";
var host = process.env["MBED_CLOUD_HOST"];

// Environment configuration
var config = {
    apiKey: process.env[envVarKey],
};

if (!config.apiKey) {
    console.log(`Unable to find ${envVarKey} environment variable`);
    process.exit();
}

if (host) {
    config.host = host;
    console.log(`Using host ${config.host}`);
}

var modules = {
    AccountManagementApi: new MbedCloudSDK.AccountManagementApi(config),
    CertificatesApi: new MbedCloudSDK.CertificatesApi(config),
    ConnectApi: new MbedCloudSDK.ConnectApi(config),
    DeviceDirectoryApi: new MbedCloudSDK.DeviceDirectoryApi(config),
    UpdateApi: new MbedCloudSDK.UpdateApi(config)
}

var app = express();
app.get("/_init", (req, res, next) => {
    res.send({});
});

function sendError(res, error) {
    var statusCode = error.code || 500;
    var message = error.message;
    console.log(`${logPrefix}${statusCode}: ${message}`);

    res.status(statusCode).send({
        message: message
    });
}

app.get("/:module/:method", (req, res, next) => {

    console.log(`${logPrefix}TEST http://localhost:${port}${req.url} at ${new Date().toISOString()}`);

    // Module
    var module = mapping.mapModule(req.params["module"]);

    // Method
    var method = mapping.mapMethod(module, req.params["method"]);

    if (!modules[module] || !modules[module][method]) {
        return sendError(res, {
            message: `'${method}' not found on '${module}'`
        });
    }

    // Args
    var args = mapping.mapArgs(module, method, req.query["args"]);

    console.log(`${logPrefix}CALLING '${method}' on '${module}'`);
    if (args.length) {
        console.log(`${logPrefix}USING`, args);
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
