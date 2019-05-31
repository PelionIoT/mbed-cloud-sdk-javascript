const config = require("./unitTestBase.jest.config");

config.testMatch = [
    "**/test/snippets/**/*.ts",
]

config.collectCoverage = true;

config.collectCoverageFrom = [
    "**/src/**/*.ts",
    "!**/src/legacy/_api/*.ts",
    "!**/node_modules/**",
];

config.coverageReporters = [
    "lcov"
]

config.coverageDirectory = "./"

module.exports = config;