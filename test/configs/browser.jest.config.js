const config = require("./unitTestBase.jest.config");

config.testEnvironment = "jsdom";

module.exports = config;