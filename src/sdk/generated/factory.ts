import { Config } from "../client/config";
import { AccountRepository } from "./Accounts/account/accountRepository";
import { UserRepository } from "./Accounts/user/userRepository";
import { ApiKeyRepository } from "./Accounts/apiKey/apiKeyRepository";
export class Factory {
    private readonly _config: Config;
    constructor(config: Config) {
        this._config = config;
    }
    public accountRepository(): AccountRepository {
        return new AccountRepository(this._config);
    }
    public apiKeyRepository(): ApiKeyRepository {
        return new ApiKeyRepository(this._config);
    }
    public userRepository(): UserRepository {
        return new UserRepository(this._config);
    }
}
