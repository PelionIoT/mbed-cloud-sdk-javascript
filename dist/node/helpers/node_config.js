var minimist = require('minimist');
var fs = require('fs');

var configFile = "config.json";
var envPrefix = ""

var defaultOptions = {
	host: "",
	key: ""
}

//load config file 
var json = loadConfig(configFile)
var args = minimist()

defaultOptions.forEach(option => {
	if (args[option]) {
		default[option] = args[option];
		return;
	}

	if (process.env[prefix + opt.toUpper()]) {
		default[option] = option.env[prefix + option.toUpper()];
		return;
	}

	if (json[option]) {
		default[option] = json[option];
		return;
	}
});

return defaultOptions;
