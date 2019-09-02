import { Adapter } from "../../../common/adapter";
import { Saml2Request } from "./saml2Request";
/**
 *Saml2Request adapter
 */
export class Saml2RequestAdapter extends Adapter {
    /**
     * fromApi
     * @param data - data
     * @param instance - instance
     */
    public static fromApi(data: any, instance?: any): Saml2Request {
        if (!data) {
            return null;
        }
        const mappedEntity = Saml2RequestAdapter.assignDefined(instance || {}, {
            _discriminator: "SAML2_REQUEST",
            entityDescriptor: data.entity_descriptor,
            idpEntityId: data.idp_entity_id,
            idpX509Certs: data.idp_x509_certs,
            sloEndpoint: data.slo_endpoint,
            spEntityId: data.sp_entity_id,
            ssoEndpoint: data.sso_endpoint,
        });
        return mappedEntity;
    }
}
