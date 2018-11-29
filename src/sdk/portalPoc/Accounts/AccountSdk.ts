import { Config } from "../..";
import { ApiKey as ApiKeyEntity } from "../../generated";
import { ApiKey, ApiKeyCreateRequest, ApiKeyUpdateRequest } from "./ApiKey";

export type Order = "ASC" | "DESC";

// TODO: Use something like this list response interface for all APIs
export interface ListResponse<A> {
    data: A[];
    totalCount: number;
    hasMore: boolean;
    after?: string;
    order?: Order;
}

// TODO: Use this for all APIs as a generic "list request" interface, and come up with a nice pattern for generic filters
export interface ListApiKeysRequest {
    limit?: number;
    after?: string;
    order?: Order;
    include?: "TOTAL_COUNT"[];
    keyEq?: string;
    ownerEq?: string;
}

export class AccountSdk {
    constructor(
        private readonly config: Config
    ) {}

    public listApiKeys(request: ListApiKeysRequest = {}): Promise<ListResponse<ApiKey>> {
        // TODO: Make API call and parse response & error here
        return Promise.reject("Not implemented" + request);
    }

    public getApiKey(id: string): Promise<ApiKey> {
        // TODO: Make API call and parse response & error here
        const entity = new ApiKeyEntity(this.config);
        entity.id = id;
        return entity.get().then(this.mapEntity);
    }

    public deleteApiKey(id: string): Promise<void> {
        // TODO: Make API call and parse response & error here
        const entity = new ApiKeyEntity(this.config);
        entity.id = id;
        return entity.delete().then(() => {});
    }

    public createApiKey(request: ApiKeyCreateRequest): Promise<ApiKey> {
        // TODO: Make API call and parse response & error here
        const entity = new ApiKeyEntity(this.config);
        entity.name = request.name;
        entity.owner = request.owner;
        entity.status = request.status;

        return entity.create().then(this.mapEntity);
    }

    public updateApiKey(id: string, request: ApiKeyUpdateRequest): Promise<ApiKey> {
        // TODO: Make API call and parse response & error here
        const entity = new ApiKeyEntity(this.config);
        entity.id = id;
        entity.name = request.name;
        entity.owner = request.owner;
        entity.status = request.status;
        return entity.update().then(this.mapEntity);
    }

    private mapEntity(entity: ApiKeyEntity): ApiKey {
        return {
            createdAt: entity.createdAt,
            creationTime: entity.creationTime,
            groups: [],
            id: entity.id,
            key: entity.key,
            lastLoginTime: entity.lastLoginTime,
            name: entity.name,
            owner: entity.owner,
            status: entity.status,
            updatedAt: entity.updatedAt
        };
    }
}
