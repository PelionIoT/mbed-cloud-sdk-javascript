import { Method as SchemaMethod } from "../schema/types";
import * as schemas from "../schema/__schemas__";
import { Schema } from "../schema/schema";
import { pascalToCamel } from "../types";
import { TestRunnerMethodInfo, TestRunnerParameters, TestRunnerMethodCallResult } from "../foundation/types";
import { Repository } from "../../../src/sdk/common/repository";

export class Method {

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
        const unorderedParameterDict = {};
        for (const parameter of this.metadata.parameters) {
            // check if parameter is primitive
            if (parameter.type === "string") {
                const foundParam = Object.keys(testRunnerParameters).find(p => p === parameter.name);
                if (foundParam) {
                    unorderedParameterDict[parameter.position] = testRunnerParameters[foundParam];
                }
            }

            if (parameter.type === "Object") {
                // parameter is object so must match sub params
                const paramObject = {};
                for (const subParam of parameter.subParams) {
                    const foundParam = Object.keys(testRunnerParameters).find(p => p === subParam.name);
                    paramObject[subParam.name] = testRunnerParameters[foundParam];
                }
                // tslint:disable-next-line:no-console
                console.log(paramObject);
                unorderedParameterDict[parameter.position] = paramObject;
            }
        }

        // tslint:disable-next-line:no-console
        console.log(unorderedParameterDict);

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

        // tslint:disable-next-line:no-console
        console.log(this.methodFunction.toString());

        try {
            const result = await this.methodFunction.apply(instance, flatParams);
            // tslint:disable-next-line:no-console
            console.log(result);

            return {
                payload: result
            };
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.log("caught an error");
            // tslint:disable-next-line:no-console
            console.log(e);
        }
    }

    public toJson(): TestRunnerMethodInfo {
        return {
            name: this.name
        };
    }
}
