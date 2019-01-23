import { Instance } from "./instance";
import { TestRunnerFoundationInstance } from "../foundation/types";
import { SDK } from "../../../src";
import { Repository } from "../../../src/sdk/common/repository";

/**
 * Foundation Instance, wraps an instance of a Repository or SDK
 */
export class FoundationInstance extends Instance<Repository | SDK> {

    /**
     * Name of the foundation instance. Will be entity name or SDK
     */
    public name: string;

    /**
     * Return JSON representation of Foundation Instance
     */
    public toJson(): TestRunnerFoundationInstance {
        return {
            id: this.id,
            created_at: this.createdAt,
            entity: "sdk"
        };
    }

    /**
     * List all the methods available on the instance
     */
    public listMethods(): Array<string> {
        const methodList = new Array<string>();

        if (this.instance instanceof SDK) {
            for (const prop in this.instance.entities) {
                if (typeof this.instance.entities[prop] === "function") {
                    methodList.push(this.instance.entities[prop].name);
                }
            }
        }

        if (this.instance instanceof Repository) {
            for (const prop in this.instance) {
                if (typeof this.instance[prop] === "function") {
                    methodList.push(this.instance[prop].name);
                }
            }
        }

        return methodList;
    }

}
