import { Adapter } from "../../../common/adapter";
import { Policy } from "./policy";
/**
 *Policy adapter
 */
export class PolicyAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): Policy {
        if (!data) {
            return null;
        }
        const mappedEntity = PolicyAdapter.assignDefined(instance || {}, {
            _discriminator: "POLICY",
            action: data.action,
            allow: data.allow,
            feature: data.feature,
            inherited: data.inherited,
            inheritedFrom: data.inherited_from,
            inheritedType: data.inherited_type,
            resource: data.resource,
        });
        return mappedEntity;
    }
}
