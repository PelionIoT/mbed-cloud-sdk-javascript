var functions = require('../lib/common/functions');

function mapArgs(module, method, args) {
	var newArgs = {};

	// Transform argument names
	Object.keys(args).forEach(key => {
		newArgs[functions.snakeToCamel(key)] = args[key];
	});

	// Any function specific mapping
	if (mapping[module] && mapping[module][method]) {
		newArgs = mapping[module][method](newArgs);
	}

	return newArgs;
}

var mapping = {
	devicesApi: {
		listDevices: args => {
			return args;
		}
	}
};

exports = mapArgs;