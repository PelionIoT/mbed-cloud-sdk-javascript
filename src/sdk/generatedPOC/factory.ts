import { Config } from "../client/config";
import { User } from "./accounts/user/user";
import { PolicyGroup } from "./accounts/policyGroup/policyGroup";

export class Factory {
    private readonly _config: Config;

    constructor(config: Config) {
        this._config = config;
    }

    public User(): User {
        return new User(this._config);
    }

    public PolicyGroup(): PolicyGroup {
        return new PolicyGroup(this._config);
    }
}
