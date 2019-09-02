import { Adapter } from "../../../common/adapter";
/**
 *IdentityProviderPublicKey adapter
 */
export class IdentityProviderPublicKeyAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    static fromApi(data, instance) {
        if (!data) {
            return null;
        }
        const mappedEntity = IdentityProviderPublicKeyAdapter.assignDefined(instance || {}, {
            _discriminator: "IDENTITY_PROVIDER_PUBLIC_KEY",
            key: data.key,
            kid: data.kid,
        });
        return mappedEntity;
    }
}
//# sourceMappingURL=identityProviderPublicKeyAdapter.js.map