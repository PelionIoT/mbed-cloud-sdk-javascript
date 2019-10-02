import { Entity } from "../../../common/entity";
/**
 *Saml2Request
 */
export interface Saml2Request extends Entity {
    /**
     *Contains an entity descriptor document for the identity provider. Can be used as an alternative method to provide the identity provider's attributes.
     */
    readonly entityDescriptor?: string;

    /**
     *Entity ID of the identity provider.
     */
    readonly idpEntityId?: string;

    /**
     *idpX509Certs
     */
    readonly idpX509Certs?: Array<string>;

    /**
     *URL of the identity provider's SLO endpoint.
     */
    readonly sloEndpoint?: string;

    /**
     *Entity ID of the service provider. We recommend that you leave it empty and let the system generate it.
     */
    readonly spEntityId?: string;

    /**
     *URL of the identity provider's SSO endpoint.
     */
    readonly ssoEndpoint?: string;
}
