var envVarKey = "MBED_CLOUD_API_KEY";
var envVarHost = "MBED_CLOUD_HOST";
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
	apiKey: "<mbed Cloud API Key>",
	host: "https://api.mbedcloud.com"
};

// Overwrite with any environment variables
if (process.env[envVarKey]) config.apiKey = process.env[envVarKey];
if (process.env[envVarHost]) config.host = process.env[envVarHost];

//Overwrite with any commandline variables
var args = parseCommandLine();
if (args[commandKey]) config.apiKey = args[commandKey];
if (args[commandHost]) config.host = args[commandHost];

module.exports = config;
