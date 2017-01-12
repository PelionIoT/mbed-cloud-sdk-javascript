var fs = require('fs');
var path = require('path');

var Logging = require('../../lib/').Logging;
var config = require('../config');

var logDir = "logs";
var logging = new Logging(config);

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
        response.data.forEach(deviceLog => {

        	var fileName = path.format({
				dir: logDir,
				base: deviceLog.logId + '.json'
			});

			var data = JSON.stringify(deviceLog, null, '\t');

        	fs.writeFileSync(fileName, data);
        	console.log("Saved " + fileName);
        });
        if (response.hasMore) {
            var lastLog = response.data.slice(-1).pop();
            listLogs(lastLog.logId);
        }
    });
}

ensureDirectory(logDir);
listLogs();
