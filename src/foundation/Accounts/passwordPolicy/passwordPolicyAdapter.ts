import { Adapter } from "common/adapter";
import { PasswordPolicy } from "./passwordPolicy";
/**
 *PasswordPolicy adapter
 */
export class PasswordPolicyAdapter extends Adapter {
    public static fromApi(data: any, instance?: any): PasswordPolicy {
        if (!data) {
            return null;
        }
        const mappedEntity = PasswordPolicyAdapter.assignDefined(instance || {}, {
            _discriminator: "PASSWORD_POLICY",
            minimumLength: data.minimum_length,
        });
        return mappedEntity;
    }
}
