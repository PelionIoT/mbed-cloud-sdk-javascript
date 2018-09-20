import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { ConnectionOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";
import { ApiKey } from "../apiKey/apiKey";
import { User } from "../user/user";
/**
* PolicyGroup.
*/
export class PolicyGroup extends EntityBase {
    /**
    * The UUID of the account this group belongs to.
    */
    public accountId?: string;
    /**
    * The number of API keys in this group.
    */
    public apikeyCount?: number;
    /**
    * Creation UTC time RFC3339.
    */
    public createdAt?: Date;
    /**
    * The name of the group.
    */
    public name?: string;
    /**
    * Last update UTC time RFC3339.
    */
    public updatedAt?: Date;
    /**
    * The number of users in this group.
    */
    public userCount?: number;
    constructor(config?: ConnectionOptions | Config) {
        super();
        if (config instanceof Config) {
            this.config = config;
        } else {
            this.config = new Config(config);
        }
    }
    /**
    * List ApiKeys
    * @param options filter options
    */
    public apiKeys(options?: ListOptions): Paginator<ApiKey, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<ApiKey>> => {
            return apiWrapper(resultsFn => {
                const { limit, after, order, include } = pageOptions as ListOptions;
                Client.CallApi<ApiKey>({
                    url: "/v3/policy-groups/{groupID}/api-keys",
                    method: "GET",
                    query: { after, include, order, limit },
                    pathParams: {
                        "groupID": this.id,
                    },
                    config: this.config,
                    paginated: true,
                }, new ApiKey(), resultsFn);
            }, (data: ListResponse<ApiKey>, done) => {
                done(null, new ListResponse(data, data.data));
            });
        };
        return new Paginator(pageFunc, options);
    }
    /**
    * gets a PolicyGroup.
    * @returns Promise containing PolicyGroup.
    */
    public get(): Promise<PolicyGroup> {
        return apiWrapper(resultsFn => {
            Client.CallApi<PolicyGroup>({
                url: "/v3/policy-groups/{groupID}",
                method: "GET",
                pathParams: {
                    "groupID": this.id,
                },
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * List PolicyGroups
    * @param options filter options
    */
    public list(options?: ListOptions): Paginator<PolicyGroup, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<PolicyGroup>> => {
            return apiWrapper(resultsFn => {
                const { limit, after, order, include } = pageOptions as ListOptions;
                Client.CallApi<PolicyGroup>({
                    url: "/v3/policy-groups",
                    method: "GET",
                    query: { after, include, order, limit },
                    config: this.config,
                    paginated: true,
                }, new PolicyGroup(), resultsFn);
            }, (data: ListResponse<PolicyGroup>, done) => {
                done(null, new ListResponse(data, data.data));
            });
        };
        return new Paginator(pageFunc, options);
    }
    /**
    * List Users
    * @param options filter options
    */
    public users(options?: ListOptions): Paginator<User, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<User>> => {
            return apiWrapper(resultsFn => {
                const { limit, after, order, include } = pageOptions as ListOptions;
                Client.CallApi<User>({
                    url: "/v3/policy-groups/{groupID}/users",
                    method: "GET",
                    query: { after, include, order, limit },
                    pathParams: {
                        "groupID": this.id,
                    },
                    config: this.config,
                    paginated: true,
                }, new User(), resultsFn);
            }, (data: ListResponse<User>, done) => {
                done(null, new ListResponse(data, data.data));
            });
        };
        return new Paginator(pageFunc, options);
    }
}