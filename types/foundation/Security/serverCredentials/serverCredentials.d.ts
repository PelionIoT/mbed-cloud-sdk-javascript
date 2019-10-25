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
     *PEM-format X.509 server certificate used to validate the server certificate received during the TLS/DTLS handshake.
     */
    readonly serverCertificate?: string;
    /**
     *Server URI that the client connects to.
     */
    readonly serverUri?: string;
}
