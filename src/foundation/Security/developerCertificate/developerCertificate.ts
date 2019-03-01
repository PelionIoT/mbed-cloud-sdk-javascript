import { Entity } from "../../../common/entity";
/**
 *DeveloperCertificate
 */
export interface DeveloperCertificate extends Entity {
    /**
     *accountId
     */
    readonly accountId?: string;

    /**
     *certificate
     */
    readonly certificate?: string;

    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *description
     */
    description?: string;

    /**
     *name
     */
    name: string;

    /**
     *securityFileContent
     */
    readonly securityFileContent?: string;
}
