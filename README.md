# mbed Cloud JavaScript SDK

[![Circle CI](https://circleci.com/gh/ARMmbed/mbed-cloud-sdk-javascript.svg?style=shield&circle-token=62ef40035b1b5442234a44ad7e74199ea582f3f4)](https://circleci.com/gh/ARMmbed/mbed-cloud-sdk-javascript/)

JavaScript SDK for mbed Cloud

## Usage in Node.js (CommonJS modules)

If using [Node.js](https://nodejs.org), you will first need to install the npm dependencies:

```bash
> npm install
```

## Usage in Browser (RequireJS / AMD modules, Vanilla JS / SPAs)

The bundled files in `dist/bundles` are standalone modules following the [UMD](https://github.com/umdjs/umd) specification so should be usable without any further installation or modification.

## Development

### Prerequisites

```gulp``` installed globally by running:

```bash
> npm install -g gulp
```

### Installing

After cloning this repository, install the npm dependencies:

```bash
> npm install
```

### Building

Simply use the default ```gulp``` task to build the SDK and docs

```bash
> gulp
```
