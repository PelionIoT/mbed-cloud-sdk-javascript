import { Method as SchemaMethod, Parameter } from "../../../src/schema/types";
import * as schemas from "../../../src/foundation/_schemas";
import { Schema } from "../../../src/schema/schema";
import { pascalToCamel } from "../types";
import { TestRunnerMethodInfo, TestRunnerParameters, TestRunnerMethodCallResult } from "../foundation/types";
import { Repository } from "../../../src/common/repository";
import { snakeToCamel, camelToSnake } from "../../../src/legacy/common/functions";
import { logMessage } from "../logger";
import * as fs from "fs-extra";
import { Paginator } from "../../../src/common/pagination";

/**
 * Method
 */
export class Method {

    /**
     * Regex for detecting a date in a response
     */
    private dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

    /**
     * Name of the method
     */
    public name: string;

    /**
     * Entity this method belongs to
     */
    public entity: string;

    /**
     * Schema definition for this method
     */
    public metadata: SchemaMethod;

    /**
     * The method function
     */
    public methodFunction: () => any;

    /**
     * Construct a new Method
     * @param name Name of the method
     * @param entity Entity this method belongs to
     * @param methodFunction The method function to execute
     */
    constructor(name: string, entity: string, methodFunction?: () => any) {
        this.name = name;
        this.entity = entity;
        this.methodFunction = methodFunction;

        const schemaFunc = schemas[`${pascalToCamel(this.entity)}Schema`];

        if (typeof schemaFunc === "function") {
            const schema = schemaFunc() as Schema;
            this.metadata = schema.getMethod(name);
        }
    }

    /**
     * Call the method
     * @param testRunnerParameters parameters from the testrunner
     * @param instance instance of the repository to pass a this to the method function
     */
    public async call(testRunnerParameters: TestRunnerParameters, instance: Repository): Promise<TestRunnerMethodCallResult> {
        testRunnerParameters = this.convertObjectCase(testRunnerParameters, true);
        const unorderedParameterDict = {};
        for (const parameter of this.metadata.parameters) {
            unorderedParameterDict[parameter.position] = this.mapParameters(parameter, testRunnerParameters);
        }

        const parameterDict = {};
        Object.keys(unorderedParameterDict).sort().forEach(key => {
            parameterDict[key] = unorderedParameterDict[key];
        });

        const flatParams = [];
        Object.keys(parameterDict).map(k => flatParams.push(parameterDict[k]));

        logMessage(`Parameters ${JSON.stringify(flatParams)}`);

        try {
            let result = await this.methodFunction.apply(instance, flatParams);

            // return all data from a paginator
            if (result instanceof Paginator) {
                result = await result.all();
            }

            return {
                payload: this.mapResult(result)
            };
        } catch (e) {
            throw e;
        }
    }

    /**
     * Return json representation of the method
     */
    public toJson(): TestRunnerMethodInfo {
        return {
            name: this.name
        };
    }

    private mapParameters(parameter: Parameter, testRunnerParameters: TestRunnerParameters) {
        // TODO expand cases as tests are written
        const foundParam = Object.keys(testRunnerParameters).find(p => p === parameter.name);
        if (foundParam) {
            // check if parameter is primitive or array of primitives
            if (parameter.type === "string" || parameter.type === "boolean" || parameter.type === "Array<string>") {
                return testRunnerParameters[foundParam];
            } else if (parameter.type === "file") {
                // if file then return a read stream
                return fs.createReadStream(testRunnerParameters[foundParam]);
            } else if (parameter.type.indexOf("Filter") > -1) {
                logMessage(`filter - ${JSON.stringify(testRunnerParameters[foundParam])}`);
                return testRunnerParameters[foundParam];
            } else {
                logMessage(`No mapping found for ${parameter.name}, returning default`);
                return testRunnerParameters[foundParam];
            }
        } else if (parameter.type === "Object") {
            // parameter is object so now match sub params
            const paramObject = {};
            for (const subParam of parameter.subParams) {
                const foundSubParam = Object.keys(testRunnerParameters).find(p => p === subParam.name);
                if (foundSubParam) {
                    paramObject[subParam.name] = this.mapParameters(subParam, testRunnerParameters);
                } else {
                    logMessage(`${subParam.name} not in testrunner parameters`);
                    paramObject[subParam.name] = null;
                }
            }
            return paramObject;
        }

        logMessage(`${parameter.name} not in testrunner parameters`);
        return "";
    }

    private mapResult(result: any): any {
        if (!result) return result;

        // Snake-case the result keys
        const jsonString: string = JSON.stringify(result, (key, value) => {
            if (key.charAt(0) === "_") {
                // Keys beginning with underscore are internal and shouldn't be sent to the test runner
                return undefined;
            }
            if (value && !Array.isArray(value) && typeof value === "object") {
                const replacement: any = {};
                for (key in value) {
                    if (Object.hasOwnProperty.call(value, key)) {
                        replacement[camelToSnake(key)] = value[key];
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

    private convertObjectCase(obj: any, fromCamelToSnake: boolean): any {
        if (obj && typeof obj === "object") {
            if (!Array.isArray(obj)) {
                return Object.keys(obj).reduce((previous: any, current: string) => {
                    previous[(fromCamelToSnake) ? snakeToCamel(current) : camelToSnake(current)] = this.convertObjectCase(obj[current], fromCamelToSnake);
                    return previous;
                }, {});
            } else {
                return obj.map(element => this.convertObjectCase(element, fromCamelToSnake));
            }
        } else {
            return this. convertDateToUTC(obj);
        }
    }

    private convertDateToUTC(value: string): string {
        if (this.dateRegex.test(value)) {
            const date: number | undefined = Date.parse(value);
            if (date) {
                value = new Date(date).toISOString();
            }
        }
        return value;
    }
}
