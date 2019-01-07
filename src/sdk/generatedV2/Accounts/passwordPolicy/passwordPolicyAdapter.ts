import { Adapter } from "../../../common/adapter";
import { PasswordPolicy } from "./passwordPolicy";
/**
 *PasswordPolicy adapter
 */
export class PasswordPolicyAdapter extends Adapter {
    public static fromApi(data: any, instance?: PasswordPolicy): PasswordPolicy {
        return PasswordPolicyAdapter.assignDefined<PasswordPolicy>(instance || {}, {
            _discriminator: "PASSWORD_POLICY",
            minimumLength: data.minimum_length,
        });
    }
}
