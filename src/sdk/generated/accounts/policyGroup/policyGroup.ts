import { EntityBase } from "../../../common/entityBase";
import { ConnectionOptions, ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";
export class PolicyGroup extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
    };
    public readonly _foreignKeys: { [key: string]: { [key: string]: any } } = {
    }
};
/**
* Gets a user
* @returns Promise containing user
*/
public accountId ?: string;
/**
* Gets a user
* @returns Promise containing user
*/
public apikeyCount ?: number;
/**
* Gets a user
* @returns Promise containing user
*/
public createdAt ?: Date;
/**
* Gets a user
* @returns Promise containing user
*/
public name ?: string;
/**
* Gets a user
* @returns Promise containing user
*/
public updatedAt ?: Date;
/**
* Gets a user
* @returns Promise containing user
*/
public userCount ?: number;
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
public get(): Promise < PolicyGroup > {
    return apiWrapper(resultsFn => {
        Client.CallApi<PolicyGroup>({
            url: "/v3/policy-groups/{groupID}",
            method: "GET",
            config: this.config,
        }, this, resultsFn);
    }, (data, done) => {
        done(null, data);
    });
}
}