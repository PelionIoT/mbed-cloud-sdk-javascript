import { EntityBase } from "../../../common/entityBase";
import { ListOptions, CallbackFn } from "../../../../common/interfaces";
import { ListResponse } from "../../../../common/listResponse";
import { User } from "../user/user";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";

export class PolicyGroup extends EntityBase {
    /**
     * The UUID of the account this group belongs to.
     */
    public readonly accountId: string;
    /**
     * The name of the group.
     */
    public readonly name: string;
    /**
     * The number of users in this group.
     */
    public readonly userCount: number;
    /**
     * The number of API keys in this group.
     */
    public readonly apiKeyCount: number;
    /**
     * Creation time.
     */
    public readonly createdAt?: Date;

    /**
     * List groups
     * @param options filter options
     * @returns Promise of listResponse
     */
    public list(options?: ListOptions): Promise<ListResponse<PolicyGroup>>;
    /**
     * List groups
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public list(options?: ListOptions, callback?: CallbackFn<ListResponse<PolicyGroup>>): void;
    public list(options?: ListOptions, callback?: CallbackFn<ListResponse<PolicyGroup>>): Promise<ListResponse<PolicyGroup>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return apiWrapper(resultsFn => {
            const { limit, after, order, include } = options as ListOptions;
            Client.CallApi<PolicyGroup>({
                url: "/v3/policy-groups",
                method: "GET",
                query: { after, include, order, limit },
                config: this.config,
                paginated: true,
            }, new PolicyGroup(), resultsFn);
        }, (data: ListResponse<PolicyGroup>, done) => {
            done(null, new ListResponse(data, data.data));
        }, callback);
    }

    /**
     * List users of this group
     * @param options filter options
     * @returns Promise of listResponse
     */
    public users(options?: ListOptions): Promise<ListResponse<User>>;
    /**
     * List users of this group
     * @param options filter options
     * @param callback A function that is passed the arguments (error, listResponse)
     */
    public users(options?: ListOptions, callback?: CallbackFn<ListResponse<User>>): void;
    public users(options?: ListOptions, callback?: CallbackFn<ListResponse<User>>): Promise<ListResponse<User>> {
        options = options || {};
        if (typeof options === "function") {
            callback = options;
            options = {};
        }

        return apiWrapper(resultsFn => {
            const { limit, after, order, include } = options as ListOptions;
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
        }, callback);
    }
}
