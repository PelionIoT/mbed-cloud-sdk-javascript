import { Adapter } from "../../../common/adapter";
/**
 *Policy adapter
 */
export class PolicyAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = PolicyAdapter.assignDefined(instance || {}, {
            _discriminator: "POLICY",
            action: data.action,
            allow: data.allow,
            feature: data.feature,
            inherited: data.inherited,
            resource: data.resource,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=policyAdapter.js.map