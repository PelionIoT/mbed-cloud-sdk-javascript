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

var envVarKey = "MBED_CLOUD_SDK_API_KEY";
var envVarHost = "MBED_CLOUD_SDK_HOST";
var commandKey = "apiKey";
var commandHost = "host";

// Parse command line arguments
function parseCommandLine() {
	var commands = process.argv.slice(2);
	var args = {};

	for (var i = 0; i < commands.length; i++) {
		var match = commands[i].match(/^--(.+)=(.+)$/);
		if (match)
			args[match[1]] = match[2];
		else if (i < commands.length - 1 && commands[i].substr(0, 1) === "-") {
			args[commands[i].substr(1)] = commands[i + 1];
			i++;
		}
		else if (i === 0) args[commandKey] = commands[i];
		else if (i === 1) args[commandHost] = commands[i];
	}

	return args;
}

// Default configuration
var config = {
	apiKey: "<Pelion DM API Key>",
	host: "https://api.us-east-1.mbedcloud.com"
};

// Overwrite with any environment variables
if (process.env[envVarKey]) config.apiKey = process.env[envVarKey];
if (process.env[envVarHost]) config.host = process.env[envVarHost];

// Overwrite with any commandline variables
var args = parseCommandLine();
if (args[commandKey]) config.apiKey = args[commandKey];
if (args[commandHost]) config.host = args[commandHost];

module.exports = config;
