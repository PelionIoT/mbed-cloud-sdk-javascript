var fs = require('fs');
var http = require('http');
var express = require('express');

var config = require('./config');
var Devices = require('../../lib/').DevicesApi;

var url = "http://2dc8f920.ngrok.io";
var port = 3001;

var devices = new Devices(config);
devices.polling = true;

var app = express();
app.put("/", function(req, res, next) {

	var data = "";
    req.on('data', function(chunk) {
        data += chunk;
    });

    req.on('end', function() {
        data = JSON.parse(data);
        devices.notify(data);
    });

	res.sendStatus(200);
	next();
});

http.createServer(app).listen(port, function() {
    console.log(`express running on port ${port}`);
});

devices.getWebhook(function(err, webhook) {

	if (err || !webhook) console.log("No webhook currently registered");
	else console.log(`Webhook currently set to ${webhook.url}`);

	devices.updateWebhook({
		url: url
	}, function(err) {
		if (err) {
			console.log(`Unable to set webhook to ${url}, please ensure the URL is publicly accessible`);
			return;
		}
		console.log(`Webhook now set to ${url}`);
	});
});

devices.listConnectedDevices(function(err, devices) {
    devices.data.forEach(function(device) {
        device.listResources(function(err, resources) {
            console.log(device.id);
            resources.forEach(function(resource) {
                resource.getValue(function(err, value) {
                    console.log(resource.path);
                    console.log(value);
                });
            });
        });
    });
});
