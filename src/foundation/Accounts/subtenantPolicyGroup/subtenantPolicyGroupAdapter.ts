import { Adapter } from "../../../common/adapter";
import { SubtenantPolicyGroup } from "./subtenantPolicyGroup";
/**
 *SubtenantPolicyGroup adapter
 */
export class SubtenantPolicyGroupAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): SubtenantPolicyGroup {
        if (!data) {
            return null;
        }
        const mappedEntity = SubtenantPolicyGroupAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_POLICY_GROUP",
            accountId: data.account_id,
            apikeyCount: data.apikey_count,
            applicationCount: data.application_count,
            createdAt: data.created_at,
            id: data.id,
            name: data.name,
            updatedAt: data.updated_at,
            userCount: data.user_count,
        });
        return mappedEntity;
    }
}
