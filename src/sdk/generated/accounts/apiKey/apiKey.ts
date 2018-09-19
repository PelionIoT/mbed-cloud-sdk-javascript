import { EntityBase } from "../../../common/entityBase";
import { ConnectionOptions, ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";
export class ApiKey extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
        groups: "groupIds",
    };
    public readonly _foreignKeys: { [key: string]: { [key: string]: any } } = {
    }
};
/**
* Gets a user
* @returns Promise containing user
*/
public createdAt ?: Date;
/**
* Gets a user
* @returns Promise containing user
*/
public creationTime ?: number;
/**
* Gets a user
* @returns Promise containing user
*/
public groupIds ?: Array<string>;
/**
* Gets a user
* @returns Promise containing user
*/
public key ?: string;
/**
* Gets a user
* @returns Promise containing user
*/
public lastLoginTime ?: number;
/**
* Gets a user
* @returns Promise containing user
*/
public name ?: string;
/**
* Gets a user
* @returns Promise containing user
*/
public owner ?: string;
/**
* Gets a user
* @returns Promise containing user
*/
public status ?: string;
/**
* Gets a user
* @returns Promise containing user
*/
public updatedAt ?: Date;
constructor(config ?: ConnectionOptions | Config) {
    super();
    if (config instanceof Config) {
        this.config = config;
    } else {
        this.config = new Config(config);
    }
}
/**
* Gets a user
* @returns Promise containing user
*/
public create(): Promise < ApiKey > {
    return apiWrapper(resultsFn => {
        Client.CallApi<ApiKey>({
            url: "/v3/api-keys",
            method: "POST",
            config: this.config,
        }, this, resultsFn);
    }, (data, done) => {
        done(null, data);
    });
}
/**
* Gets a user
* @returns Promise containing user
*/
public delete (): Promise < ApiKey > {
    return apiWrapper(resultsFn => {
        Client.CallApi<ApiKey>({
            url: "/v3/api-keys/{apiKey}",
            method: "DELETE",
            config: this.config,
        }, this, resultsFn);
    }, (data, done) => {
        done(null, data);
    });
}
/**
* Gets a user
* @returns Promise containing user
*/
public get(): Promise < ApiKey > {
    return apiWrapper(resultsFn => {
        Client.CallApi<ApiKey>({
            url: "/v3/api-keys/{apiKey}",
            method: "GET",
            config: this.config,
        }, this, resultsFn);
    }, (data, done) => {
        done(null, data);
    });
}
/**
* Gets a user
* @returns Promise containing user
*/
public resetSecret(accountID: string): Promise < ApiKey > {
    return apiWrapper(resultsFn => {
        Client.CallApi<ApiKey>({
            url: "/v3/accounts/{accountID}/api-keys/{apiKey}/reset-secret",
            method: "POST",
            config: this.config,
        }, this, resultsFn);
    }, (data, done) => {
        done(null, data);
    });
}
/**
* Gets a user
* @returns Promise containing user
*/
public update(): Promise < ApiKey > {
    return apiWrapper(resultsFn => {
        Client.CallApi<ApiKey>({
            url: "/v3/api-keys/{apiKey}",
            method: "PUT",
            config: this.config,
        }, this, resultsFn);
    }, (data, done) => {
        done(null, data);
    });
}
}