import { EntityBase } from "../../../common/entityBase";
import { ListOptions, ConnectionOptions } from "../../../../common/interfaces";
import { ListResponse } from "../../../../common/listResponse";
import { User } from "../user/user";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";
import { Config } from "../../../client/config";
import { Paginator } from "../../../../common/pagination";

export class PolicyGroup extends EntityBase {
    /**
     * The UUID of the account this group belongs to.
     */
    public accountId: string;
    /**
     * The name of the group.
     */
    public name: string;
    /**
     * The number of users in this group.
     */
    public userCount: number;
    /**
     * The number of API keys in this group.
     */
    public apiKeyCount: number;
    /**
     * Creation time.
     */
    public createdAt?: Date;

    constructor(config?: ConnectionOptions | Config) {
        super();
        if (config instanceof Config) {
            this.config = config;
        } else {
            this.config = new Config(config);
        }
    }

    /**
     * List groups
     * @param options filter options
     * @returns Promise of listResponse
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

        const maxSize = options ? options.maxSize || options.limit || 50 : 50;
        return new Paginator(pageFunc, maxSize, options);
    }

    /**
     * List users of this group
     * @param options filter options
     * @returns Promise of listResponse
     */
    public users(options?: ListOptions): Paginator<User, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<User>> => {
            return apiWrapper(resultsFn => {
                const { limit, after, order, include } = pageOptions as ListOptions;
                Client.CallApi<User>({
                    url: "/v3/policy-groups/{groupID}/users",
                    method: "GET",
                    pathParams: { groupID: this.id },
                    query: { after, include, order, limit },
                    config: this.config,
                    paginated: true,
                }, new User(), resultsFn);
            }, (data: ListResponse<User>, done) => {
                done(null, new ListResponse(data, data.data));
            });
        };

        const maxSize = options ? options.maxSize || options.limit || 50 : 50;
        return new Paginator(pageFunc, maxSize, options);
    }
}
