import { Entity } from "../../../common/entity";
/**
 *ServerCredentials
 */
export interface ServerCredentials extends Entity {
    /**
     *createdAt
     */
    createdAt?: Date;

    /**
     *serverCertificate
     */
    serverCertificate?: string;

    /**
     *serverUri
     */
    serverUri?: string;
}
