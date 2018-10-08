const config = require("./unitTestBase.jest.config");

config.testMatch = [
    "**/test/unit/manTesting/**/*.ts",
]

module.exports = config;