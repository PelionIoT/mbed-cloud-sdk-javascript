const config = require("../../jest.config");

config.testMatch = [
    "**/generator/tests/**/*.ts",
]

config.collectCoverage = true;

config.collectCoverageFrom = [
    "**/generator/**/*.ts",
    "!**/generator/tests/**/*.ts",
];

config.coverageReporters = [
    "lcov"
]

config.coverageDirectory = "coverage"

module.exports = config;