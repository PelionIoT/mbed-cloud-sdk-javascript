import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { ServerCredentials } from "./serverCredentials";
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
            (_data, done) => {
                done(null, null);
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
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
