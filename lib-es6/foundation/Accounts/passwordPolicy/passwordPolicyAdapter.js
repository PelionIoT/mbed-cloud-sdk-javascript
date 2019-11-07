import { Adapter } from "../../../common/adapter";
/**
 *PasswordPolicy adapter
 */
export class PasswordPolicyAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = PasswordPolicyAdapter.assignDefined(instance || {}, {
            _discriminator: "PASSWORD_POLICY",
            minimumLength: data.minimum_length || 8,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=passwordPolicyAdapter.js.map