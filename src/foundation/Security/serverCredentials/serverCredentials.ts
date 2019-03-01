import { Entity } from "common/entity";
/**
 *ServerCredentials
 */
export interface ServerCredentials extends Entity {
    /**
     *createdAt
     */
    readonly createdAt?: Date;

    /**
     *serverCertificate
     */
    readonly serverCertificate?: string;

    /**
     *serverUri
     */
    readonly serverUri?: string;
}
