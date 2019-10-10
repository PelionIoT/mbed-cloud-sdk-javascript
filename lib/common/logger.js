"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_logging_1 = require("typescript-logging");
/**
 * Get a new instance of a logger
 * @param name The name of the logger, must be unique
 * @param level The level of the logger
 */
exports.loggerFactory = function (name, level) {
    var options = new typescript_logging_1.LoggerFactoryOptions();
    switch (level) {
        case "FATAL":
            options.addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp(".+"), typescript_logging_1.LogLevel.Fatal));
            break;
        case "ERROR":
            options.addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp(".+"), typescript_logging_1.LogLevel.Error));
            break;
        case "WARN":
            options.addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp(".+"), typescript_logging_1.LogLevel.Warn));
            break;
        case "INFO":
            options.addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp(".+"), typescript_logging_1.LogLevel.Info));
            break;
        case "DEBUG":
            options.addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp(".+"), typescript_logging_1.LogLevel.Debug));
            break;
        case "ALL":
            options.addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp(".+"), typescript_logging_1.LogLevel.Trace));
            break;
        default:
            options.addLogGroupRule(new typescript_logging_1.LogGroupRule(new RegExp(".+"), typescript_logging_1.LogLevel.Fatal));
            break;
    }
    return typescript_logging_1.LFService.createNamedLoggerFactory(name + "SDKLogger", options);
};
//# sourceMappingURL=logger.js.map