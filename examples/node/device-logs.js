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
var path = require('path');

var mbed = require('../../lib/');
var config = require('./config');

var logDir = "logs";
var logging = new mbed.LoggingApi(config);

function ensureDirectory(directory) {
    var dirName = path.dirname(directory);
    if (!fs.existsSync(dirName)) {
        ensureDirectory(dirName);
    }
    if (fs.existsSync(directory)) return;
    fs.mkdirSync(directory);
}

function listLogs(after) {

    logging.listDeviceLogs({
        limit: 50,
        after: after
    }, (err, response) => {

        if (err) {
            console.log(err);
            return;
        }

        response.data.forEach(deviceLog => {

        	var fileName = path.format({
				dir: logDir,
				base: deviceLog.id + '.json'
			});

			var data = JSON.stringify(deviceLog, null, '\t');

        	fs.writeFileSync(fileName, data);
        	console.log("Saved " + fileName);
        });
        if (response.hasMore) {
            var lastLog = response.data.slice(-1).pop();
            listLogs(lastLog.id);
        }
    });
}

ensureDirectory(logDir);
listLogs();
