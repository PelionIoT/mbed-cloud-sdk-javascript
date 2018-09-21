import { Config } from "../client/config";
import { ApiKey } from "./index";
import { MyAccount } from "./index";
import { PolicyGroup } from "./index";
import { SubtenantAccount } from "./index";
import { User } from "./index";
export class Factory {
    private readonly _config: Config;
    constructor(config: Config) {
        this._config = config;
    }
    public ApiKey(): ApiKey {
        return new ApiKey(this._config);
    }
    public MyAccount(): MyAccount {
        return new MyAccount(this._config);
    }
    public PolicyGroup(): PolicyGroup {
        return new PolicyGroup(this._config);
    }
    public SubtenantAccount(): SubtenantAccount {
        return new SubtenantAccount(this._config);
    }
    public User(): User {
        return new User(this._config);
    }
}