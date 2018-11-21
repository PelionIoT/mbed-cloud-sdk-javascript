# Tests

This directory contains both unit and integration tests.

## Unit tests

Unit tests, written with jest.

To run the default test configuration

```bash
$ npm test
```

To run the test in Jest's watch mode

```bash
$ npm run watch
```

By default, jest will run tests in both browser and node environments. To run tests for a particular environment

```bash
$ npm run test:browser
```

or

```bash
$ npm run test:node
```

## Snippets

The examples found in the [SDK documentation](https://armmbed.github.io/mbed-cloud-sdk-documentation) can be run as unit tests. These tests require an envrionment to be set up, as described [here](https://armmbed.github.io/mbed-cloud-sdk-documentation/#configuration).

```bash
$ npm run test:snippets
```

## Integration

To start the integration test server.

```bash
$ npm run integration
```

To start the integration test server in watch mode.

```bash
$ npm run watch:integration
```

To run integration tests, you'll need to have access to [testrunner](https://github.com/ARMmbed/mbed-cloud-sdk-testrunner), and run the project following the instructions in its README.
