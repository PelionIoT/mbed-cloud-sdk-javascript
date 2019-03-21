import { Entity } from "../../../common/entity";
/**
 *ServerCredentials
 */
export interface ServerCredentials extends Entity {
    /**
     *Creation UTC time RFC3339.
     */
    readonly createdAt?: Date;

    /**
     *PEM format X.509 server certificate that will be used to validate the server certificate that will be received during the TLS/DTLS handshake.
     */
    readonly serverCertificate?: string;

    /**
     *Server URI to which the client needs to connect to.
     */
    readonly serverUri?: string;
}
