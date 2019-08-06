/*
* Pelion Device Management JavaScript SDK
* Copyright Arm Limited 2017
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

var fs = require("fs");
var http = require("http");
try {
    var express = require("express");
} catch (e) { }

if (!express) {
    console.log("This example requires the 'express' server. Please install it by running 'npm install express'");
    process.exit();
}

var PelionDMSDK = require("../../index");
var config = require("./config");

// ngrok http 3002
var url = "http://2976cb8f.ngrok.io";
var port = 3002;

var connect = new PelionDMSDK.ConnectApi(config);
var app = express();

// Set system to await notifications for callbacks instead of emitting asyncIds
connect.handleNotifications = true;

// subscribe to the button resource
function subscribe() {
    // starts to receive values after device regsiters
    connect.subscribe.resourceValues({ resourcePaths: ["/3200/0/5501"] })
        .addListener((res) => logData(res, "OnRegistration"))
        .addLocalFilter(res => res.payload >= 20);

    // starts to reveive values immediatley
    connect.subscribe.resourceValues({ resourcePaths: ["/3200/0/5501"] }, "OnValueUpdate")
        .addListener((res) => logData(res, "OnValueUpdate"));
}

function logData(res, message) {
    console.log("------" + message + "------");
    console.log(res);
    console.log("---------------");
}

// Listen for PUTs at the root URL
app.put("/", (req, res, next) => {

    var data = "";
    req.on("data", chunk => {
        data += chunk;
    });

    req.on("end", () => {
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
connect.getWebhook()
    .then(webhook => {
        if (webhook) {
            if (webhook.url === url) {
                console.log(`Webhook already set to ${url}`);
                return;
            } else {
                console.log(`Webhook currently set to ${webhook.url}, changing to ${url}`);
            }
        } else {
            console.log(`No webhook currently registered, setting to ${url}`);
        }

        return connect.updateWebhook(url);
    })
    .then(() => {
        subscribe();
    })
    .catch(error => {
        console.log(`${error.message} - Unable to set webhook to ${url}, please ensure the URL is publicly accessible`);
        process.exit();
    });
