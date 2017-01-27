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

var config = require('./config');
var Devices = require('../../lib/').DevicesApi;

var url = "http://6a58ed40.ngrok.io";
var port = 3001;

var devices = new Devices(config);
var app = express();

// Set system to await notifications for callbacks instead of emitting asyncIds
devices.handleNotifications = true;

// Listen for PUTs at the root URL
app.put("/", (req, res, next) => {

    var data = "";
    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function() {
        // Parse data into jJSON and inject into devices notification system
        data = JSON.parse(data);
        devices.notify(data);
    });

	res.sendStatus(200);
	next();
});

http.createServer(app).listen(port, () => {
    console.log(`Webhook server listening on port ${port}`);
});

devices.getWebhook((err, webhook) => {

	if (err || !webhook) console.log("No webhook currently registered");
	else console.log(`Webhook currently set to ${webhook.url}`);

	devices.updateWebhook({
		url: url
	}, err => {
		if (err) {
			console.log(`${err} - Unable to set webhook to ${url}, please ensure the URL is publicly accessible`);
			return;
		}
		console.log(`Webhook now set to ${url}`);
        listDevices();
	});
});

// List all connected devices, their resources and values
function listDevices() {
    devices.listConnectedDevices()
    .then(devices => {

        return devices.data.reduce((promise, device) => {
            return promise
            .then(() => device.listResources())
            .then(resources => {
                console.log("Device: " + device.id);

                return resources.reduce((promise, resource) => {
                    return promise
                    .then(() => resource.getValue())
                    .then(value => {
                        console.log(`\t└${resource.path}\t\t: ${value}`);
                    })
                    .catch(err => {});
                }, promise);

            });
        }, Promise.resolve());
    });
}
