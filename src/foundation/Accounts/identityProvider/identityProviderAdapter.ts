import { Adapter } from "../../../common/adapter";
import { IdentityProvider } from "./identityProvider";
/**
 *IdentityProvider adapter
 */
export class IdentityProviderAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): IdentityProvider {
        if (!data) {
            return null;
        }
        const mappedEntity = IdentityProviderAdapter.assignDefined(instance || {}, {
            _discriminator: "IDENTITY_PROVIDER",
            accountId: data.account_id,
            createdAt: data.created_at,
            description: data.description,
            id: data.id,
            identityProviderType: data.type,
            isDefault: data.is_default,
            name: data.name,
            saml2Attributes: data.saml2_attributes,
            status: data.status,
            updatedAt: data.updated_at,
        });
        return mappedEntity;
    }
}
