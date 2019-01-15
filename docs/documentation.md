# Mbed Cloud SDK for JavaScript

The Mbed Cloud SDK provides a simplified interface to the Mbed Cloud APIs by exposing functionality using conventions and paradigms familiar to JavaScript developers.

## Prerequisite

[Node.js > v6.0.0](https://nodejs.org), which includes `npm`.

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

## Configuration

The SDKs support setting parameters through environment variables and `.env` (also known as _dotenv_) files. Values can also be provided to the constructor of each module.

## Configuration parameters

### MBED_CLOUD_SDK_HOST
The fully qualified url of the host serving the mbed cloud api (scheme, hostname, port, base path).
The schema and hostname are required. For example:

- `https://api.us-east-1.mbedcloud.com`
- `https://my-deployment.net/mbed-api/`

### MBED_CLOUD_SDK_API_KEY
The user's API key for accessing this instance of mbed cloud.

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
	devices.data.forEach(device => {
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

## Examples

Please refer to the examples folder for some node and web examples.
