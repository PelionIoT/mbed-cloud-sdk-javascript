# mbed Cloud SDK for JavaScript

The mbed Cloud SDK provides a simplified interface to the mbed Cloud APIs by exposing functionality using conventions and paradigms familiar to JavaScript developers.

## Prerequisites

[Node.js > v4.7.0](https://nodejs.org), which includes `npm`.

## Installation

The SDK is distributed using npm. To install the package in your project:

```bash
$ npm install ARMmbed/mbed-cloud-sdk-javascript#build
```

`/node_modules/mbed-cloud-sdk` now contains:

* `bundles` - minified browser scripts. 
* `lib` - Node.js modules. 
* `examples` - contains all examples.

## API Keys

Before using the SDK, you will need to obtain an API key for use with mbed Cloud.

This can be generated through the mbed Cloud management console.

## Usage in Node.js (CommonJS modules)

To use the SDK in Node.js:

1. `require` this module.
2. Create a new instance of the API you want to use.

For example, to list all connected devices:

```JavaScript
var mbedCloudSDK = require("mbed-cloud-sdk");

var connect = new mbedCloudSDK.ConnectApi({
	apiKey: "<mbed Cloud API Key>"
});

connect.listConnectedDevices()
.then(devices => {
	devices.forEach(device => {
		console.log(device.id);
	});
});
```

## Usage in browser (RequireJS/AMD modules, Vanilla JS/SPAs)

The files in the bundles folder are standalone modules following the [UMD](https://github.com/umdjs/umd) specification, so should be usable without any further installation or modification.

Include the JavaScript bundle you need on your page from the bundles folder. For example:

```html
<script src="<mbed-cloud-sdk>/bundles/connect.min.js"></script>
```

If using VanillaJS, the bundles are then accessible through the global `mbedCloudSDK` namespace. For example, to list all connected devices:

```javascript
var connect = new mbedCloudSDK.ConnectApi({
	apiKey: "<mbed Cloud API Key>"
});

connect.listConnectedDevices(function(error, devices) {
	devices.forEach(function(device) {
		console.log(device.id);
	});
});
```

Otherwise, the bundles should be loadable using an AMD framework such as [RequireJS](http://requirejs.org/).

You can also use all bundles by including `index.min.js`:

```html
<script src="<mbed-cloud-sdk>/bundles/index.min.js"></script>
```

__Warning:__ It is not advisable to embed your API key into distributed code such as client-side web pages. For production scenarios, developers may want to consider using Node.JS for all API calls or to proxy client-side code requests to inject the API key. An example proxy server can be found in the `examples` folder.

__Note:__ mbed Cloud is protected with [cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS), which restricts cross-origin calls from unknown domains. Until your production server domain has been whitelisted for mbed Cloud, you may disable CORS support in your browser using [command line switches](http://www.thegeekstuff.com/2016/09/disable-same-origin-policy/) or [extensions](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi). This is only an issue if using the SDKs client-side, however the `localhost` domain is already whitelisted to allow local development.

## Examples

Please refer to the examples folder for some node and web examples.
