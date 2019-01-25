import { Method as SchemaMethod, Parameter } from "../../../src/sdk/schema/types";
import * as schemas from "../schema/__schemas__";
import { Schema } from "../../../src/sdk/schema/schema";
import { pascalToCamel } from "../types";
import { TestRunnerMethodInfo, TestRunnerParameters, TestRunnerMethodCallResult } from "../foundation/types";
import { Repository } from "../../../src/sdk/common/repository";
import { snakeToCamel, camelToSnake } from "../../../src/common/functions";
import { logMessage } from "../logger";
import * as fs from "fs-extra";

export class Method {

    private dateRegex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

    public name: string;
    public entity: string;
    public metadata: SchemaMethod;
    public methodFunction: () => any;

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

    public async call(testRunnerParameters: TestRunnerParameters, instance: Repository): Promise<TestRunnerMethodCallResult> {
        testRunnerParameters = this.convertObjectCase(testRunnerParameters, true);
        // tslint:disable-next-line:no-console
        console.log(testRunnerParameters);
        const unorderedParameterDict = {};
        for (const parameter of this.metadata.parameters) {
            unorderedParameterDict[parameter.position] = this.mapParameters(parameter, testRunnerParameters);
        }

        const parameterDict = {};
        Object.keys(unorderedParameterDict).sort().forEach(key => {
            parameterDict[key] = unorderedParameterDict[key];
        });

        // tslint:disable-next-line:no-console
        console.log(parameterDict);

        const flatParams = [];
        Object.keys(parameterDict).map(k => flatParams.push(parameterDict[k]));

        // tslint:disable-next-line:no-console
        console.log(flatParams);

        try {
            const result = await this.methodFunction.apply(instance, flatParams);
            return {
                payload: this.mapResult(result)
            };
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log(e);
        }
    }

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
                    return "";
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
