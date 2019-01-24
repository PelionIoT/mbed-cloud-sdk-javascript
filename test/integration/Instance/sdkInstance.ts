import { FoundationInstance } from "./foundationInstance";
import { SDK, Config } from "../../../src";

/**
 * Instance of an SDK
 */
export class SDKInstance extends FoundationInstance {

    constructor(config: Config) {
        const newSdkInstance = new SDK(config);
        super(newSdkInstance, "sdk");
        this.name = "sdk";
    }
}
