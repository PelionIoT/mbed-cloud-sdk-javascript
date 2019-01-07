import { Adapter } from "../../../common/adapter";
import { Policy } from "./policy";
/**
 *Policy adapter
 */
export class PolicyAdapter extends Adapter {
    public static fromApi(data: any, instance?: Policy): Policy {
        if (!data) {
            return null;
        }
        const mappedEntity = PolicyAdapter.assignDefined<Policy>(instance || {}, {
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
