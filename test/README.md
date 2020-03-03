# Tests

This directory contains both unit and integration tests.

## Unit tests

Unit tests, written with jest.

To run the default test configuration

```bash
$ yarn test
```

To run the test in Jest's watch mode

```bash
$ yarn watch
```

By default, jest will run tests in both browser and node environments. To run tests for a particular environment

```bash
$ yarn test:browser
```

or

```bash
$ yarn test:node
```

## Snippets

The examples found in the [SDK documentation](https://armmbed.github.io/mbed-cloud-sdk-documentation) can be run as unit tests. These tests require an envrionment to be set up, as described [here](https://armmbed.github.io/mbed-cloud-sdk-documentation/#configuration).

```bash
$ yarn test:snippets
```

## Integration

To start the integration test server.

```bash
$ yarn integration
```

To start the integration test server in watch mode.

```bash
$ yarn watch:integration
```

To run integration tests, you'll need to have access to [testrunner](https://github.com/ARMmbed/mbed-cloud-sdk-testrunner), and run the project following the instructions in its README.
