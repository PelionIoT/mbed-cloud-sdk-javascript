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
     *id
     */
    id?: string;

    /**
     *serverCertificate
     */
    serverCertificate?: string;

    /**
     *serverUri
     */
    serverUri?: string;
}
