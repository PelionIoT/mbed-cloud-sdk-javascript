import { FoundationInstance } from "./foundationInstance";
import { Sdk, Config } from "../../../src";

/**
 * Instance of an SDK
 */
export class SDKInstance extends FoundationInstance {

    constructor(config: Config) {
        const newSdkInstance = new Sdk(config);
        super(newSdkInstance, "Sdk");
    }
}
