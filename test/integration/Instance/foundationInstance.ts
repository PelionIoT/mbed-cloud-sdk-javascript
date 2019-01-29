import { Instance } from "./instance";
import { TestRunnerFoundationInstance, TestRunnerMethodInfo, TestRunnerParameters, TestRunnerMethodCallResult } from "../foundation/types";
import { SDK } from "../../../src";
import { Repository } from "../../../src/sdk/common/repository";
import { Method } from "../method/method";
import * as schemas from "../../../src/sdk/generated/_schemas";
import { Schema } from "../../../src/sdk/schema/schema";
import { pascalToCamel } from "../types";
import { ServerError } from "../server/error";

/**
 * Foundation Instance, wraps an instance of a Repository or SDK
 */
export class FoundationInstance extends Instance<Repository | SDK> {

    /**
     * Name of the foundation instance. Will be entity name or SDK
     */
    public name: string;

    public methods: {
        [key: string]: Method
    };

    constructor(instance: Repository | SDK, name: string) {
        super(instance);
        this.name = name;
        this.methods = {};

        if (this.instance instanceof SDK) {
            for (const prop in this.instance) {
                if (typeof this.instance[prop] === "function") {
                    const method = new Method(prop, name);
                    this.methods[prop] = method;
                }
            }
        }

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
