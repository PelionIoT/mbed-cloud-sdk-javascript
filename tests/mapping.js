//TODO mapping for former test server. Remove when no longer needed.
var fs = require("fs");
var functions = require('../lib/common/functions');

var dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

var objectFns = [
	"addApiKey",
	"updateApiKey",
	"addUser",
	"updateUser",
	"listDevices",
	"listUsers",
	"addDevice",
	"updateDevice",
	"addQuery",
	"updateQuery",
	"addCampaign",
	"updateAccount",
	"updateCampaign",
	"addCertificate",
	"addDeveloperCertificate",
	"updateCertificate",
	"listDeviceLogs",
	"listMetrics",
	"listCertificates",
	"listApiKeys",
	"addFirmwareManifest",
	"addFirmwareImage"
];

var mapping = {
	ConnectApi: {
		// Args to re-order
		getResourceValue: args => {
			return {
				0: args.deviceId,
				1: args.resourcePath
			}
		},
		setResourceValue: args => {
			return {
				0: args.deviceId,
				1: args.resourcePath,
				2: args.resourceValue
			}
		},
		executeResource: args => {
			return {
				0: args.deviceId,
				1: args.resourcePath
			}
		},
		addResourceSubscription: args => {
			return {
				0: args.deviceId,
				1: args.resourcePath,
				2: null
			};
		},
		listMetrics: args => {
			function parse(input) {
				var units = ["hours", "days", "weeks", "months", "years"];
				var match = input.match(/^(.*)([hdwmy]{1})$/);
				var duration = match[1];
				var unit = match[2];
				unit = units.find(u => {
					return u[0] === unit;
				});
				return {
					unit: unit,
					duration: parseInt(duration)
				};
			};

			return {
				interval: parse(args.interval),
				period: parse(args.period)
			};
		},
		listConnectedDevices: args => {
			// keeps filter key so listConnectedDevices can add state=registered filter
			if (args.filter) args.filter = { filter: args.filter };
			return args;
		}
	},
	DeviceDirectoryApi: {
		listDeviceEvents: args => {
			if (args.filter) args.filter = { filter: args.filter };
			return args;
		},
		listQueries: args => {
			if (args.filter) args.filter = { filter: args.filter };
			return args;
		}
	},
	UpdateApi: {
		listCampaigns: args => {
			if (args.filter) args.filter = { filter: args.filter };
			return args;
		},
		listFirmwareImages: args => {
			if (args.filter) args.filter = { filter: args.filter };
			return args;
		},
		listFirmwareManifests: args => {
			if (args.filter) args.filter = { filter: args.filter };
			return args;
		},
		addFirmwareManifest: args => {
			args.dataFile = fs.createReadStream(args.datafile);
			return args;
		},
		addFirmwareImage: args => {
			args.dataFile = fs.createReadStream(args.datafile);
			return args;
		}
	}
};

exports.mapArgs = (module, method, query) => {
	if (!query) return [];
	var args = {};

	try {
		// Transform query to json string
		query = query
			.replace(/&/g, '","')
			.replace(/=/g, '":"')
			.replace(/\+/g, ' ');

		query = `{"${decodeURIComponent(query)}"}`;

		query = query
			.replace(/\]"/g, ']')
			.replace(/"\[/g, '[')
			.replace(/\}"/g, '}')
			.replace(/"\{/g, '{')
			.replace(/\n/g, '\\n');

		// Use a reviver to camel-case the JSON
		args = JSON.parse(query, function(key, value) {
			if (key === "") return value;
			var snakey = functions.snakeToCamel(key);
			if (snakey === key) return value;
			this[snakey] = value;
		});

	} catch(e) {
		console.log(e);
		return [];
	}

	// map keys to correct format and account for timezones
	Object.keys(args).forEach(key => {
		if (dateRegex.test(args[key])) {
			var date = Date.parse(args[key]);
			if (date) args[key] = new Date(date).toISOString();
		}
	});

	// Any function specific mapping
	if (mapping[module] && mapping[module][method]) {
		args = mapping[module][method](args);
	}

	// Create any add/update objects
	if (objectFns.indexOf(method) > -1) {
		// Remove this when "id" is used in the tests
		var match = method.match(/([A-Z]{1}.*)$/);
		if (match) {
			var idField = match[1][0].toLowerCase() + match[1].slice(1) + "Id";
			if (args[idField]) args.id = args[idField];
		}
		// Keep this, though
		args = {
			obj: args
		};
	}

	// Flatten args to a list
	return Object.keys(args).map(key => {
		return args[key];
	});
}

exports.mapResult = (module, method, result) => {
	// We need to explicitly check for false because some methods return bools, and stringify removes false values from the response
	if (result === false) return false;
	if (!result) return {};

	// Snake-case the result keys
	var jsonString = JSON.stringify(result, (key, value) => {
		if (value && !Array.isArray(value) && typeof value === 'object') {
			var replacement = {};
			for (var key in value) {
				if (Object.hasOwnProperty.call(value, key)) {
					replacement[functions.camelToSnake(key)] = value[key];
				}
			}
			return replacement;
		}
		//keep value in response for benefit of schema tests
		if (value === undefined) return null;
		return value;
	});

	return JSON.parse(jsonString);
}

exports.mapMethod = (module, method) => {
	// Async function calls just use normal functions
	method = method.replace(/_async$/, "");

	// Camel-case the method
	return functions.snakeToCamel(method);
}

exports.mapModule = (module) => {
	// Camel-case the method
	module = functions.snakeToCamel(module);

	module = module[0].toUpperCase() + module.slice(1);
	return `${module}Api`;
}
