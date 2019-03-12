import { Adapter } from "../../../common/adapter";
import { ApiKey } from "./apiKey";
/**
 *ApiKey adapter
 */
export class ApiKeyAdapter extends Adapter {
    /**
     * fromApi
     * @returns ApiKey
     * @param data *required*
     * @param instance
     */
    public static fromApi(data: any, instance?: any): ApiKey {
        if (!data) {
            return null;
        }
        const mappedEntity = ApiKeyAdapter.assignDefined(instance || {}, {
            _discriminator: "API_KEY",
            accountId: data.account_id,
            createdAt: data.created_at,
            creationTime: data.creation_time,
            id: data.id,
            key: data.key,
            lastLoginTime: data.last_login_time,
            name: data.name,
            owner: data.owner,
            status: data.status,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
