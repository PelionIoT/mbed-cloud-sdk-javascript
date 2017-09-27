# Mbed Cloud SDK for JavaScript

The Mbed Cloud SDK provides a simplified interface to the Mbed Cloud APIs by exposing functionality using conventions and paradigms familiar to JavaScript developers.

## Prerequisite

[Node.js > v4.8.0](https://nodejs.org), which includes `npm`.

## Installation

The SDK is distributed using npm. To install the package in your project:

```bash
$ npm install mbed-cloud-sdk
```

`/node_modules/mbed-cloud-sdk` now contains:

* `bundles` - minified browser scripts.
* `lib` - Node.js modules.
* `examples` - contains all examples.

## API keys

Before using the SDK, you need to obtain an API key for use with Mbed Cloud.

You can generate this through the Mbed Cloud management console.

## Usage in Node.js (CommonJS modules)

To use the SDK in Node.js:

1. `require` this module.
2. Create a new instance of the API you want to use.

For example, to list all connected devices:

```JavaScript
var MbedCloudSDK = require("mbed-cloud-sdk");

var connect = new MbedCloudSDK.ConnectApi({
	apiKey: "<Mbed Cloud API Key>"
});

connect.listConnectedDevices()
.then(devices => {
	devices.forEach(device => {
		console.log(device.id);
	});
});
```

## Usage in browser (RequireJS/AMD modules, Vanilla JS/SPAs)

The files in the bundles folder are standalone modules following the [UMD](https://github.com/umdjs/umd) specification, so you should be able to use them without any further installation or modification.

Include the JavaScript bundle you need on your page from the bundles folder. For example:

```html
<script src="<mbed-cloud-sdk>/bundles/connect.min.js"></script>
```

If you are using VanillaJS, the bundles are then accessible through the global `MbedCloudSDK` namespace. For example, to list all connected devices:

```javascript
var connect = new MbedCloudSDK.ConnectApi({
	apiKey: "<Mbed Cloud API Key>"
});

connect.listConnectedDevices(function(error, result) {
	result.data.forEach(function(device) {
		console.log(device.id);
	});
});
```

Otherwise, you should be able to load the bundles by using an AMD framework such as [RequireJS](http://requirejs.org/).

You can also use all bundles by including `index.min.js`:

```html
<script src="<mbed-cloud-sdk>/bundles/index.min.js"></script>
```

__Warning:__ It is not advisable to embed your API key into distributed code such as client-side web pages. For production scenarios, developers may want to consider using Node.js for all API calls or to proxy client-side code requests to inject the API key. You can find an example proxy server in the `examples` folder.

__Note:__ [Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS) protects Mbed Cloud. CORS rules are a browser security feature which restricts cross-origin calls from unknown domains and is only a concern when you use the SDKs directly in a browser (not Node.js).
If using the SDKs in a browser (perhaps for a single page web application), the domain `localhost` has been whitelisted for Mbed Cloud to enable local development. Before deploying to production, any public domain will need to be whitelisted to avoid CORS restrictions. To do this, please contact Mbed Cloud support.

## Examples

Please refer to the examples folder for some node and web examples.
