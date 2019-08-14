# WARNING - :warning: These examples are legacy and are no longer being maintained. Please see the [SDK Documentation](https://armmbed.github.io/mbed-cloud-sdk-documentation) for getting started guides and usage examples. :warning:

## Pelion Device Management SDK Examples

These examples are designed to give developers a headstart with developing with the Pelion Device Management SDK for JavaScript.

They can be used as a basis for a solution or simply to understand how a feature is used.

Refer to the [Node.js](#node-js) section for command-line or server-based examples written using [Node.js](https://nodejs.org).

Refer to the [Web](#web) section for examples of using the JavaScript browser bundles in a [single page web application](https://en.wikipedia.org/wiki/Single-page_application).

The [Proxy](#proxy) section describes how a thin server can be used to inject an API key into a browser-based application, keeping the API key secret.

### Node js

#### Usage

To run the Node examples, simply execute them using node:

```bash
$ node <path to example.js>
```

#### API Keys

These examples utilise a [config.js](node/config.js) file which can read an API Key (and optionally a host) from an environment variable, a command line switch or from the file itself.

To use environment variables, set the varaible `MBED_CLOUD_SDK_API_KEY` prior to running the application. e.g.:

```bash
$ export MBED_CLOUD_SDK_API_KEY=<Pelion DM API Key>
```

To use a command line switch, pass your API key to the program being run. e.g.:

```bash
$ node <path to example.js> <Pelion DM API Key>
```

or:

```bash
$ node <path to example.js> --apiKey=<Pelion DM API Key>
```

You can also simply edit the [config.js](node/config.js) file and add your key.

#### Remoting

__Note:__ Some of the Node examples utilise a webhook server which must be publicly visible. If development is being done using http://localhost, you can use tunnelling software such as [ngrok](https://ngrok.com/) to expose your development server publicly.

#### Examples

* __Get Device Events__ [device-events.js](node/device-events.js)

  This example pages all device events in Pelion Device Management and exports them to local files in [JSON](http://www.json.org/) format.

* __Developer Certificate Header__ [certificate-header.js](node/certificate-header.js)

  This example creates (or overwrites) a developer certificate.
  This is then used to create a local `C` header file for connecting a device to Pelion Device Management.

* __Add Trusted Certificate__ [trusted-certificate.js](node/trusted-certificate.js)

  This example creates (or overwrites) a trusted certificate.
  It creates a private key and x509 certificate locally using openssl and shows how to create a valid signature to upload with the certificate.

* __Webhook Server__ [webhook-server.js](node/webhook-server.js)

  This example creates a basic webhook server which registers for callbacks from Pelion Device Management and receives asynchronous notifications.
  Using the callbacks, the device/resource tree of connected devices is recursed, outputting the value for each resource.

  __Note:__ This example requires the `express` server to be installed. Please do this by running `$ npm install express`.

* __User, Key and Group Listing__ [users-keys-groups.js](node/users-keys-groups.js)

  This example is a command line interface to list users, keys and groups of Pelion Device Management.

### Web

#### Usage

The web bundles support the [Universal Module Definition](https://github.com/umdjs/umd) specification and as such can be loaded using [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) module loaders such as [RequireJS](http://requirejs.org/), [CommonJS](https://en.wikipedia.org/wiki/CommonJS) module loaders such as Node.js or by using [browser globals](http://vanilla-js.com/).

The web examples don't use a module loader, so each bundle is available as a browser global under the `MbedCloudSDK` namespace.

#### API Keys

These examples utilise a [config.js](web/config.js) file which can read an API Key (and optionally a host) from a cookie, the query string or from the file itself.

To use the query string, pass your API key to the page being run. e.g.:

```
https://www.yourserver.com/<example.html>?<Pelion DM API Key>
```

or:

```
https://www.yourserver.com/<example.html>?apiKey=<Pelion DM API Key>
```

You can also simply edit the [config.js](web/config.js) file and add your key.

__Warning:__ Your API Key will be publicly visible in your web application when creating single page web applications, use this method only during development or with a read-only key with access to public data. An intermediate server to handle requests is recommended for production. This can be done by injecting the API key on the fly (see [Proxy](#proxy)).

#### Examples

* __Pull Notifications__ [pull-notifications.html](web/pull-notifications.html)

  This example registers for callbacks from Pelion Device Management and receives asynchronous notifications.
  Using the callbacks, the device/resource tree of connected devices is recursed, outputting the value for each resource.

* __Device Management__ [device-management.html](web/device-management.html)

  This example shows how a management interface for devices can be implemented.

* __Device Query Management__ [query-management.html](web/query-management.html)

  This example allows management and running of device queries.

* __Firmware Management__ [firmware-management.html](web/firmware-management.html)

  This example allows management of firmware images and firmware manifests for use in update campaigns.

* __Campaign Management__ [campaign-management.html](web/campaign-management.html)

  This example allows creation of update campaigns with the ability to start and stop them.

* __Metrics__ [metrics.html](web/metrics.html)

  This example renders usage metrics over a specified period.

### Proxy

The [proxy folder](proxy/) contains a sample project showing how API calls to Pelion Device Management can be proxied to allow injection of an API key header. This enables the production of a single-page web application using the minified JavaScript bundles _without_ the API key in use being visible to the client.

__Note:__ The proxy requires the `express` server to be installed. Please do this by running `$ npm install express`.

To start the proxy server, run the following from the root of the project:

```bash
> node examples/proxy/server.js
```

An express server should now be running at [http://localhost:8080](http://localhost:8080) which allows you to `log in` with your API key. This is simply stored as a cookie and injected into the headers of subsequent API calls.

Once you are `logged in`, you should have access to running each of the web examples without having to explictly set the API key in the config file.
