import { Adapter } from "../../../common/adapter";
import { SubtenantApiKey } from "./subtenantApiKey";
/**
 *SubtenantApiKey adapter
 */
export class SubtenantApiKeyAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): SubtenantApiKey {
        if (!data) {
            return null;
        }
        const mappedEntity = SubtenantApiKeyAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_API_KEY",
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
