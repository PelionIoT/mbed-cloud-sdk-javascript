import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../legacy/common/functions";
import { ServerCredentials } from "./serverCredentials";
import { ServerCredentialsAdapter } from "../../index";
/**
 *ServerCredentials repository
 */
export class ServerCredentialsRepository extends Repository {
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
