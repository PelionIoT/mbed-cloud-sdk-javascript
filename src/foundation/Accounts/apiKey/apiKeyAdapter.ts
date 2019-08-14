import { Adapter } from "../../../common/adapter";
import { ApiKey } from "./apiKey";
/**
 *ApiKey adapter
 */
export class ApiKeyAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): ApiKey {
        if (!data) {
            return null;
        }
        const mappedEntity = ApiKeyAdapter.assignDefined(instance || {}, {
            _discriminator: "API_KEY",
            accountId: data.account_id,
            createdAt: data.created_at,
            creationTime: data.creation_time || 0,
            groups: data.groups,
            id: data.id,
            key: data.key,
            lastLoginTime: data.last_login_time || 0,
            name: data.name,
            owner: data.owner,
            status: data.status,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
