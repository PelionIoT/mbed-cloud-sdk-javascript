const config = require("./unitTestBase.jest.config");

config.testMatch = [
    "**/test/snippets/foundation/certRenew.ts",
]

module.exports = config;