/*
* Mbed Cloud JavaScript SDK
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
var path = require("path");

var MbedCloudSDK = require("../../index");
var config = require("./config");

var eventDir = "events";
var devices = new MbedCloudSDK.DeviceDirectoryApi(config);

function logError(error) {
    console.log(error.message || error);
    process.exit();
}

function ensureDirectory(directory) {
    var dirName = path.dirname(directory);
    if (!fs.existsSync(dirName)) {
        ensureDirectory(dirName);
    }
    if (fs.existsSync(directory)) return;
    fs.mkdirSync(directory);
}

function listEvents(after) {

    return devices.listDeviceEvents({
        limit: 50,
        after: after
    })
    .then(response => {

        response.data.forEach(deviceEvent => {
          var unixTimestamp = new Date(deviceEvent.eventDate).getTime()/1000 | 0;
        	var fileName = path.format({
				dir: eventDir,
				base: `${deviceEvent.id}-${unixTimestamp.toString(16)}.json`
			});

			var data = JSON.stringify(deviceEvent, null, "\t");

        	fs.writeFileSync(fileName, data);
            console.log(`Saved ${fileName}`);
        });
        if (response.hasMore) {
            var lastEvent = response.data.slice(-1).pop();
            return listEvents(lastEvent.id);
        }
    })
    .catch(logError);
}

ensureDirectory(eventDir);
listEvents();
