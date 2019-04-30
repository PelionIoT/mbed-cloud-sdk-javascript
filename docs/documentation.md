# Pelion Device Management SDK for JavaScript

The Pelion Device Management SDK provides a simplified interface to the Pelion Device Management APIs by exposing functionality using conventions and paradigms familiar to JavaScript developers.

## Prerequisite

[Node.js > v8](https://nodejs.org), which includes `npm`.

## Installation

The SDK is distributed using npm. To install the package in your project:

```bash
$ npm install mbed-cloud-sdk
```

`/node_modules/mbed-cloud-sdk` now contains:

* `bundles` - minified browser scripts.
* `lib` - Node.js modules.

## API keys

Before using the SDK, you need to obtain an API key for use with Pelion Device Management.

You can generate this through the Pelion Device Management management console.

## Configuration

The SDKs support setting parameters through environment variables and `.env` (also known as _dotenv_) files. Values can also be provided to the constructor of each module.

## Configuration parameters

### MBED_CLOUD_SDK_API_KEY
The user's API key for accessing this instance of Pelion Device Management.

### MBED_CLOUD_SDK_HOST
The fully qualified url of the host serving the Pelion Device Management api (scheme, hostname, port, base path).
The schema and hostname are required. For example:

- `https://api.us-east-1.mbedcloud.com`
- `https://my-deployment.net/mbed-api/`

## Usage in Node.js (CommonJS modules)

To use a specific repository in Node.js:

1. Import the repository from `mbed-cloud-sdk`.
2. Create a new instance of the repository.

For example, to list the first 10 devices:

```JavaScript
import { DeviceRepository } from "mbed-cloud-sdk";

// create an instance of a device repository
const deviceList = new DeviceRepository()
	// List the first 10 devices in your Pelion DM account
	.list({ maxResults: 10 });

for await (const device of deviceList) {
	console.log(`Hello device ${device.name}`);
}
```

To use the top level SDK instance in Node.js:

1. Import the SDK from `mbed-cloud-sdk`.
2. Create a new instance of the SDK.

For example, to list the first 10 devices:

```JavaScript
import { SDK } from "mbed-cloud-sdk";

// create an instance of the Pelion Device Management SDK
const deviceList = new SDK()
	.foundation()
	.deviceRepository()
	// List the first 10 devices in your Pelion DM account
	.list({ maxResults: 10 });

for await (const device of deviceList) {
	console.log(`Hello device ${device.name}`);
}
```

## Usage in browser (RequireJS/AMD modules, Vanilla JS/SPAs)

The files in the bundles folder are standalone modules following the [UMD](https://github.com/umdjs/umd) specification, so you should be able to use them without any further installation or modification.

Include the JavaScript bundle you need on your page from the bundles folder. For example:

```html
<script src="<mbed-cloud-sdk>/bundles/sdk.min.js"></script>
```

or


```html
<script src="<mbed-cloud-sdk>/bundles/foundation/device.min.js"></script>
```

If you are using VanillaJS, the bundles are then accessible through the global `Mbed.Cloud` namespace. For example, to list all connected devices:

```javascript
var sdk = new Mbed.Cloud.SDK({
	apiKey,
});

sdk.foundation()
    .deviceRepository()
    // List the first 10 devices in your Pelion DM account
    .list({ maxResults: 10 })
    .all()
    .then(deviceList => console.log(deviceList));
```

Otherwise, you should be able to load the bundles by using an AMD framework such as [RequireJS](http://requirejs.org/).

__Warning:__ It is not advisable to embed your API key into distributed code such as client-side web pages. For production scenarios, developers may want to consider using Node.js for all API calls or to proxy client-side code requests to inject the API key. You can find an example proxy server in the `examples` folder.
