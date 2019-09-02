import { Entity } from "../../../common/entity";
/**
 *IdentityProviderPublicKey
 */
export interface IdentityProviderPublicKey extends Entity {
    /**
     *The public key.
     */
    readonly key?: string;

    /**
     *The public key ID.
     */
    readonly kid?: string;
}
