import { Config } from "../..";
import { ApiKey as ApiKeyEntity } from "../../generated";
import { ApiKey, ApiKeyCreateRequest, ApiKeyUpdateRequest } from "./ApiKey";
import { ListOptions } from "../../../common/interfaces";
import { Paginator } from "../../../common/pagination";

export interface ListApiKeysParameters extends ListOptions {
    keyEq?: string;
    ownerEq?: string;
}

export class ApiKeyRepository {
    constructor(
        private readonly config: Config
    ) {}

    public list(parameters: ListApiKeysParameters = {}): Paginator<ApiKey, ListApiKeysParameters> {
        // TODO: Make API call and parse response & error here
        const entity = new ApiKeyEntity(this.config);
        return entity.list(parameters);
    }

    public get(id: string): Promise<ApiKey> {
        // TODO: Make API call and parse response & error here
        const entity = new ApiKeyEntity(this.config);
        entity.id = id;
        return entity.get().then(this.mapEntity);
    }

    public delete(id: string): Promise<void> {
        // TODO: Make API call and parse response & error here
        const entity = new ApiKeyEntity(this.config);
        entity.id = id;
        // tslint:disable-next-line:no-empty
        return entity.delete().then(() => {});
    }

    public create(request: ApiKeyCreateRequest): Promise<ApiKey> {
        // TODO: Make API call and parse response & error here
        const entity = new ApiKeyEntity(this.config);
        entity.name = request.name;
        entity.owner = request.owner;
        entity.status = request.status;

        return entity.create().then(this.mapEntity);
    }

    public update(id: string, request: ApiKeyUpdateRequest): Promise<ApiKey> {
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
            groups: entity.groups,
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
