import { Entity } from "../../../common/entity";
/**
 *DeveloperCertificate
 */
export interface DeveloperCertificate extends Entity {
    /**
     *accountId
     */
    accountId?: string;

    /**
     *certificate
     */
    certificate?: string;

    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *description
     */
    description?: string;

    /**
     *id
     */
    id?: string;

    /**
     *name
     */
    name?: string;

    /**
     *securityFileContent
     */
    securityFileContent?: string;
}
