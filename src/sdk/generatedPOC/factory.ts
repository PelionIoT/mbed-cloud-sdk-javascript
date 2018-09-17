import { Config } from "../client/config";
import { User } from "./accounts/user/user";

export class Factory {
    private readonly _config: Config;

    constructor(config: Config) {
        this._config = config;
    }

    public User(): User {
        return new User(this._config);
    }
}
