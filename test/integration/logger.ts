import { LoggerFactoryOptions, LFService, LogGroupRule, LogLevel } from "typescript-logging";

// Create options instance:
const options = new LoggerFactoryOptions().addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));

// Create a named loggerfactory and pass in the options and export the factory.
// Named is since version 0.2.+ (it's recommended for future usage)
const factory = LFService.createNamedLoggerFactory("TestServerLoggerFactory", options);

const log = factory.getLogger("testserver");

function logMessage(message: string): void {
    log.info(message);
}

function logMessageFromObject(message: object): void {
    log.info(JSON.stringify(message));
}

export {
    logMessage,
    logMessageFromObject
};
