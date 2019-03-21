import { Instance } from "./instance";
import { TestRunnerFoundationInstance, TestRunnerMethodInfo, TestRunnerParameters, TestRunnerMethodCallResult } from "../foundation/types";
import { Sdk } from "../../../src";
import { Repository } from "../../../src/common/repository";
import { Method } from "../method/method";
import * as schemas from "../../../src/foundation/_schemas";
import { Schema } from "../../../src/schema/schema";
import { pascalToCamel } from "../types";
import { ServerError } from "../server/error";

/**
 * Foundation Instance, wraps an instance of a Repository or SDK
 */
export class FoundationInstance extends Instance<Repository | Sdk> {

    /**
     * Name of the foundation instance. Will be entity name or SDK
     */
    public name: string;

    /**
     * Methods of the foundation instance
     */
    public methods: {
        [key: string]: Method
    };

    /**
     * Create a new FoundationInstance Instance
     * @param instance Instance, either a repository or top level SDK
     * @param name name of the instance
     */
    constructor(instance: Repository | Sdk, name: string) {
        super(instance);
        this.name = name;
        this.methods = {};

        // if the instance is a top level sdk, get methods from top level
        if (this.instance instanceof Sdk) {
            for (const prop in this.instance) {
                if (typeof this.instance[prop] === "function") {
                    const method = new Method(prop, name);
                    this.methods[prop] = method;
                }
            }
        }

        // otherwise instance is a repository so inly include methods that are relevant to testrunner
        if (this.instance instanceof Repository) {
            const schema = schemas[`${pascalToCamel(name)}Schema`]() as Schema;
            for (const prop in this.instance) {
                if (typeof this.instance[prop] === "function" && schema.doesMethodExist(prop)) {
                    const method = new Method(prop, name, this.instance[prop]);
                    this.methods[prop] = method;
                }
            }
        }
    }

    /**
     * Return JSON representation of Foundation Instance
     */
    public toJson(): TestRunnerFoundationInstance {
        return {
            id: this.id,
            created_at: this.createdAt,
            entity: "Sdk"
        };
    }

    /**
     * List all the methods available on the instance
     */
    public listMethods(): Array<TestRunnerMethodInfo> {
        return Object.keys(this.methods).map(k => this.methods[k].toJson());
    }

    /**
     * Execute a method on this isntance
     * @param name name of method to execute
     * @param parameters parameters from TestRunner
     */
    public async executeMethod(name: string, parameters: TestRunnerParameters): Promise<TestRunnerMethodCallResult> {
        const method = this.methods[name];
        if (method) {
            if (this.instance instanceof Repository) {
                return await method.call(parameters, this.instance);
            }
        } else {
            throw new ServerError(404, `no such method ${name}`);
        }
    }
}
