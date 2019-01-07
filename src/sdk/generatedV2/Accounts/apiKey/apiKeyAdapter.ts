import { Adapter } from "../../../common/adapter";
import { ApiKey } from "./apiKey";
/**
 *ApiKey adapter
 */
export class ApiKeyAdapter extends Adapter {
    public static fromApi(data: any, instance?: ApiKey): ApiKey {
        return ApiKeyAdapter.assignDefined<ApiKey>(instance || {}, {
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
    }
}
