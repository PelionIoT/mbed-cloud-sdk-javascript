const config = require("../../jest.config");

config.testMatch = [
    "**/test/integration/**/__tests__/**/*.ts",
]

config.rootDir = "../../";

config.testEnvironment = "node";

config.verbose = true;

module.exports = config;