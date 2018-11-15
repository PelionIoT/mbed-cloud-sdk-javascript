import { EntityBase } from "../../../common/entityBase";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";

/**
 * ServerCredentials
 */
export class ServerCredentials extends EntityBase {
    /**
     * Creation UTC time RFC3339.
     */
    public createdAt?: Date;

    /**
     * PEM format X.509 server certificate that will be used to validate the server certificate that will be received during the TLS/DTLS handshake.
     */
    public serverCertificate?: string;

    /**
     * Server URI to which the client needs to connect to.
     */
    public serverUri?: string;

    constructor(config?: Config) {
        super(config);
    }

    /**
     * getBootstraps a ServerCredentials.
     * @returns Promise containing ServerCredentials.
     */
    public getBootstrap(): Promise<ServerCredentials> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<ServerCredentials>(
                    {
                        url: "/v3/server-credentials/bootstrap",
                        method: "GET",
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }

    /**
     * getLwm2ms a ServerCredentials.
     * @returns Promise containing ServerCredentials.
     */
    public getLwm2m(): Promise<ServerCredentials> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi<ServerCredentials>(
                    {
                        url: "/v3/server-credentials/lwm2m",
                        method: "GET",
                    },
                    this,
                    resultsFn
                );
            },
            (data, done) => {
                done(null, data);
            }
        );
    }
}
