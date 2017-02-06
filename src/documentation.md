# mbed Cloud SDK for JavaScript

The mbed Cloud SDK gives developers access to the full mbed Cloud suite using JavaScript.

## Prerequisites

[Node.js > v4.7.0](https://nodejs.org) which includes `npm`.

## Installation

The SDK is distributed using npm, simply install the package into your project:

```bash
$ npm install ARMmbed/mbed-cloud-sdk-javascript
```

## Documentation

See full [documentation and API reference here](http://mbed-cloud-sdk-javascript.s3-website-us-west-2.amazonaws.com/).

Please refer to the [examples](./examples/) folder for some node and web examples.

### Usage in Node.js (CommonJS modules)

Simply `require` this module and create a new instance of the API you want to use. For example, to list all connected devices:

```JavaScript
var mbed = require("mbed-cloud-sdk");

var deviceApi = new mbed.DevicesApi({
	apiKey: "<mbed Cloud API Key>"
});

deviceApi.listConnectedDevices()
.then(response => {
	response.data.forEach(device => {
		console.log(device.id);
	});
});
```

### Usage in Browser (RequireJS / AMD modules, Vanilla JS / SPAs)

The bundled files in [bundles](./bundles/) are standalone modules following the [UMD](https://github.com/umdjs/umd) specification so should be usable without any further installation or modification.

Include the JavaScript bundle you need on your page from the [bundles](./bundles/) directory, e.g.:

```html
<script src="<mbed-cloud-sdk>/bundles/devices.min.js"></script>
```

If using VanillaJS, the bundles are then accessible through the global `mbedCloudSDK` namespace. For example, to list all connected devices:

```javascript
var deviceApi = new window.mbedCloudSDK.DevicesApi({
	apiKey: "<mbed Cloud API Key>"
});

deviceApi.listConnectedDevices(function(error, response) {
	response.data.forEach(function(device) {
		console.log(device.id);
	});
});
```

Otherwise, the bundles should be loadable using an AMD framework such as [RequireJS](http://requirejs.org/).

You can also use all bundles by including `index.min.js`:

```html
<script src="<mbed-cloud-sdk>/bundles/index.min.js"></script>
```

__Note:__ mbed Cloud is protected with [Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS) which restricts cross-origin calls from unknown domains. Until your production server domain has been whitelisted for mbed Cloud and during development, you may disable CORS support in your browser using [command line switches](http://www.thegeekstuff.com/2016/09/disable-same-origin-policy/) or [extensions](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).
