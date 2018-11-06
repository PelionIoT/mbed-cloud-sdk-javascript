import { EntityBase } from "../../../common/entityBase";
import { Paginator } from "../../../../common/pagination";
import { ListResponse } from "../../../../common/listResponse";
import { ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { ApiKeyStatusEnum } from "../../enums";

/**
 * ApiKey
 */
export class ApiKey extends EntityBase {
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
    public groups?: Array<string>;

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
    public status?: ApiKeyStatusEnum;

    /**
     * Last update UTC time RFC3339.
     */
    public updatedAt?: Date;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * gets a ApiKey.
     * @returns Promise containing ApiKey.
     */
    public get(): Promise<ApiKey> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<ApiKey>(
                    {
                        url: "/v3/api-keys/{apiKey}",
                        method: "GET",
                        pathParams: {
                            apiKey: this.id,
                        },
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
     * List ApiKeys
     * @param options filter options
     */
    public list(options?: ListOptions): Paginator<ApiKey, ListOptions> {
        const pageFunc = (pageOptions: ListOptions): Promise<ListResponse<ApiKey>> => {
            return apiWrapper(
                resultsFn => {
                    const { limit, after, order, include } = pageOptions as ListOptions;
                    this.client._CallApi<ApiKey>(
                        {
                            url: "/v3/api-keys",
                            method: "GET",
                            query: { after, include, order, limit },
                            paginated: true,
                        },
                        ApiKey,
                        resultsFn
                    );
                },
                (data: ListResponse<ApiKey>, done) => {
                    done(null, new ListResponse(data, data.data));
                },
                null,
                true
            );
        };
        return new Paginator(pageFunc, options);
    }
}
