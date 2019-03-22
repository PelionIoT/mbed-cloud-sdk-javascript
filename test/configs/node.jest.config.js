const config = require("./unitTestBase.jest.config");

config.collectCoverage = true;

config.collectCoverageFrom = [
    "**/src/**/*.ts",
    "!**/src/legacy/_api/*.ts",
    "!**/src/schema/**/*.ts",
    "!**/src/foundation/_schemas/**/*.ts",
    "!**/node_modules/**",
];

config.coverageDirectory = "coverage";

module.exports = config;