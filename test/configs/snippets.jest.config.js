const config = require("./unitTestBase.jest.config");

config.testMatch = [
    "**/test/snippets/**/*.ts",
]

module.exports = config;