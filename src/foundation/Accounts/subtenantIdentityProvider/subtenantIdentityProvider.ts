import { Entity } from "../../../common/entity";
import { SubtenantIdentityProviderStatus } from "./types";
/**
 *SubtenantIdentityProvider
 */
export interface SubtenantIdentityProvider extends Entity {
    /**
     *The ID of the account the identity provider belongs to.
     *@example 01619571e2e90242ac12000600000000
     */
    accountId: string;

    /**
     *Creation UTC time RFC3339.
     *@example 2018-02-13T09:35:20Z
     */
    readonly createdAt?: Date;

    /**
     *Description for the identity provider.
     */
    description?: string;

    /**
     *Flag indicating whether this is the global default identity provider.
     */
    readonly isDefault?: boolean;

    /**
     *Name of the identity provider.
     */
    name: string;

    /**
     *Represents SAML2 specific attributes in responses.
     */
    saml2Attributes?: any;

    /**
     *Status of the identity provider.
     */
    status?: SubtenantIdentityProviderStatus;

    /**
     *Last update UTC time RFC3339.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;
}
