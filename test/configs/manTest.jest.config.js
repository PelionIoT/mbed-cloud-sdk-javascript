const config = require("./unitTestBase.jest.config");

config.testMatch = [
    "**/test/manualTesting/**/*.ts",
]

module.exports = config;