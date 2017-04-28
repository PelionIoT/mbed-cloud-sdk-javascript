/*
* mbed Cloud JavaScript SDK
* Copyright ARM Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

var fs = require('fs');
var http = require('http');
var express = require('express');

var mbed = require('../../lib/');
var config = require('./config');

var url = "http://4bf8c2e4.ngrok.io";
var port = 3002;

var connect = new mbed.ConnectApi(config);
var app = express();

// Set system to await notifications for callbacks instead of emitting asyncIds
connect.handleNotifications = true;

// Listen for PUTs at the root URL
app.put("/", (req, res, next) => {

    var data = "";
    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function() {
        // Parse data into JSON and inject into connect notification system
        data = JSON.parse(data);
        connect.notify(data);
    });

	res.sendStatus(200);
});

// Start server
http.createServer(app).listen(port, () => {
    console.log(`Webhook server listening on port ${port}`);
});

// Set up webhook
connect.getWebhook((error, webhook) => {
    if (!webhook) console.log("No webhook currently registered");
    else console.log(`Webhook currently set to ${webhook.url}`);

    connect.updateWebhook(url, error => {
        if (error) {
            console.log(`${error.message} - Unable to set webhook to ${url}, please ensure the URL is publicly accessible`);
            return;
        }
        console.log(`Webhook now set to ${url}`);
        listDevices();
    });
});

// Get device, it's resources and values
function listDevices() {
    getDevice(device => {
        console.log("Device: " + (device.name || device.id));
        device.listResources()
        .then(resources => {
            resources.forEach(resource => {
                resource.getValue()
                .then(value => {
                    console.log(`\t└\x1b[1m${resource.path}\x1b[0m: ${value}`);
                })
                .catch(error => {
                    console.log(`\t└\x1b[1m${resource.path}\x1b[0m: Error: ${error.message}`);
                });
            });
        });
    });
}

// Get specified device or first device
var deviceId = "";
function getDevice(completeFn) {
    if (deviceId) {
        connect.getDevice({
            id: deviceId
        })
        .then(completeFn);
        return;
    }

    connect.listConnectedDevices()
    .then(response => {
        completeFn(response[0]);
    });
}
