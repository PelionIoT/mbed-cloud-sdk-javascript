const config = require("./unitTestBase.jest.config");

config.testMatch = [
    "**/test/unit/snippets/**/*.ts",
]

module.exports = config;