import { Adapter } from "../../../common/adapter";
import { PolicyGroup } from "./policyGroup";
/**
 *PolicyGroup adapter
 */
export class PolicyGroupAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): PolicyGroup {
        if (!data) {
            return null;
        }
        const mappedEntity = PolicyGroupAdapter.assignDefined(instance || {}, {
            _discriminator: "POLICY_GROUP",
            accountId: data.account_id,
            apikeyCount: data.apikey_count || 0,
            createdAt: data.created_at,
            id: data.id,
            name: data.name,
            updatedAt: data.updated_at,
            userCount: data.user_count || 0,
        });
        return mappedEntity;
    }
}
