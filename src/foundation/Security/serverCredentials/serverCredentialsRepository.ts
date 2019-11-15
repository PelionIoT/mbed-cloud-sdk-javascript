import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { ServerCredentialsAdapter } from "../../index";
import { ServerCredentials } from "./serverCredentials";
/**
 *ServerCredentials repository
 */
export class ServerCredentialsRepository extends Repository {
    /**
     * getBootstrap
     */
    public getBootstrap(): Promise<ServerCredentials> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/server-credentials/bootstrap",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ServerCredentialsAdapter.fromApi(data));
            }
        );
    }
    /**
     * getLwm2m
     */
    public getLwm2m(): Promise<ServerCredentials> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/server-credentials/lwm2m",
                        method: "GET",
                    },
                    resultsFn
                );
            },
            (data, done) => {
                done(null, ServerCredentialsAdapter.fromApi(data));
            }
        );
    }
}
