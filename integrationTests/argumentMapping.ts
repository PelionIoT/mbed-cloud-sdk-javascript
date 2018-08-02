import * as fs from "fs";

const dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

const specialMethodsMapping: any = {
    ConnectApi: {
        // Args to re-order
        getResourceValue: (args: any) => {
            if (args.deviceId || args.resourcePath) {
                args = [
                    args.deviceId,
                    args.resourcePath
                ];
            }
            return args;
        },
        setResourceValue: (args: any) => {
            if (args.deviceId || args.resourcePath) {
                args = [
                    args.deviceId,
                    args.resourcePath,
                    args.resourceValue
                ];
            }
            return args;
        },
        executeResource: (args: any) => {
            if (args.deviceId || args.resourcePath) {
                args = [
                    args.deviceId,
                    args.resourcePath
                ];
            }
            return args;
        },
        addResourceSubscription: (args: any) => {
            if (args.deviceId || args.resourcePath) {
                args = [
                    args.deviceId,
                    args.resourcePath,
                    null
                ];
            }
            return args;
        },
        listResources: (args: any) => {
            if (args.deviceId) {
                args = args.deviceId;
            }
            return args;
        },
        updatePresubscriptions: (args: any) => {
            if (args.presubscriptions) {
                args = args.presubscriptions;
            }
            return args;
        },
        listMetrics: (args: any) => {
            interface TimePeriod {
                duration: number;
                unit: string;
            }
            function parse(input: string): TimePeriod | any {
                const units: Array<string> = ["hours", "days", "weeks", "months", "years"];
                const match = input.match(/^(.*)([hdwmy]{1})$/);
                if (match) {
                    const duration: string = match[1];
                    let unit: string = match[2];
                    try {
                        unit = units.filter((u: string) => u[0] === unit)[0];
                        const result: TimePeriod = {
                            unit: unit,
                            duration: parseInt(duration, 10)
                        };
                        return result;
                    } catch (exception) {
                        return input;
                    }
                } else {
                    return input;
                }
            }
            if (args.interval) {
                args.interval = parse(args.interval);
            }
            if (args.period) {
                args.period = parse(args.period);
            }
            return args;
        }
    },
    UpdateApi: {
        addFirmwareManifest: (args: any) => {
            if (args.datafile) {
                args.dataFile = fs.createReadStream(args.datafile);
                delete args.datafile;
            }
            if (args.keyTableFile) {
                args.keyTableFile = fs.createReadStream(args.keyTableFile);
            }
            return args;
        },
        addFirmwareImage: (args: any) => {
            if (args.datafile) {
                args.dataFile = fs.createReadStream(args.datafile);
                delete args.datafile;
            }
            return args;
        }
    }
};
function snakeToCamel(snake: string) {
    return snake.replace(/(\_\w)/g, match => {
        return match[1].toUpperCase();
    });
}
function camelToSnake(camel: string) {
    return camel.replace(/([A-Z]+?)/g, (match, _, i) => {
        return `${i === 0 ? "" : "_"}${match.toLowerCase()}`;
    });
}
function isSpecialMappingMethod(sdkModule: string | undefined, methodName: string | undefined): boolean {
    if (!sdkModule || !methodName) {
        return false;
    }
    return specialMethodsMapping[sdkModule] && specialMethodsMapping[sdkModule][methodName];
}
function mapSpecialMethodsArg(sdkModule: string | undefined, methodName: string | undefined, arg: any): any {
    if (!arg || !sdkModule || !methodName) {
        return arg;
    }
    if (isSpecialMappingMethod(sdkModule, methodName)) {
        arg = specialMethodsMapping[sdkModule][methodName](arg);
    }
    return arg;
}
function reverseMap(value: string | undefined): string {
    return (value) ? camelToSnake(value) : "";
}
function map(value: string | undefined): string {
    return (value) ? snakeToCamel(value) : "";
}
function convertObjectCase(obj: any, fromCamelToSnake: boolean): any {
    if (obj && typeof obj === "object") {
        if (!Array.isArray(obj)) {
            return Object.keys(obj).reduce((previous: any, current: string) => {
                previous[(fromCamelToSnake) ? map(current) : reverseMap(current)] = convertObjectCase(obj[current], fromCamelToSnake);
                return previous;
            }, {});
        } else {
            return obj.map(element => convertObjectCase(element, fromCamelToSnake));
        }
    } else {
        return convertDateToUTC(obj);
    }
}
function convertDateToUTC(value: string): string {
    if (dateRegex.test(value)) {
        const date: number | undefined = Date.parse(value);
        if (date) {
            value = new Date(date).toISOString();
        }
    }
    return value;
}
function mapMethod(method: string): string {
    // Async function calls just use normal functions
    method = method.replace(/_async$/, "");

    // Camel-case the method
    return map(method);
}
function mapModule(module: string): string {
    // Camel-case the method
    module = map(module);

    module = module[0].toUpperCase() + module.slice(1);
    return `${module}Api`;
}
function reverseMapModule(module: string): string {
    // Snake-case the module
    return reverseMap(module.replace("Api", ""));
}
function reverseMapMethod(method: string): string {
    // Snake-case the method
    return reverseMap(method);
}

function mapJsonArgs(snakeObject: any): Array<any> {
    if (!snakeObject || (Object.keys(snakeObject).length === 0 && snakeObject.constructor === Object)) {
        return [];
    }
    try {
        const args: any = convertObjectCase(snakeObject, true);
        const argList: Array<any> = [];
        argList.push(args);
        return argList;
    } catch (e) {
        return [];
    }
}
function mapResult(result: any): any {
    if (!result) return result;

    // Snake-case the result keys
    const jsonString: string | undefined = JSON.stringify(result, (key, value) => {
        if (key.charAt(0) === "_") {
            // Keys beginning with underscore are internal and shouldn't be sent to the test runner
            return undefined;
        }
        if (value && !Array.isArray(value) && typeof value === "object") {
            const replacement: any = {};
            for (key in value) {
                if (Object.hasOwnProperty.call(value, key)) {
                    replacement[reverseMap(key)] = value[key];
                }
            }
            return replacement;
        }
        // keep value in response for benefit of schema tests
        if (value === undefined) return null;
        return value;
    });

    return JSON.parse(jsonString);
}

export {
    mapMethod,
    mapModule,
    reverseMapModule,
    reverseMapMethod,
    mapResult,
    mapJsonArgs,
    isSpecialMappingMethod,
    mapSpecialMethodsArg
};
