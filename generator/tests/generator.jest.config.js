const config = require("../../jest.config");

config.testMatch = [
    "**/generator/tests/**/*.ts",
]

// config.collectCoverage = true;

// config.collectCoverageFrom = [
//     "**/generator/**",
// ];

// config.coverageReporters = [
//     "lcov"
// ]

// config.coverageDirectory = "coverage"

module.exports = config;