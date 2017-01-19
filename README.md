# mbed Cloud JavaScript SDK

[![Circle CI](https://circleci.com/gh/ARMmbed/mbed-cloud-sdk-javascript.svg?style=shield&circle-token=62ef40035b1b5442234a44ad7e74199ea582f3f4)](https://circleci.com/gh/ARMmbed/mbed-cloud-sdk-javascript/)

The mbed Cloud SDK gives developers access to the full mbed suite using JavaScript.

Other languages are available too:

- [Python](https://github.com/ARMmbed/mbed-cloud-sdk-python)
- [.Net](https://github.com/ARMmbed/mbed-cloud-sdk-dotnet)

If you want to contribute to creating a SDK for another language the work is
greatly appreciated and you can read more about the process
[here](https://github.com/ARMmbed/mbed-cloud-sdk-codegen/blob/master/docs/create-new-language.md).

## Documentation

See full [documentation and API reference
here](http://mbed-cloud-sdk-javascript.s3-website-us-west-2.amazonaws.com/).

## Usage in Node.js (CommonJS modules)

If using [Node.js](https://nodejs.org), you will first need to install the npm dependencies:

```bash
> npm install
```

## Usage in Browser (RequireJS / AMD modules, Vanilla JS / SPAs)

The bundled files in `dist/bundles` are standalone modules following the [UMD](https://github.com/umdjs/umd) specification so should be usable without any further installation or modification.

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
