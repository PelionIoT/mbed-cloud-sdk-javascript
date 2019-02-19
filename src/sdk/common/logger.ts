import { LoggerFactoryOptions, LFService, LogGroupRule, LogLevel } from "typescript-logging";

export const loggerFactory = (name: string, level: SDKLogLevel) => {
    const options = new LoggerFactoryOptions();
    switch (level) {
        case "FATAL":
            options.addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Fatal));
            break;
        case "ERROR":
            options.addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Error));
            break;
        case "WARN":
            options.addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Warn));
            break;
        case "INFO":
            options.addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));
            break;
        case "DEBUG":
            options.addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Debug));
            break;
        case "ALL":
            options.addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Trace));
            break;
        default:
            options.addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Fatal));
            break;
    }

    return LFService.createNamedLoggerFactory(`${name}SDKLogger`, options);
};

export type SDKLogLevel = "FATAL" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "ALL";
