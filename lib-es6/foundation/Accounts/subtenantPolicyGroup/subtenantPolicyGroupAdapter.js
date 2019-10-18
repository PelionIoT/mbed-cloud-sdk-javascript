import { Adapter } from "../../../common/adapter";
/**
 *SubtenantPolicyGroup adapter
 */
export class SubtenantPolicyGroupAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = SubtenantPolicyGroupAdapter.assignDefined(instance || {}, {
            _discriminator: "SUBTENANT_POLICY_GROUP",
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
//# sourceMappingURL=subtenantPolicyGroupAdapter.js.map