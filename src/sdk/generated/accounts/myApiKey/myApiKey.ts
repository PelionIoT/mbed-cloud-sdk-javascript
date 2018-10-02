import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { PolicyGroup } from "../../index";
import { MyApiKeyStatusEnum } from "../../enums";

/**
 * MyApiKey
 */
export class MyApiKey extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
        groups: "groupIds",
    };

    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * The timestamp of the API key creation in the storage, in milliseconds.
     */
    public creationTime?: number;

    /**
     * A list of group IDs this API key belongs to.
     */
    public groupIds?: Array<string>;

    /**
     * The API key.
     */
    public key?: string;

    /**
     * The timestamp of the latest API key usage, in milliseconds.
     */
    public lastLoginTime?: number;

    /**
     * The display name for the API key.
     */
    public name?: string;

    /**
     * The owner of this API key, who is the creator by default.
     */
    public owner?: string;

    /**
     * The status of the API key.
     */
    public status?: MyApiKeyStatusEnum;

    /**
     * Last update UTC time RFC3339.
     */
    public updatedAt?: Date;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * gets a MyApiKey.
     * @returns Promise containing MyApiKey.
     */
    public get(): Promise<MyApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<MyApiKey>(
                    {
                        url: "/v3/api-keys/me",
                        method: "GET",
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * List PolicyGroups
     * @param options filter options
     */
    public groups(options?: ListOptions): Paginator<PolicyGroup, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<PolicyGroup>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<PolicyGroup>(
                        {
                            url: "/v3/api-keys/me/groups",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        new PolicyGroup(),
                        resultsFn
                    );
                },
                (data: ListResponse<PolicyGroup>, done) => {
                    done(null, new ListResponse(data, data.data));
                }
            );
        };
        return new Paginator(pageFunc, options);
    }

    /**
     * updates a MyApiKey.
     * @returns Promise containing MyApiKey.
     */
    public update(): Promise<MyApiKey> {
        const body = {
            groups: this.groupIds,
            name: this.name,
            owner: this.owner,
            status: this.status,
        };
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<MyApiKey>(
                    {
                        url: "/v3/api-keys/me",
                        method: "PUT",
                        body: body,
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}
