import { Adapter } from "../../../common/adapter";
import { Policy } from "./policy";
/**
 *Policy adapter
 */
export class PolicyAdapter extends Adapter {
    /**
     * fromApi
     * @returns Policy
     * @param data *required*
     * @param instance
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
            resource: data.resource,
        });
        return mappedEntity;
    }
}
