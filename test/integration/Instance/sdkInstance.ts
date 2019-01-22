import { FoundationInstance } from "./foundationInstance";
import { SDK, Config } from "../../../src";

export class SDKInstance extends FoundationInstance {

    constructor(config: Config) {
        const newSdkInstance = new SDK(config);
        super(newSdkInstance);
        this.name = "sdk";
    }
}
