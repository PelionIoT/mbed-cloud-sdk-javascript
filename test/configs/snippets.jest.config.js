const config = require("./unitTestBase.jest.config");

config.testMatch = [
    "**/test/snippets/**/*.ts",
]

config.collectCoverage = true;

config.collectCoverageFrom = [
    "**/src/sdk/**/*.ts",
    "!**/src/_api/*.ts",
    "!**/node_modules/**",
];

config.coverageReporters = [
    "lcov"
]

config.coverageDirectory = "./"

module.exports = config;