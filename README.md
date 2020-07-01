# Pelion Device Management SDK for JavaScript

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

----
> Due to a redirected focus onto future development of the Pelion Device Management APIs, this SDK Is no longer actively supported and there is no commitment for future maintenance releases.
>
> The open source project and corresponding packages for this SDK remain publicly available. 
>
>Existing applications developed using the SDK will continue to operate against existing Pelion Device Management REST APIs (assuming that those APIs are not subject to the deprecation process for commercial customers). New APIs supported by Pelion Device Management will only be available through the REST APIs. 
>
>It is recommended that for ongoing development, applications which previously used the SDK should be migrated over time to access the Pelion Device Management REST APIs directly. 
>
>Please see this [page](https://www.pelion.com/docs/device-management/current/mbed-cloud-sdk-references/moving-from-the-pelion-device-management-sdks-to-the-apis.html), which provides additional information on using the REST APIs. By following this guide, you will learn how to build a web application using the REST APIs directly.

----

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://spdx.org/licenses/Apache-2.0.html)
[![version](https://img.shields.io/npm/v/mbed-cloud-sdk.svg)](https://www.npmjs.com/package/mbed-cloud-sdk)
[![CircleCI](https://circleci.com/gh/ARMmbed/mbed-cloud-sdk-javascript/tree/master.svg?style=svg)](https://circleci.com/gh/ARMmbed/mbed-cloud-sdk-javascript/tree/master)
[![codecov](https://codecov.io/gh/ARMmbed/mbed-cloud-sdk-javascript/branch/master/graph/badge.svg?token=9h7ZMJ0xwK)](https://codecov.io/gh/ARMmbed/mbed-cloud-sdk-javascript)
[![engine](https://img.shields.io/node/v/mbed-cloud-sdk.svg)](https://nodejs.org/en/about/releases/)
[![downloads](https://img.shields.io/npm/dm/mbed-cloud-sdk.svg)](https://www.npmjs.com/package/mbed-cloud-sdk)

The Pelion Device Management SDK provides a simplified interface to the Pelion Device Management APIs by exposing functionality using conventions and paradigms familiar to JavaScript developers.

## Prerequisites

[Node.js > v10.16.0 (lts)](https://nodejs.org)
[yarn](https://yarnpkg.com/)

## Installation

The SDK is distributed using npm. To install the package in your project:

```bash
$ yarn add mbed-cloud-sdk
```

`/node_modules/mbed-cloud-sdk` now contains:

* `bundles` - minified browser scripts.
* `lib` - CommonJS modules.
* `lib-es6` - ESNext modules.
* `types` - Typescript types.

## Documentation and examples

See the full documentation and API reference at [https://cloud.mbed.com/docs/latest/mbed-cloud-sdk-javascript](https://cloud.mbed.com/docs/latest/mbed-cloud-sdk-javascript).

Please refer to the examples folder for some node and web examples.

## Contributing

Pelion Device Management SDK for JavaScript is open source and we would like your help; there is a
brief guide on how to get started in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Pelion Device Management SDK for JavaScript is free-to-use and licensed under the **Apache License
2.0**. See [LICENSE](LICENSE) file for more information.
