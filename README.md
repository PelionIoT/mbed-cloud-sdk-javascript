# mbed Cloud JavaScript SDK

[![Circle CI](https://circleci.com/gh/ARMmbed/mbed-cloud-sdk-javascript.svg?style=shield&circle-token=62ef40035b1b5442234a44ad7e74199ea582f3f4)](https://circleci.com/gh/ARMmbed/mbed-cloud-sdk-javascript/)

The mbed Cloud SDK gives developers access to the full mbed Cloud suite using JavaScript.

## Prerequisites

[Node.js > v4.7.0](https://nodejs.org) which includes `npm`.

## Installation

The SDK is distributed using npm, simply install the package into your project;

```bash
$ npm install --save mbed-cloud-sdk
```

## Documentation

See full [documentation and API reference here](http://mbed-cloud-sdk-javascript.s3-website-us-west-2.amazonaws.com/).

### Usage in Node.js (CommonJS modules)

Simply `require` this module and create a new instance of the API you want to use;

```JavaScript
var DevAPI = require('../../lib/').DevelopmentApi;

var development = new DevAPI({ ... });
```

### Usage in Browser (RequireJS / AMD modules, Vanilla JS / SPAs)

The bundled files in `dist/bundles` are standalone modules following the [UMD](https://github.com/umdjs/umd) specification so should be usable without any further installation or modification.

Include the JavaScript bundle you need on your page from the `bundles` directory, e.g.:

```html
<script src="<mbed-cloud-sdk>/bundles/devices.min.js"></script>
```

If using VanillaJS, the bundles are then accessible through the global `mbedCloudSDK` namespace;

```javascript
var devices = new window.mbedCloudSDK.DevicesApi({ ... }});
```

Otherwise, the bundles should be loadable using an AMD framework such as [RequireJS](http://requirejs.org/).

You can also use all bundles by including `index.min.js`;

```html
<script src="<mbed-cloud-sdk>/bundles/index.min.js"></script>
```

Please refer to the [Examples](./examples/) folder for some web-based examples.

__Note:__ mbed Cloud is protected with [Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS) which restricts cross-origin calls from unknown domains. Until your production server domain has been whitelisted for mbed Cloud and during development, you may disable CORS support in your browser using [command line switches](http://www.thegeekstuff.com/2016/09/disable-same-origin-policy/) or [extensions](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).

## Development

### Installing

After cloning this repository, install the npm dependencies:

```bash
> npm install
```

### Building

Simply use the default ```gulp``` task to build the SDK and docs

```bash
> npm run gulp
```

### Watching

To continually watch for changes, use the gulp `watch` task

```bash
> npm run gulp watch
```
