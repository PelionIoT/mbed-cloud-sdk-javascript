/**
 * Get a new instance of a logger
 * @param name The name of the logger, must be unique
 * @param level The level of the logger
 */
export declare const loggerFactory: (name: string, level: SDKLogLevel) => import("typescript-logging").LoggerFactory;
/**
 * The SDK log level
 */
export declare type SDKLogLevel = "FATAL" | "ERROR" | "WARN" | "INFO" | "DEBUG" | "ALL";
