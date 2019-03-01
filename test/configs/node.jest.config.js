const config = require("./unitTestBase.jest.config");

config.collectCoverage = true;

config.collectCoverageFrom = [
    "**/src/**/*.ts",
    "!**/src/legacy/_api/*.ts",
    "!**/node_modules/**",
];

config.coverageDirectory = "coverage";

module.exports = config;