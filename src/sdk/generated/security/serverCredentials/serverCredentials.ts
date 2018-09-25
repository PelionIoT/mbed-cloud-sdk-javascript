import { EntityBase } from "../../../common/entityBase";
import { ConnectionOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";
/**
* ServerCredentials.
*/
export class ServerCredentials extends EntityBase {
    /**
    * bootstrap.
    */
    public bootstrap?: any;
    /**
    * Creation UTC time RFC3339.
    */
    public createdAt?: Date;
    /**
    * lwm2m.
    */
    public lwm2m?: any;
    /**
    * PEM format X509 server certificate that will be used to validate the server certificate that will be received during the TLS/DTLS handshake..
    */
    public serverCertificate?: string;
    /**
    * Server URI to which the client needs to connect to.
    */
    public serverUri?: string;
    constructor(config?: ConnectionOptions | Config) {
        super();
        if (config instanceof Config) {
            this.config = config;
        } else {
            this.config = new Config(config);
        }
    }
    /**
    * getBootstraps a ServerCredentials.
    * @returns Promise containing ServerCredentials.
    */
    public getBootstrap(): Promise<ServerCredentials> {
        return apiWrapper(resultsFn => {
            Client._CallApi<ServerCredentials>({
                url: "/v3/server-credentials/bootstrap",
                method: "GET",
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * getLwm2ms a ServerCredentials.
    * @returns Promise containing ServerCredentials.
    */
    public getLwm2m(): Promise<ServerCredentials> {
        return apiWrapper(resultsFn => {
            Client._CallApi<ServerCredentials>({
                url: "/v3/server-credentials/lwm2m",
                method: "GET",
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * lists a ServerCredentials.
    * @returns Promise containing ServerCredentials.
    */
    public list(): Promise<ServerCredentials> {
        return apiWrapper(resultsFn => {
            Client._CallApi<ServerCredentials>({
                url: "/v3/server-credentials",
                method: "GET",
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
}