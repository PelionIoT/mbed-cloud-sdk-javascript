import { Adapter } from "../../../common/adapter";
import { IdentityProviderPublicKey } from "./identityProviderPublicKey";
/**
 *IdentityProviderPublicKey adapter
 */
export class IdentityProviderPublicKeyAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): IdentityProviderPublicKey {
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
