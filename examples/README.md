# mbed Cloud SDK Examples

These examples are designed to give developers a headstart with developing with the mbed Cloud JavaScript SDK.

They can be used as basis for a solution or simply to understand how a feature is used.

Refer to the [Node.js](#node.js) section for command-line or server-based examples written using [Node.js](https://nodejs.org).

Refer to the [Web](#web) section for examples of using the JavaScript browser bundles in a [single page web application](https://en.wikipedia.org/wiki/Single-page_application).

## Node.js

### Usage

To run the Node examples, simply execute them using node:

```bash
$ node <example.js>
```

### API Keys

These examples utilise a [config.js](node/config.js) file which can read an API Key (and optionally a host) from an environment variable, a command line switch or from the file itself.

To use environment variables, set the varaible `MBED_CLOUD_API_KEY` prior to running the application. e.g.:

```bash
$ export MBED_CLOUD_API_KEY=<mbed Cloud API Key>
```

To use a command line switch, pass your API key to the program being run. e.g.:

```bash
$ node <example.js> <mbed Cloud API Key>
```

or:

```bash
$ node <example.js> --apiKey=<mbed Cloud API Key>
```

You can also simply edit the [config.js](node/config.js) file and add your key.

### Remoting

__Note:__ Some of the Node examples utilise a webhook server which must be publicly visible. If development is being done using http://localhost, you can use tunnelling software such as [ngrok](https://ngrok.com/) to expose your deveopment server publicly.

### Examples

* __Get Device Logs__ [device-logs.js](node/device-logs.js)

  This example pages all device logs in mbed Cloud and exports them to local files in [JSON](http://www.json.org/) format.

* __Developer Certificate Header__ [certificate-header.js](node/certificate-header.js)

  This example creates (or overwrites) a developer certificate.
  This is then used to create a local `C` header file for connecting a device to mbed Cloud Connect.

* __Webhook server__ [webhook-server.js](node/webhook-server.js)

  This example creates a basic webhook server which registers for callbacks from mbed Cloud and receives asynchronous notifications.
  Using the callbacks, the device/resource tree of connected devices is recursed, outputting the value for each resource.

* __Subscription Management__ [subscription-management.js](node/subscription-management.js)

  This example is a command line interface which allows management of resource subscriptions and pre-subscriptions.

* __User & Key Management__ [user-key-management.js](node/user-key-management.js)

  This example is a command line interface to manage users of mbed Cloud and their API keys.

## Web

### Usage

The web bundles support the [Universal Module Definition](https://github.com/umdjs/umd) specification and as such can be loaded using [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) module loaders such as [RequireJS](http://requirejs.org/), [CommonJS](https://en.wikipedia.org/wiki/CommonJS) module loaders such as Node or by using [browser globals](http://vanilla-js.com/).

The examples don't use a module loader, so each bundle is available as a browser global under the `mbedCloudSDK` namespace. To run an example, simply open it in a browser once a valid API key has been added.

__Note:__ mbed Cloud is protected with [Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) (CORS) which restricts cross-origin calls from unknown domains. Until your production server domain has been whitelisted for mbed Cloud and during development, you may disable CORS support in your browser using [command line switches](http://www.thegeekstuff.com/2016/09/disable-same-origin-policy/) or [extensions](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi).

### API Keys

A valid API key needs to be added to the [config.js](web/config.js) file before the examples will run correctly.

__Note:__ Your API Key will be publicly visible in your web application. When creating single page web applications, use this method only during development or with a read-only key with access to public data. An intermediate server to handle requests is recommended for production.

### Examples

* __Device Query Management__ [query-management.html](web/query-management.html)

  This example allows mangement and running of device queries, paging the results.

* __Long Polling__ [long-polling.html](web/long-polling.html)

  This example uses long polling to register for callbacks from mbed Cloud and receives asynchronous notifications.
  Using the callbacks, the device/resource tree of connected devices is recursed, outputting the value for each resource.

* __Device Management__ [device-management.html](web/device-management.html)

  This example shows how a management interface for devices can be implemented.

* __Update Management__ [update-management.html](web/update-management.html)

  This example allows mangement of update campaigns, firmware images and manifests.
