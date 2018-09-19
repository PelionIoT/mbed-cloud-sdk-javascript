import { Config } from "../client/config";

import { ApiKey } from "./accounts/apiKey/apiKey";

import { LoginHistory } from "./accounts/loginHistory/loginHistory";

import { MyAccount } from "./accounts/myAccount/myAccount";

import { PasswordPolicy } from "./accounts/passwordPolicy/passwordPolicy";

import { PolicyGroup } from "./accounts/policyGroup/policyGroup";

import { SubtenantAccount } from "./accounts/subtenantAccount/subtenantAccount";

import { User } from "./accounts/user/user";

export class Factory {
    private readonly _config: Config;

    constructor(config: Config) {
        this._config = config;
    }

    public ApiKey(): ApiKey {
        return new ApiKey(this._config);
    }

    public LoginHistory(): LoginHistory {
        return new LoginHistory(this._config);
    }

    public MyAccount(): MyAccount {
        return new MyAccount(this._config);
    }

    public PasswordPolicy(): PasswordPolicy {
        return new PasswordPolicy(this._config);
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
